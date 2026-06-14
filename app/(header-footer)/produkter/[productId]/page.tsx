import type { Metadata } from 'next'
import { notFound } from "next/navigation"
import { getProductById } from "@/actions/products"
import ProductDetail from "@/components/shared/products/ProductDetail"

type Props = { params: Promise<{ productId: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const productId = parseInt((await params).productId)
  if (Number.isNaN(productId)) return {}

  const product = await getProductById(productId)
  if (!product || product.draft) return {}

  return {
    title: product.title,
    description: product.description?.slice(0, 160) ?? undefined,
  }
}

export default async function ProductPage({ params }: Props) {
  const productId = parseInt((await params).productId)
  if (Number.isNaN(productId)) notFound()

  const product = await getProductById(productId)
  if (!product || product.draft) notFound()

  return <ProductDetail product={product} />
}
