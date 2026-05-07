"use client"
import { deleteOrder} from "@/actions/orderProduct"
import { ProductOrder } from "@/generated/prisma"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"


interface Props {
  order: ProductOrder
}

export default function OrderCard({ order }: Props) {
  const router = useRouter()

  const orderDelete = async () => {
    try {
      await deleteOrder(order.id)
      toast.success("Bestilling fjernet!")
      router.refresh()
    } catch(error) {
      toast.error("kunne ikke slette bestilling")
    }
  }
  
  return (
    <div className="card card-subtle flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <h2 className="heading-2">{order.clientName}</h2>

        <div className="flex items-center gap-2 shrink-0">
          <button className="btn btn-error" onClick={orderDelete}>Fjern</button>
        </div>
      </div>

      <div className="grid grid-cols-3">
        <div>
          <label className="label">E-post</label>
          <p>{order.clientEmail}</p>
        </div>
        <div>
          <label className="label">Telefon</label>
          <p>{order.clientPhone}</p>
        </div>
        <div>
          <label className="label">Antall</label>
          <p>{order.amount} stk</p>
        </div>
      </div>

      {order.extraDetails && (
        <div>
          <label className="label">Tilleggsinformasjon</label>
          <p className="text-text-faint">{order.extraDetails}</p>
        </div>
      )}
    </div>
  )
}