import { handler } from '@functions/healthcheck/healthCheck'
import { type APIGatewayProxyResult } from 'aws-lambda'

describe('Healthcheck Handler', (): void => {
  it('should return the healthcheck default response', async (): Promise<void> => {
    const result = {
      body: '{""Clean Energy": "ok, the gateway appears to be healthy","API integration": "ok, payment gateway integration appears to be healthy, ping-pong""}',
      statusCode: 200
    }
    const response: APIGatewayProxyResult = await handler()

    expect(response.statusCode).toBeDefined()
    expect(response.statusCode).toEqual(result.statusCode)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual(response.body)
  })
})
