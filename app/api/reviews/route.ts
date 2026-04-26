import { NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/app/lib/prisma'
import { getToken } from 'next-auth/jwt'
import { uploadReviewImage } from '@/app/lib/images'
import { ReviewCreateSchema } from '@/app/lib/schemas'
import { ok, err, validationErr } from '@/app/lib/api-response'

export async function GET() {
  try {
    const reviews = await prisma.clientReview.findMany({ orderBy: { createdAt: 'desc' } })
    return ok(reviews)
  } catch (error) {
    console.error('GET /api/reviews:', error)
    return err('Noe gikk galt på serveren', 500)
  }
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req })
  if (!token) return err('Ikke autorisert', 401)

  try {
    const formData = await req.formData()

    const parsed = ReviewCreateSchema.safeParse({
      name:    formData.get('name'),
      role:    formData.get('role')    || undefined,
      orgName: formData.get('orgName') || undefined,
      orgURL:  formData.get('orgURL')  || undefined,
      message: formData.get('message'),
    })

    if (!parsed.success) return validationErr(parsed.error)

    const review = await prisma.clientReview.create({ data: parsed.data })

    const imageFile = formData.get('image') as File | null
    if (imageFile && imageFile.size > 0) {
      const imageId = await uploadReviewImage(imageFile)
      await prisma.clientReview.update({ where: { id: review.id }, data: { imageId } })
    }

    revalidatePath('/admin')
    revalidatePath('/')
    return ok(review, 'Anmeldelse opprettet', 201)
  } catch (error) {
    console.error('POST /api/reviews:', error)
    return err('Noe gikk galt på serveren', 500)
  }
}
