import middy from '@middy/core'
import errorLogger from '@middy/error-logger'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import middyJsonBodyParser from '@middy/http-json-body-parser'
import { type APIGatewayProxyHandler } from 'aws-lambda'

export const middyfy = (handler: APIGatewayProxyHandler) => {
  return middy(handler).use(middyJsonBodyParser()).use(httpErrorHandler()).use(errorLogger()).use(cors())
}
