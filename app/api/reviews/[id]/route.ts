import { NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/app/lib/prisma'
import { getToken } from 'next-auth/jwt'
import { uploadReviewImage, deleteReviewImage } from '@/app/lib/images'
import { ReviewUpdateSchema } from '@/app/lib/schemas'
import { ok, err, validationErr } from '@/app/lib/api-response'

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const token = await getToken({ req })
  if (!token) return err('Ikke autorisert', 401)

  try {
    const { id } = await context.params
    const reviewId = parseInt(id)
    if (isNaN(reviewId)) return err('Ugyldig anmeldelse-ID', 400)

    const review = await prisma.clientReview.findUnique({ where: { id: reviewId } })
    if (!review) return err('Anmeldelse ikke funnet', 404)

    return ok(review)
  } catch (error) {
    console.error('GET /api/reviews/[id]:', error)
    return err('Noe gikk galt på serveren', 500)
  }
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const token = await getToken({ req })
  if (!token) return err('Ikke autorisert', 401)

  try {
    const { id } = await context.params
    const reviewId = parseInt(id)
    if (isNaN(reviewId)) return err('Ugyldig anmeldelse-ID', 400)

    const existing = await prisma.clientReview.findUnique({ where: { id: reviewId } })
    if (!existing) return err('Anmeldelse ikke funnet', 404)

    const formData = await req.formData()

    const parsed = ReviewUpdateSchema.safeParse({
      name:    formData.get('name')    || undefined,
      role:    formData.get('role')    || undefined,
      orgName: formData.get('orgName') || undefined,
      orgURL:  formData.get('orgURL')  || undefined,
      message: formData.get('message') || undefined,
    })

    if (!parsed.success) return validationErr(parsed.error)

    let imageId = existing.imageId

    const imageFile = formData.get('image') as File | null
    if (imageFile && imageFile.size > 0) {
      if (existing.imageId) await deleteReviewImage(existing.imageId)
      imageId = await uploadReviewImage(imageFile)
    }

    const updated = await prisma.clientReview.update({
      where: { id: reviewId },
      data:  { ...parsed.data, imageId },
    })

    revalidatePath('/admin')
    revalidatePath('/')
    return ok(updated, 'Anmeldelse oppdatert')
  } catch (error) {
    console.error('PATCH /api/reviews/[id]:', error)
    return err('Noe gikk galt på serveren', 500)
  }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const token = await getToken({ req })
  if (!token) return err('Ikke autorisert', 401)

  try {
    const { id } = await context.params
    const reviewId = parseInt(id)
    if (isNaN(reviewId)) return err('Ugyldig anmeldelse-ID', 400)

    const review = await prisma.clientReview.findUnique({ where: { id: reviewId } })
    if (!review) return err('Anmeldelse ikke funnet', 404)

    if (review.imageId) await deleteReviewImage(review.imageId)
    const deleted = await prisma.clientReview.delete({ where: { id: reviewId } })

    revalidatePath('/admin')
    revalidatePath('/')
    return ok(deleted, 'Anmeldelse slettet')
  } catch (error) {
    console.error('DELETE /api/reviews/[id]:', error)
    return err('Noe gikk galt på serveren', 500)
  }
}
