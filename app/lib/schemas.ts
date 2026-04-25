import { z } from 'zod'
import { isValidPhoneNumber } from 'libphonenumber-js'

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
  identityType: z.enum(['private', 'organization']),
  clientForename: z.string().min(2, 'Fornavnet bør være minst to tegn langt'),
  clientSurname: z.string().min(2, 'Etternavnet bør være minst to tegn langt'),
  clientEmail: z.email('Ugyldig e-postadresse'),
  clientPhone: z.string({ error: 'Telefonnummer er påkrevd' }).min(1, 'Telefonnummer er påkrevd').refine(isValidPhoneNumber, 'Ugyldig telefonnummer'),
  address: z.string().min(1, 'Adresse er påkrevd'),
  billingAddress: z.string().min(1, 'Fakturaaddresse er påkrevd'),
  
  organizationName: z.string().optional(),
  organizationNumber: z.string().regex(/^\d{9}$/, 'Organisasjonsnummer må bestå av nøyaktig 9 siffer').optional(),
}).superRefine((data, ctx) => {
  if (data.identityType === 'organization' && !data.organizationName?.trim()) {
    ctx.addIssue({ code: 'custom', path: ['organizationName'], message: 'Organisasjonsnavn er påkrevd' })
  }
  if (data.identityType === 'organization' && !data.organizationNumber) {
    ctx.addIssue({ code: 'custom', path: ['organizationNumber'], message: 'Organisasjonsnummer er påkrevd' })
  }
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
  organizationName: z.string().optional(),
  organizationNumber: z.string().regex(/^\d{9}$/, 'Organisasjonsnummer må bestå av nøyaktig 9 siffer').optional(),
  address: z.string().default(''),
  billingAddress: z.string().default('')
})

export const ProjectRequestUpdateSchema = ProjectRequestCreateSchema.partial()

export type ProjectRequestCreate = z.infer<typeof ProjectRequestCreateSchema>
export type ProjectRequestUpdate = z.infer<typeof ProjectRequestUpdateSchema>
export const ProjectRequestStatusUpdateSchema = z.object({
  status: z.enum(['NEW', 'IN_PROGRESS', "COMPLETE"])
})
export type ProjectRequestStatusUpdate = z.infer<typeof ProjectRequestStatusUpdateSchema>

export const ReviewCreateSchema = z.object({
  name:    z.string().min(1, 'Navn er påkrevd'),
  role:    z.string().optional(),
  orgName: z.string().optional(),
  orgURL:  z.string().url('Ugyldig URL').optional().or(z.literal('')),
  message: z.string().min(1, 'Anmeldelse er påkrevd'),
})

export const ReviewUpdateSchema = ReviewCreateSchema.partial()

export type ReviewCreate = z.infer<typeof ReviewCreateSchema>
export type ReviewUpdate = z.infer<typeof ReviewUpdateSchema>
