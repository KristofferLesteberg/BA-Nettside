"use client"
import { useRouter } from "next/navigation"
import { createDraftProduct } from "@/actions/products"
import { IconPlus } from "@/app/lib/icons"
export default function CreateProduct() {
  const router = useRouter()
  const handleNewProduct = async () => {
    const { id } = await createDraftProduct()
    console.log(id)
    router.push(`/admin/nytt-produkt/${id}`)
  }
  return (
     <button onClick={handleNewProduct} className="btn btn-primary gap-1.5">
          <IconPlus className="text-base" />
          Ny produkt
     </button>
  )
}