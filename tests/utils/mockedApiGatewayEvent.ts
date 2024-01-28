import { faker } from '@faker-js/faker'
import { type APIGatewayEvent } from 'aws-lambda'

export const mockedApiGatewayEvent: APIGatewayEvent = {
  body: null,
  headers: {
    'Content-Type': 'application/json',
    authorization: faker.string.alphanumeric(32)
  },
  multiValueHeaders: {},
  httpMethod: '',
  isBase64Encoded: false,
  path: '',
  pathParameters: null,
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  stageVariables: null,
  requestContext: {
    accountId: '',
    apiId: '',
    authorizer: {
      jwt: { claims: { username: faker.string.alphanumeric(32) } }
    },
    protocol: '',
    httpMethod: '',
    identity: {
      accessKey: null,
      accountId: null,
      apiKey: null,
      apiKeyId: null,
      caller: null,
      clientCert: null,
      cognitoAuthenticationProvider: null,
      cognitoAuthenticationType: null,
      cognitoIdentityId: null,
      cognitoIdentityPoolId: null,
      principalOrgId: null,
      sourceIp: '',
      userArn: null,
      userAgent: '',
      user: null
    },
    path: '',
    stage: '',
    requestId: '',
    requestTime: '',
    requestTimeEpoch: 0,
    resourceId: '',
    resourcePath: ''
  },
  resource: ''
}
