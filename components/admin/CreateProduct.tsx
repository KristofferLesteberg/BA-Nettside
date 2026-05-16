"use client"
import { useRouter } from "next/navigation"
import { createDraftProduct } from "@/actions/products"
import { HiOutlinePlusSm } from "react-icons/hi"
export default function CreateProduct() {
  const router = useRouter()
  const handleNewProduct = async () => {
    const { id } = await createDraftProduct()
    console.log(id)
    router.push(`/admin/nytt-produkt/${id}`)
  }
  return (
     <button onClick={handleNewProduct} className="btn btn-primary w-full gap-1.5">
          <HiOutlinePlusSm className="text-base" />
          Ny produkt
     </button>
  )
}