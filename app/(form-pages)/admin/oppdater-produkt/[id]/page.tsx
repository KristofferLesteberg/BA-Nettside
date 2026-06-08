import { notFound, redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'
import { getProductById } from '@/actions/products'
import { Measure } from '@/components/admin/MeasurementList'
import UpdateProductClient from './UpdateProductClient'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const productId = parseInt((await params).id)
  if (Number.isNaN(productId)) notFound()

  const product = await getProductById(productId, true)
  if (!product) notFound()

  const measures: Measure[] = Array.isArray(product.measures)
    ? (product.measures as unknown as Measure[])
    : Object.entries((product.measures ?? {}) as Record<string, string>)
        .map(([name, value]) => ({ name, value, unit: '' }))

  return (
    <UpdateProductClient
      productId={productId}
      title={product.title}
      educationField={product.educationField ?? ''}
      description={product.description}
      price={Number(product.price).toString()}
      amount={String(product.amount)}
      measures={measures}
      existingImages={product.images.map(img => ({ id: img.id, url: `/images/med-res/${img.id}.webp` }))}
      contactId={product.contactPersonId ? String(product.contactPersonId) : ''}
      draft={product.draft}
    />
  )
}
