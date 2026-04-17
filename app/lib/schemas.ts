import { z } from 'zod'

export const EducationFieldSchema = z.enum(['BUILDING', 'CONSTRUCTION'])

export const MeasuresSchema = z.record(z.string(), z.string())

export const ProductCreateSchema = z.object({
  educationField: z.preprocess(
    (val) => (val === '' ? undefined : val),
    EducationFieldSchema.optional()
  ),
  title: z.string().min(1, 'Tittel er påkrevd'),
  description: z.string().min(1, 'Beskrivelse er påkrevd'),
  price: z.coerce.number().nonnegative('Pris kan ikke være negativ'),
  measures: MeasuresSchema.optional(),
  amount: z.coerce.number().int('Antall må være et heltall').min(0, 'Antall kan ikke være negativt'),
})

export const ProductUpdateSchema = ProductCreateSchema.partial()

export type ProductCreate = z.infer<typeof ProductCreateSchema>
export type ProductUpdate = z.infer<typeof ProductUpdateSchema>
