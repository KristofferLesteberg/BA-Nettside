"use client"
import { deleteOrder } from "@/actions/orderProduct"
import { Prisma } from "@/generated/prisma"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

type OrderWithProduct = Prisma.ProductOrderGetPayload<{
  include: { product: { include: { images: true } } }
}>

interface Props {
  order: OrderWithProduct
}

export default function OrderCard({ order }: Props) {
  const router = useRouter()

  const orderDelete = async () => {
    try {
      await deleteOrder(order.id)
      toast.success("Bestilling fjernet!")
      router.refresh()
    } catch {
      toast.error("Kunne ikke slette bestilling")
    }
  }

  const thumbnail = order.product?.images?.[0]?.id

  return (
    <div className="card card-subtle flex flex-col gap-4">

      {/* Header — client name + delete */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="heading-3">{order.clientName}</h2>
          <p className="small-text">Bestilling #{order.id}</p>
        </div>
        <button className="btn btn-error shrink-0" onClick={orderDelete}>Fjern</button>
      </div>
      <hr />
      <hr />
      {/* Contact info */}
      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col gap-1">
          <span className="label">E-post</span>
          <p className="small-text">{order.clientEmail}</p>
        </div>
        <div className="flex flex-col gap-1">
          <span className="label">Telefon</span>
          <p className="small-text">{order.clientPhone}</p>
        </div>
        {order.extraDetails && (
          <div className="flex flex-col gap-1">
            <span className="label">Tilleggsinformasjon</span>
            <p className="small-text text-text-faint">{order.extraDetails}</p>
          </div>
        )}
      </div>
      {/* Product info */}
      {order.product ? (
        <Link href={`produkter/${order.productId}`}>
          <div className="card-accented flex items-center gap-4 px-4 py-3 rounded-lg">
            {thumbnail && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`/images/${thumbnail}.webp`}
                alt={order.product.title}
                className="w-16 h-16 object-cover rounded-md shrink-0"
              />
            )}
            <div className="flex flex-1 items-center justify-between gap-4">
              <div className="flex flex-col gap-0.5">
                <span className="label">Produkt</span>
                <p className="body-text">{order.product.title}</p>
              </div>
              <div className="flex items-center gap-6 shrink-0">
                <div className="flex flex-col items-end gap-0.5">
                  <span className="label">Antall</span>
                  <p className="body-text">{order.amount} stk</p>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="label">Pris per stk</span>
                  <p className="body-text">NOK {Number(order.product.price).toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="label">Totalt</span>
                  <p className="body-text font-semibold">
                    NOK {(Number(order.product.price) * order.amount).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <p className="small-text text-text-faint">Ingen produkt tilknyttet</p>
      )}

    </div>
  )
}
