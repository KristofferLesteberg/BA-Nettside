'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { prisma } from '@/app/lib/prisma'
import { authOptions } from '@/app/lib/auth'
import { uploadReviewImage, deleteReviewImage } from '@/app/lib/images'

// ─── Schemas ─────────────────────────────────────────────────────────────────

const ReviewCreateSchema = z.object({
  name:    z.string().min(1, 'Navn er påkrevd'),
  role:    z.string().optional(),
  orgName: z.string().optional(),
  orgURL:  z.preprocess((val) => (val === '' ? undefined : val), z.url('Ugyldig URL').optional()),
  message: z.string().min(1, 'Anmeldelse er påkrevd'),
})

const ReviewUpdateSchema = ReviewCreateSchema.partial()

// ─── Actions ─────────────────────────────────────────────────────────────────

export async function getAllReviews() {
  return prisma.clientReview.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function getReviewById(id: number) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Ikke autorisert')

  const review = await prisma.clientReview.findUnique({ where: { id } })
  if (!review) throw new Error('Anmeldelse ikke funnet')
  return review
}

export async function createReview(formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Ikke autorisert')

  const data = ReviewCreateSchema.parse({
    name:    formData.get('name'),
    role:    formData.get('role')    || undefined,
    orgName: formData.get('orgName') || undefined,
    orgURL:  formData.get('orgURL')  || undefined,
    message: formData.get('message'),
  })

  const review = await prisma.clientReview.create({ data })

  const imageFile = formData.get('image') as File | null
  if (imageFile && imageFile.size > 0) {
    const imageId = await uploadReviewImage(imageFile)
    await prisma.clientReview.update({ where: { id: review.id }, data: { imageId } })
  }

  revalidatePath('/admin')
  revalidatePath('/')
  return { id: review.id }
}

export async function updateReview(id: number, formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Ikke autorisert')

  const existing = await prisma.clientReview.findUnique({ where: { id } })
  if (!existing) throw new Error('Anmeldelse ikke funnet')

  const data = ReviewUpdateSchema.parse({
    name:    formData.get('name')    || undefined,
    role:    formData.get('role')    || undefined,
    orgName: formData.get('orgName') || undefined,
    orgURL:  formData.get('orgURL')  || undefined,
    message: formData.get('message') || undefined,
  })

  let imageId = existing.imageId
  const imageFile = formData.get('image') as File | null
  if (imageFile && imageFile.size > 0) {
    if (existing.imageId) await deleteReviewImage(existing.imageId)
    imageId = await uploadReviewImage(imageFile)
  }

  await prisma.clientReview.update({ where: { id }, data: { ...data, imageId } })

  revalidatePath('/admin')
  revalidatePath('/')
}

export async function deleteReview(id: number) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Ikke autorisert')

  const review = await prisma.clientReview.findUnique({ where: { id } })
  if (!review) throw new Error('Anmeldelse ikke funnet')

  if (review.imageId) await deleteReviewImage(review.imageId)
  await prisma.clientReview.delete({ where: { id } })

  revalidatePath('/admin')
  revalidatePath('/')
}
