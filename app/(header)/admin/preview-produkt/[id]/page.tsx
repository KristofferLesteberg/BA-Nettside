export const dynamic = 'force-dynamic'

import { notFound, redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/lib/auth"
import { getProductById } from "@/actions/products"
import ProductDetail from "@/components/shared/products/ProductDetail"
import AdminPreviewBanner from "@/components/admin/AdminPreviewBanner"

export default async function AdminPreviewProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/admin/login")

  const productId = parseInt((await params).id)
  if (Number.isNaN(productId)) notFound()

  const product = await getProductById(productId)
  if (!product) notFound()

  return (
    <>
      <AdminPreviewBanner productId={product.id} isDraft={product.draft} />
      <ProductDetail product={product} />
    </>
  )
}
