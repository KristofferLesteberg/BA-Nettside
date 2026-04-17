import { notFound } from "next/navigation"
import UpdateProductForm from "@/app/components/admin/UpdateProductForm"

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const productId = (await params).id
  if (Number.isNaN(productId)) notFound()

  return <UpdateProductForm productId={productId} />
}