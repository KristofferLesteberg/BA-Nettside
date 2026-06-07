import { notFound } from 'next/navigation'
import { getProductById } from '@/actions/products'
import BestillClient from './BestillClient'

export default async function BestillProduktPage({ params }: { params: Promise<{ productId: string }> }) {
  const productId = parseInt((await params).productId)
  if (Number.isNaN(productId)) notFound()

  const product = await getProductById(productId)
  if (!product || product.draft) notFound()

  return <BestillClient productId={productId} />
}
