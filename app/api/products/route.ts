import { NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '../../lib/prisma'
import { getToken } from 'next-auth/jwt'
import { EducationField } from '@/generated/prisma'
import { uploadProductImages } from '../../lib/images'
import { ProductCreateSchema } from '../../lib/schemas'
import { ok, err, validationErr } from '../../lib/api-response'


export async function POST(req: NextRequest) {
  const token = await getToken({ req })
  if (!token) return err('Ikke autorisert', 401)

  try {
    const formData = await req.formData()

    let measures: unknown
    const measuresRaw = formData.get('measures') as string | null
    if (measuresRaw) {
      try { measures = JSON.parse(measuresRaw) } catch { /* leave undefined */ }
    }

    const parsed = ProductCreateSchema.safeParse({
      educationField: formData.get('educationField'),
      title: formData.get('title'),
      description: formData.get('description'),
      price: formData.get('price'),
      measures,
      amount: formData.get('amount'),
    })

    if (!parsed.success) return validationErr(parsed.error)

    const { educationField, title, description, price, measures: validMeasures, amount } = parsed.data

    const product = await prisma.product.create({
      data: { educationField: (educationField as EducationField) ?? null, title, description, price, measures: validMeasures, amount }
    })

    const files = formData.getAll('files') as File[]
    const ids = formData.getAll('ids') as string[]
    const images = files.map((file, i) => ({ file, id: ids[i] }))

    if (images.length > 0) {
      await uploadProductImages(images, product.id)
    }

    revalidatePath('/admin')
    revalidatePath('/products')
    return ok(product, 'Produkt opprettet', 201)
  } catch (error) {
    console.error('POST /api/products:', error)
    return err('Noe gikk galt på serveren', 500)
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { images: { orderBy: { sortOrder: 'asc' } } },
      orderBy: { publishedAt: 'desc' },
    })

    return ok(products)
  } catch (error) {
    console.error('GET /api/products:', error)
    return err('Noe gikk galt på serveren', 500)
  }
}