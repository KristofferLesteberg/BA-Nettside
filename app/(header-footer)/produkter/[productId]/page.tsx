import { notFound } from "next/navigation"
import { getProductById } from "@/actions/products"
import ProductDetail from "@/components/shared/products/ProductDetail"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>
}) {
  const productId = parseInt((await params).productId)
  if (Number.isNaN(productId)) notFound()

  const product = await getProductById(productId)
  if (!product || product.draft) notFound()

  return <ProductDetail product={product} />
}
