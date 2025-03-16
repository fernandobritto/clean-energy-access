import { formatResponse } from '@common/helpers/formatResponse'
import { type APIGatewayProxyResult } from 'aws-lambda'

export const handler = async (): Promise<APIGatewayProxyResult> => {
  return await formatResponse(200, {
    message: {
      'Clean Energy': 'ok, the gateway appears to be healthy'
    }
  })
}
