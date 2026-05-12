'use server'

import { email, z } from 'zod'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { prisma } from '@/app/lib/prisma'
import { authOptions } from '@/app/lib/auth'
import { uploadProductImages, syncProductImages, deleteAllProductImages, uploadProductImage } from '@/app/lib/images'
import type { EducationField } from '@/generated/prisma'
import { err } from '@/app/lib/api-response'

// ─── Schemas ─────────────────────────────────────────────────────────────────

const MeasuresSchema = z.record(z.string(), z.string())

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
  draft:           z.boolean(),
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
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      images: { orderBy: { sortOrder: 'asc' } },
      contactPerson: true,
    },
  })

  if (!product) return null

  return {
    ...product,
    price: product.price.toNumber(),
    publishedAt: product.publishedAt.toISOString(),
  }
}

export async function createDraftProduct() {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Ikke autorisert')

  const draftProduct = await prisma.product.create({
    data: {
      title: "",
      description: "",
      price: 0,
      amount: 0,
    }
  })
  revalidatePath("/admin")
  return { id: draftProduct.id}
}

export async function updateProduct(id: number, formData: FormData, publish = true) {
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
    draft:           !publish
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

export async function addImageToProduct(id: number, formdata: FormData) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Ikke autorisert')

  const file = formdata.get("image") as File
  const imageId = await uploadProductImage(file, id)
  return { id: imageId }
}

export async function updateProductAmount(id: number, amount: number) {
  const product = await prisma.product.findUnique({ where: { id: id} })
  if(!product) throw new Error("Kunne ikke finne produktet!")
  if(amount > product.amount) throw new Error("Kan ikke bestille mer enn antallet")

  await prisma.product.update({where: { id: id, amount: { gte: amount } }, data: {amount: { decrement: amount } } })
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
