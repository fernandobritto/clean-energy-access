import { middyfy } from '@common/helpers/middfy'
import { useCheckEligibilityValidator } from '@functions/checkEligibility/check-eligibility.validator'
import { checkEligibilityMiddleware } from '@functions/checkEligibility/middlewares/check-eligibility.middleware'
import { type APIGatewayProxyHandler } from 'aws-lambda'

jest.mock('@common/helpers/middfy', () => ({
  middyfy: jest.fn().mockReturnValue({
    use: jest.fn()
  })
}))

jest.mock('@functions/checkEligibility/check-eligibility.validator', () => ({
  useCheckEligibilityValidator: jest.fn()
}))

describe('creditCardValidationMiddleware', () => {
  it('should apply the credit card validation middleware', () => {
    const handler: APIGatewayProxyHandler = jest.fn()

    checkEligibilityMiddleware(handler)

    expect(middyfy).toHaveBeenCalledWith(handler)
    expect(useCheckEligibilityValidator).toHaveBeenCalled()
  })
})
