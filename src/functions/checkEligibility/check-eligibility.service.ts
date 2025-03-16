import { CUSTOMER_CLASS, REASONS_FOR_INELIGIBILITY, TARIFF_MODALITY } from '@common/constants/check-eligibility'
import { cnpj, cpf } from 'cpf-cnpj-validator'
import { BadRequest, isHttpError } from 'http-errors'

import { type CheckEligibilityValidator } from './check-eligibility.validator'
import { type ICheckEligibilityResult } from './interfaces/check-eligibility.interface'

const ELIGIBLE_CUSTOMER_CLASSES = [CUSTOMER_CLASS.COMMERCIAL, CUSTOMER_CLASS.RESIDENTIAL, CUSTOMER_CLASS.INDUSTRIAL]
const ELIGIBLE_TARIFF_MODALITIES = [TARIFF_MODALITY.CONVENTIONAL, TARIFF_MODALITY.WHITE]
const CONNECTION_TYPE_LIMITS = {
  monofasico: 400,
  bifasico: 500,
  trifasico: 750
}

export class CheckEligibilityService {
  async execute(checkEligibility: CheckEligibilityValidator): Promise<ICheckEligibilityResult> {
    const {
      numeroDoDocumento: documentNumber,
      tipoDeConexao: connectionType,
      classeDeConsumo: customerClass,
      modalidadeTarifaria: tariffModality,
      historicoDeConsumo: historicalConsumption
    } = checkEligibility

    if (!cnpj.isValid(documentNumber) && !cpf.isValid(documentNumber)) {
      throw new BadRequest('Invalid document number!')
    }

    try {
      const reasonsForIneligibility = this.getReasonsForIneligibility(
        connectionType,
        customerClass,
        tariffModality,
        historicalConsumption
      )

      if (reasonsForIneligibility.length > 0) {
        return {
          elegivel: false,
          razoesDeInelegibilidade: reasonsForIneligibility
        }
      } else {
        const calculateAnnualCO2Savings = this.calculateAnnualCO2Savings(historicalConsumption)
        const economiaAnualDeCO2 = parseFloat(calculateAnnualCO2Savings.toFixed(2))
        return {
          elegivel: true,
          economiaAnualDeCO2
        }
      }
    } catch (error) {
      if (isHttpError(error)) {
        throw new BadRequest(error.message)
      }
      console.error('CHECK_ELIGIBILITY_SERVICE_ERROR\n' + JSON.stringify(error, null, 2))
      console.error('CHECK_ELIGIBILITY_SERVICE_ERROR_MESSAGE\n' + JSON.stringify(error?.message, null, 2))
      throw new BadRequest('Error in eligibility verification service!')
    }
  }

  private getReasonsForIneligibility(
    connectionType: string,
    customerClass: string,
    tariffModality: string,
    historicalConsumption: number[]
  ): string[] {
    const reasonsForIneligibility: string[] = []

    if (!ELIGIBLE_CUSTOMER_CLASSES.includes(customerClass as CUSTOMER_CLASS)) {
      reasonsForIneligibility.push(REASONS_FOR_INELIGIBILITY.CUSTOMER_CLASS_NOT_ACCEPTED)
    }

    if (!ELIGIBLE_TARIFF_MODALITIES.includes(tariffModality as TARIFF_MODALITY)) {
      reasonsForIneligibility.push(REASONS_FOR_INELIGIBILITY.TARIFF_MODALITY_NOT_ACCEPTED)
    }

    const averageConsumption = this.calculateAverageConsumption(historicalConsumption)

    if (averageConsumption < CONNECTION_TYPE_LIMITS[connectionType]) {
      reasonsForIneligibility.push(REASONS_FOR_INELIGIBILITY.CONNECTION_TYPE_INSUFFICIENT_CONSUMPTION)
    }

    return reasonsForIneligibility
  }

  private calculateAverageConsumption(historicalConsumption: number[]): number {
    return historicalConsumption.reduce((a, b) => a + b, 0) / historicalConsumption.length
  }

  private calculateAnnualCO2Savings(historicalConsumption: number[]): number {
    const averageConsumption = this.calculateAverageConsumption(historicalConsumption)
    return (averageConsumption / 1000) * 84 * 12
  }
}
