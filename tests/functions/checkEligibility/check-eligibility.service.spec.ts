import { CUSTOMER_CLASS, TARIFF_MODALITY } from '@common/constants/check-eligibility'
import { CheckEligibilityService } from '@functions/checkEligibility/check-eligibility.service'

import { checkEligibilityStub } from './check-eligibility.mock'

describe('CheckEligibilityService', () => {
  let service: CheckEligibilityService

  beforeEach(() => {
    service = new CheckEligibilityService()
  })

  it('should return a document number error when the document number is invalid', async () => {
    const invalidRequest = {
      ...checkEligibilityStub().fakeRequestBody,
      numeroDoDocumento: '99999999999'
    }

    try {
      await service.execute(invalidRequest)
    } catch (error) {
      expect(error.message).toBe('Invalid document number!')
    }
  })

  it('should return ineligible when the request is invalid', async () => {
    const invalidRequest = {
      ...checkEligibilityStub().fakeRequestBody,
      classeDeConsumo: CUSTOMER_CLASS.RURAL
    }

    const result = await service.execute(invalidRequest)

    expect(result.elegivel).toBe(false)
    expect(result.razoesDeInelegibilidade?.length).toBeGreaterThan(0)
  })

  it('should return ineligible when the modalidadeTarifaria is not valid', async () => {
    const invalidRequest = {
      ...checkEligibilityStub().fakeRequestBody,
      modalidadeTarifaria: TARIFF_MODALITY.BLUE
    }

    const result = await service.execute(invalidRequest)

    expect(result.elegivel).toBe(false)
    expect(result.razoesDeInelegibilidade?.length).toBeGreaterThan(0)
  })

  it('should return eligible when the request is valid', async () => {
    console.log(checkEligibilityStub().fakeRequestBody)
    const result = await service.execute(checkEligibilityStub().fakeRequestBody)

    expect(result.elegivel).toBe(true)
    expect(result.economiaAnualDeCO2).toBeGreaterThan(0)
  })
})
