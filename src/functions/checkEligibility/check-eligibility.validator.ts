import { CONNECTION_TYPE, CUSTOMER_CLASS, TARIFF_MODALITY } from '@common/constants/check-eligibility'
import { DOCUMENT_NUMBER_LENGTH } from '@common/constants/documents'
import { useValidationSchema } from '@common/helpers/useValidationSchema'
import * as z from 'zod'

const documentNumberRegex = /^(\d{11}|\d{14})$/

const checkEligibilityValidatorSchema = z.object({
  numeroDoDocumento: z
    .string()
    .trim()
    .min(DOCUMENT_NUMBER_LENGTH.CPF)
    .max(DOCUMENT_NUMBER_LENGTH.CNPJ)
    .regex(
      documentNumberRegex,
      `the CPF or CNPJ number provided is not valid, Must have ${documentNumberRegex} pattern`
    ),
  tipoDeConexao: z.nativeEnum(CONNECTION_TYPE),
  classeDeConsumo: z.nativeEnum(CUSTOMER_CLASS),
  modalidadeTarifaria: z.nativeEnum(TARIFF_MODALITY),
  historicoDeConsumo: z.array(z.number().positive().min(0)).min(3).max(12)
})

export type CheckEligibilityValidator = z.infer<typeof checkEligibilityValidatorSchema>

export const useCheckEligibilityValidator = () => {
  return useValidationSchema({
    body: checkEligibilityValidatorSchema
  })
}
