"use client"

import toast from 'react-hot-toast'
import type { ApiResponse } from '@/app/lib/api-response'

import { FaRegTrashCan } from "react-icons/fa6";

const DeleteProduct = ({ productID }: { productID: string }) => {
  const removeProduct = async () => {
    if (!window.confirm("Vil du slette produktet?")) return

    const res = await fetch(`/api/products/${productID}`, { method: "DELETE" })
    const body: ApiResponse<unknown> = await res.json()

    if (!body.success) {
      toast.error(body.error)
      return
    }

    toast.success(body.message ?? "Produkt slettet")
  }

  return (
    <button onClick={removeProduct} className="cursor-pointers flex flex-row items-center gap-2">
      <FaRegTrashCan />Fjern
    </button>
  )
}

export default DeleteProduct
