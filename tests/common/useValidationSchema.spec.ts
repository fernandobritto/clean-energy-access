import { useValidationSchema } from '@common/helpers/useValidationSchema'
import { z } from 'zod'

describe('Use Validation Schema request parsers', () => {
  it('Should be able to parse body payload', async () => {
    const parsed = useValidationSchema({
      body: z.object({
        test: z.string()
      })
    })

    await expect(
      parsed.before({
        event: {
          body: {
            test: 'yep'
          },
          headers: undefined,
          pathParameters: undefined,
          queryStringParameters: undefined
        }
      })
    ).resolves.not.toThrow()
  })

  it('Should be able to parse headers payload', async () => {
    const parsed = useValidationSchema({
      headers: z.object({
        test: z.string()
      })
    })

    await expect(
      parsed.before({
        event: {
          headers: {
            test: 'yep'
          },
          body: undefined,
          pathParameters: undefined,
          queryStringParameters: undefined
        }
      })
    ).resolves.not.toThrow()
  })

  it('Should be able to parse pathParameters payload', async () => {
    const parsed = useValidationSchema({
      pathParameters: z.object({
        test: z.string()
      })
    })

    await expect(
      parsed.before({
        event: {
          pathParameters: {
            test: 'yep'
          },
          body: undefined,
          headers: undefined,
          queryStringParameters: undefined
        }
      })
    ).resolves.not.toThrow()
  })

  it('Should be able to parse queryStringParameters payload', async () => {
    const parsed = useValidationSchema({
      queryStringParameters: z.object({
        test: z.string()
      })
    })

    await expect(
      parsed.before({
        event: {
          queryStringParameters: {
            test: 'yep'
          },
          body: undefined,
          headers: undefined,
          pathParameters: undefined
        }
      })
    ).resolves.not.toThrow()
  })
})
