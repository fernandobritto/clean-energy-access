/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { CheckEligibilityService } from '@functions/checkEligibility/check-eligibility.service'
import { checkEligibility } from '@functions/checkEligibility/handler'
import { mockedApiGatewayEvent } from '@tests/utils/mockedApiGatewayEvent'
import { type Callback, type Context } from 'aws-lambda'

import { checkEligibilityStub } from './check-eligibility.mock'
jest.mock('@functions/checkEligibility/check-eligibility.service')

describe('Check Eligibility Handler unit tests', () => {
  const checkEligibilityRequestBody = checkEligibilityStub().fakeRequestBody

  it('Should return status code 422 for invalid request params', async () => {
    const response = await checkEligibility(
      {
        ...mockedApiGatewayEvent,
        httpMethod: 'POST',
        body: JSON.stringify({})
      },
      {} as Context,
      {} as Callback
    )

    expect(response?.statusCode).toEqual(422)
  })

  it('Should return status code 500 for internal server errors', async () => {
    ; (CheckEligibilityService.prototype as jest.Mocked<CheckEligibilityService>).execute.mockRejectedValueOnce(
      new Error('TEST: Forcing unexpected error')
    )
    const result = {
      message: 'Unexpected Error!'
    }
    const response = await checkEligibility(
      {
        ...mockedApiGatewayEvent,
        httpMethod: 'POST',
        body: JSON.stringify({ ...checkEligibilityRequestBody, cpf: '123' })
      },
      {} as Context,
      {} as Callback
    )

    expect(response?.statusCode).toEqual(500)
    expect(response?.body).toBe(JSON.stringify(result))
  })

  it('Should return 201 for successfully requests that created accounts', async () => {
    const response = await checkEligibility(
      {
        ...mockedApiGatewayEvent,
        httpMethod: 'POST',
        body: JSON.stringify(checkEligibilityRequestBody)
      },
      {} as Context,
      {} as Callback
    )

    expect(response?.statusCode).toEqual(201)
  })
})
