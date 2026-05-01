"use client"

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { FaRegTrashCan } from "react-icons/fa6"
import { deleteProduct } from '@/actions/products'

const DeleteProduct = ({ productID }: { productID: number }) => {
  const router = useRouter()

  const removeProduct = async () => {
    if (!window.confirm("Vil du slette produktet?")) return

    try {
      await deleteProduct(productID)
      toast.success("Produkt slettet")
      router.refresh()
    } catch {
      toast.error("Kunne ikke slette produktet")
    }
  }

  return (
    <button onClick={removeProduct} className="btn btn-ghost w-full justify-start gap-2 text-lg text-error hover:bg-error-bg">
      <FaRegTrashCan />
      Slett
    </button>
  )
}

export default DeleteProduct
