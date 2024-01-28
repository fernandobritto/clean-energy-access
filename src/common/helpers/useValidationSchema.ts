import { UnprocessableEntity } from 'http-errors'
import { type Schema } from 'zod'

export interface Request {
  event: {
    body: unknown
    pathParameters: unknown
    queryStringParameters: unknown
    headers: unknown
  }
}

export const useValidationSchema = (schema: {
  body?: Schema
  pathParameters?: Schema
  queryStringParameters?: Schema
  headers?: Schema
}): {
  before: (request: Request) => Promise<void>
} => {
  const before = async (request: Request): Promise<void> => {
    try {
      const { headers, pathParameters, queryStringParameters, body } = request.event

      if (schema.headers) {
        schema.headers.parse(headers)
      }

      if (schema.pathParameters) {
        schema.pathParameters.parse(pathParameters ?? {})
      }

      if (schema.queryStringParameters) {
        schema.queryStringParameters.parse(queryStringParameters ?? {})
      }

      if (schema.body) {
        schema.body.parse(body)
      }

      await Promise.resolve()
    } catch (e) {
      throw UnprocessableEntity(
        JSON.stringify({
          errors: e.errors
        })
      )
    }
  }

  return {
    before
  }
}
