import { middyfy } from '@common/helpers/middfy'
import { type APIGatewayProxyHandler } from 'aws-lambda'

import { useCheckEligibilityValidator } from '../check-eligibility.validator'

export const checkEligibilityMiddleware = (handler: APIGatewayProxyHandler) => {
  return middyfy(handler).use([useCheckEligibilityValidator()])
}
