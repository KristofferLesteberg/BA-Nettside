import { z } from 'zod'

export const EducationFieldSchema = z.enum(['BUILDING', 'CONSTRUCTION'])

export const MeasuresSchema = z.record(z.string(), z.string())

export const ProductCreateSchema = z.object({
  educationField: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z.enum(['BUILDING', 'CONSTRUCTION'], { message: 'Kategori er påkrevd' })
  ),
  title: z.string().min(1, 'Tittel er påkrevd'),
  description: z.string().min(1, 'Beskrivelse er påkrevd'),
  price: z.coerce.number().nonnegative('Pris kan ikke være negativ'),
  measures: MeasuresSchema.optional(),
  amount: z.coerce.number().int('Antall må være et heltall').min(0, 'Antall kan ikke være negativt'),
})

export const ProductUpdateSchema = ProductCreateSchema.partial({
  title: true,
  description: true,
  price: true,
  measures: true,
  amount: true,
})

export type ProductCreate = z.infer<typeof ProductCreateSchema>
export type ProductUpdate = z.infer<typeof ProductUpdateSchema>

export const ProjectRequestPage1Schema = z.object({
  clientForename: z.string().min(1, 'Fornavn er påkrevd'),
  clientSurname: z.string().min(1, 'Etternavn er påkrevd'),
  clientEmail: z.email('Ugyldig e-postadresse'),
  clientPhone: z.string().min(1, 'Telefonnummer er påkrevd'),
  address: z.string().min(1, 'Adresse er påkrevd'),
  organizationNumber: z.string().optional(),
})

export const ProjectRequestPage2Schema = z.object({
  educationField: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z.enum(['BUILDING', 'CONSTRUCTION'], { message: 'Kategori er påkrevd' })
  ),
  title: z.string().min(1, 'Prosjekttittel er påkrevd'),
  description: z.string().default(''),
  minPrice: z.coerce.number().nonnegative('Minimumsbudsjett kan ikke være negativt').default(0),
  maxPrice: z.coerce.number().nonnegative('Maksimumsbudsjett kan ikke være negativt').default(0),
})

export const ProjectRequestCreateSchema = z.object({
  educationField: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z.enum(['BUILDING', 'CONSTRUCTION']).optional()
  ),
  title: z.string().min(1, 'Prosjekttittel er påkrevd'),
  description: z.string().default(''),
  minPrice: z.coerce.number().nonnegative('Minimumsbudsjett kan ikke være negativt').default(0),
  maxPrice: z.coerce.number().nonnegative('Maksimumsbudsjett kan ikke være negativt').default(0),
  clientForename: z.string().min(1, 'Fornavn er påkrevd'),
  clientSurname: z.string().default(''),
  clientEmail: z.email('Ugyldig e-postadresse'),
  clientPhone: z.string().default(''),
  organizationNumber: z.string().optional(),
  address: z.string().default(''),
})

export const ProjectRequestUpdateSchema = ProjectRequestCreateSchema.partial()

export type ProjectRequestCreate = z.infer<typeof ProjectRequestCreateSchema>
export type ProjectRequestUpdate = z.infer<typeof ProjectRequestUpdateSchema>
