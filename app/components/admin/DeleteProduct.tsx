"use client"

import toast from 'react-hot-toast'
import type { ApiResponse } from '@/app/lib/api-response'

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
    <button onClick={removeProduct} className="btn btn-outline">
      Fjern
    </button>
  )
}

export default DeleteProduct
