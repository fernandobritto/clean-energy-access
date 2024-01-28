import { type CheckEligibilityValidator } from '@functions/checkEligibility/check-eligibility.validator'
import { type ICheckEligibilityResult } from '@functions/checkEligibility/interfaces/check-eligibility.interface'

import { checkFakeEligibility } from '../../utils/checkEligibility.mock'

const CheckEligibilityValidatorMock = jest.fn<ICheckEligibilityResult, unknown[]>()

export const checkEligibilityStub = () => {
  const fakeRequestBody: CheckEligibilityValidator = checkFakeEligibility()

  CheckEligibilityValidatorMock.mockReturnValueOnce({
    elegivel: true,
    economiaAnualDeCO2: 0,
    razoesDeInelegibilidade: []
  })

  return Object.freeze({ fakeRequestBody, CheckEligibilityValidatorMock })
}
