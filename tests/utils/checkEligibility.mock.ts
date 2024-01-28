import { CONNECTION_TYPE, CUSTOMER_CLASS, TARIFF_MODALITY } from '@common/constants/check-eligibility'
import { faker } from '@faker-js/faker'
import { type CheckEligibilityValidator } from '@functions/checkEligibility/check-eligibility.validator'

export function checkFakeEligibility() {
  const fakeRequestBody: CheckEligibilityValidator = {
    numeroDoDocumento: faker.number
      .int({
        min: 10000000000,
        max: 99999999999
      })
      .toString(),

    tipoDeConexao: CONNECTION_TYPE.TWO_PHASE,
    classeDeConsumo: CUSTOMER_CLASS.COMMERCIAL,
    modalidadeTarifaria: TARIFF_MODALITY.CONVENTIONAL,
    historicoDeConsumo: [
      faker.number.int({ min: 1000, max: 9999 }),
      faker.number.int({ min: 1000, max: 9999 }),
      faker.number.int({ min: 1000, max: 9999 }),
      faker.number.int({ min: 1000, max: 9999 }),
      faker.number.int({ min: 1000, max: 9999 }),
      faker.number.int({ min: 1000, max: 9999 }),
      faker.number.int({ min: 1000, max: 9999 }),
      faker.number.int({ min: 1000, max: 9999 }),
      faker.number.int({ min: 1000, max: 9999 }),
      faker.number.int({ min: 1000, max: 9999 }),
      faker.number.int({ min: 1000, max: 9999 }),
      faker.number.int({ min: 1000, max: 9999 })
    ]
  }

  return fakeRequestBody
}
