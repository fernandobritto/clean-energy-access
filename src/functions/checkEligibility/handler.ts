import { formatResponse } from '@common/helpers/formatResponse'
import type middy from '@middy/core'
import {
  type APIGatewayProxyEvent,
  type APIGatewayProxyHandler,
  type APIGatewayProxyResult,
  type Context
} from 'aws-lambda'
import { type HttpError, isHttpError } from 'http-errors'

import { CheckEligibilityService } from './check-eligibility.service'
import { type CheckEligibilityValidator } from './check-eligibility.validator'
import { checkEligibilityMiddleware } from './middlewares/check-eligibility.middleware'

const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  try {
    const checkEligibility: CheckEligibilityValidator = event.body as unknown as CheckEligibilityValidator

    const checkEligibilityService = new CheckEligibilityService()
    const checkEligibilityResponse = await checkEligibilityService.execute(checkEligibility)

    return await formatResponse(201, {
      data: checkEligibilityResponse
    })
  } catch (error) {
    if (isHttpError(error)) {
      const httpError: HttpError = error

      return await formatResponse(httpError.statusCode, {
        message: httpError.message
      })
    }

    console.error('UNEXPECTED_ERROR\n' + JSON.stringify(error?.message, null, 2))

    return await formatResponse(500, {
      message: 'Unexpected Error!'
    })
  }
}

export const checkEligibility: middy.MiddyfiedHandler<APIGatewayProxyEvent, APIGatewayProxyResult, Error, Context> =
  checkEligibilityMiddleware(handler)
