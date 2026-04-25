import { NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '../../../lib/prisma'
import { getToken } from 'next-auth/jwt'
import { EducationField } from '@/generated/prisma'
import { syncProductImages, deleteAllProductImages } from '@/app/lib/images'
import { ProductUpdateSchema } from '@/app/lib/schemas'
import { ok, err, validationErr } from '@/app/lib/api-response'

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const token = await getToken({ req })
  if (!token) return err('Ikke autorisert', 401)

  try {
    const { id } = await context.params
    const productId = parseInt(id)
    if (isNaN(productId)) return err('Ugyldig produkt-ID', 400)

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { images: { orderBy: { sortOrder: 'asc' } } },
    })

    if (!product) return err('Produkt ikke funnet', 404)

    return ok(product)
  } catch (error) {
    console.error('GET /api/products/[id]:', error)
    return err('Noe gikk galt på serveren', 500)
  }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const token = await getToken({ req })
  if (!token) return err('Ikke autorisert', 401)

  try {
    const { id } = await context.params
    const productId = parseInt(id)
    if (isNaN(productId)) return err('Ugyldig produkt-ID', 400)

    await deleteAllProductImages(productId)
    const deleted = await prisma.product.delete({ where: { id: productId } })

    revalidatePath('/admin')
    revalidatePath('/products')
    return ok(deleted, 'Produkt slettet')
  } catch (error) {
    console.error('DELETE /api/products/[id]:', error)
    return err('Noe gikk galt på serveren', 500)
  }
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const token = await getToken({ req })
  if (!token) return err('Ikke autorisert', 401)

  try {
    const { id } = await context.params
    const productId = parseInt(id)
    if (isNaN(productId)) return err('Ugyldig produkt-ID', 400)

    const formData = await req.formData()

    let measures: unknown
    const measuresRaw = formData.get('measures') as string | null
    if (measuresRaw) {
      try { measures = JSON.parse(measuresRaw) } catch { /* leave undefined */ }
    }

    const parsed = ProductUpdateSchema.safeParse({
      educationField: formData.get('educationField'),
      title: formData.get('title'),
      description: formData.get('description'),
      price: formData.get('price'),
      measures,
      amount: formData.get('amount'),
    })

    if (!parsed.success) return validationErr(parsed.error)

    const { educationField, ...rest } = parsed.data

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        ...rest,
        educationField: (educationField as EducationField) ?? null,
      },
    })

    const imageIds = formData.getAll('imageIds') as string[]
    const imageFiles = formData.getAll('imageFiles') as File[]
    await syncProductImages(imageIds, imageFiles, updatedProduct.id)

    revalidatePath('/admin')
    revalidatePath('/products')
    return ok(updatedProduct, 'Produkt oppdatert')
  } catch (error) {
    console.error('PATCH /api/products/[id]:', error)
    return err('Noe gikk galt på serveren', 500)
  }
}
