'use server'

import { email, z } from 'zod'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { prisma } from '@/app/lib/prisma'
import { authOptions } from '@/app/lib/auth'
import { uploadProductImages, syncProductImages, deleteAllProductImages } from '@/app/lib/images'
import type { EducationField } from '@/generated/prisma'
import { err } from '@/app/lib/api-response'

// ─── Schemas ─────────────────────────────────────────────────────────────────

const MeasuresSchema = z.array(
  z.object({
    name:  z.string().min(1).max(50),
    value: z.string().min(1).max(30),
    unit:  z.string().max(20),
  })
)

const ProductCreateSchema = z.object({
  educationField: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z.enum(['BUILDING', 'CONSTRUCTION'], { message: 'Kategori er påkrevd' })
  ),
  title:           z.string().min(1, 'Tittel er påkrevd'),
  description:     z.string().min(1, 'Beskrivelse er påkrevd'),
  price:           z.coerce.number().nonnegative('Pris kan ikke være negativ'),
  measures:        MeasuresSchema.optional(),
  amount:          z.coerce.number().int('Antall må være et heltall').min(0, 'Antall kan ikke være negativt'),
  contactPersonId: z.preprocess(
    (val) => (val === '' || val === null || val === undefined ? undefined : val),
    z.coerce.number().int('Kontaktperson-ID må være et heltall').optional()
  ),
})



const ProductUpdateSchema = ProductCreateSchema.partial()

// ─── Actions ─────────────────────────────────────────────────────────────────


export async function getAllProducts() {
  const products = await prisma.product.findMany({
    include: { images: { take: 1, orderBy: { sortOrder: 'asc' } } },
    orderBy: { publishedAt: 'desc' },
  })

  return products.map(({ images, ...product }) => ({
    ...product,
    price: product.price.toNumber(),
    publishedAt: product.publishedAt.toISOString(),
    image: images[0] ?? null,
  }))
}

export async function getProductById(id: number) {

  return prisma.product.findUnique({
    where: { id },
    include: {
      images: { orderBy: { sortOrder: 'asc' } },
      contactPerson: true,
    },
  })
}

export async function createProduct(formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Ikke autorisert')

  const measuresRaw = formData.get('measures')

  const { educationField, ...rest } = ProductCreateSchema.parse({
    educationField:  formData.get('educationField') || undefined,
    title:           formData.get('title'),
    description:     formData.get('description'),
    price:           formData.get('price'),
    measures:        measuresRaw ? JSON.parse(measuresRaw as string) : undefined,
    amount:          formData.get('amount'),
    contactPersonId: formData.get('contactId'),
  })

  const product = await prisma.product.create({
    data: { ...rest, educationField: (educationField as EducationField) ?? null },
  })

  const imageIds  = JSON.parse((formData.get('imageIds') as string) ?? '[]') as string[]
  const imageFiles = (formData.getAll('images') as File[]).filter((f) => f.size > 0)

  if (imageFiles.length > 0) {
    await uploadProductImages(
      imageFiles.map((file, i) => ({ id: imageIds[i] ?? crypto.randomUUID(), file })),
      product.id
    )
  }

  revalidatePath('/admin')
  revalidatePath('/')
  return { id: product.id }
}

export async function updateProduct(id: number, formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Ikke autorisert')

  const existing = await prisma.product.findUnique({ where: { id } })
  if (!existing) throw new Error('Produkt ikke funnet')

  const measuresRaw = formData.get('measures')

  const { educationField, ...rest } = ProductUpdateSchema.parse({
    educationField:  formData.get('educationField') || undefined,
    title:           formData.get('title')           || undefined,
    description:     formData.get('description')     || undefined,
    price:           formData.get('price')           || undefined,
    measures:        measuresRaw ? JSON.parse(measuresRaw as string) : undefined,
    amount:          formData.get('amount')          || undefined,
    contactPersonId: formData.get('contactPersonId') || undefined,
  })

  await prisma.product.update({
    where: { id },
    data:  {
      ...rest,
      ...(educationField !== undefined ? { educationField: educationField as EducationField } : {}),
    },
  })

  const orderedIds  = JSON.parse((formData.get('imageIds') as string) ?? '[]') as string[]
  const newFiles    = (formData.getAll('newImages') as File[]).filter((f) => f.size > 0)

  await syncProductImages(orderedIds, newFiles, id)

  revalidatePath('/admin')
  revalidatePath('/')
}

export async function updateProductAmount(id: number, amount: number) {
  const product = await prisma.product.findUnique({ where: { id: id} })
  if(!product) throw new Error("Kunne ikke finne produktet!")
  if(amount > product.amount) throw new Error("Kan ikke bestille mer enn antallet")

  await prisma.product.update({where: {id: id, amount: {gte: amount }}, data: {amount: { decrement: amount }}})
  revalidatePath("/admin")
  revalidatePath("/")
}


export async function deleteProduct(id: number) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Ikke autorisert')

  const product = await prisma.product.findUnique({ where: { id } })
  if (!product) throw new Error('Produkt ikke funnet')

  await deleteAllProductImages(id)
  await prisma.product.delete({ where: { id } })

  revalidatePath('/admin')
  revalidatePath('/')
}
