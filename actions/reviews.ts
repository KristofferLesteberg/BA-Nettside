'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { prisma } from '@/app/lib/prisma'
import { authOptions } from '@/app/lib/auth'
import { getAppConfig } from '@/app/lib/app-config'
import { CONFIG_KEYS } from '@/app/lib/app-config-keys'
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

export async function getAllReviews(isAdminContext = false) {
  const hideSeeded = !isAdminContext && (await getAppConfig(CONFIG_KEYS.HIDE_TEST_DATA)) === 'true'
  return prisma.clientReview.findMany({
    where: hideSeeded ? { isSeeded: false } : undefined,
    orderBy: { createdAt: 'desc' },
  })
}

export async function getReviewById(id: number) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Ikke autorisert')

  const review = await prisma.clientReview.findUnique({ where: { id } })
  if (!review) throw new Error('Anmeldelse ikke funnet')
  return review
}

export async function createReview(formData: FormData): Promise<{ success: true; id: number } | { success: false; error: string }> {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Ikke autorisert')

  const result = ReviewCreateSchema.safeParse({
    name:    formData.get('name'),
    role:    formData.get('role')    || undefined,
    orgName: formData.get('orgName') || undefined,
    orgURL:  formData.get('orgURL')  || undefined,
    message: formData.get('message'),
  })
  if (!result.success) return { success: false, error: result.error.issues[0].message }
  const data = result.data

  const review = await prisma.clientReview.create({ data })

  const imageFile = formData.get('image') as File | null
  if (imageFile && imageFile.size > 0) {
    const imageId = await uploadReviewImage(imageFile)
    await prisma.clientReview.update({ where: { id: review.id }, data: { imageId } })
  }

  revalidatePath('/admin')
  revalidatePath('/')
  return { success: true, id: review.id }
}

export async function updateReview(id: number, formData: FormData): Promise<{ success: true } | { success: false; error: string }> {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Ikke autorisert')

  const existing = await prisma.clientReview.findUnique({ where: { id } })
  if (!existing) throw new Error('Anmeldelse ikke funnet')

  const result = ReviewUpdateSchema.safeParse({
    name:    formData.get('name')    || undefined,
    role:    formData.get('role')    || undefined,
    orgName: formData.get('orgName') || undefined,
    orgURL:  formData.get('orgURL')  || undefined,
    message: formData.get('message') || undefined,
  })
  if (!result.success) return { success: false, error: result.error.issues[0].message }
  const data = result.data

  let imageId = existing.imageId
  const imageFile = formData.get('image') as File | null
  if (imageFile && imageFile.size > 0) {
    if (existing.imageId) await deleteReviewImage(existing.imageId)
    imageId = await uploadReviewImage(imageFile)
  }

  await prisma.clientReview.update({ where: { id }, data: { ...data, imageId } })

  revalidatePath('/admin')
  revalidatePath('/')
  return { success: true }
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
