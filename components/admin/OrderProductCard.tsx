"use client"
import { deleteOrder, UpdateOrder } from "@/actions/orderProduct"
import { Prisma, OrderStatus } from "@/generated/prisma"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"


type OrderWithProduct = Prisma.ProductOrderGetPayload<{
  include: { product: { include: { images: true } } }
}>

interface Props {
  order: OrderWithProduct
}

const STATUS_LABELS: Record<OrderStatus, string> = {
  NEW: 'Ny bestilling',
  IN_CONTACT: 'I kontakt',
  COMPLETED: 'Ferdig',
}

const STATUS_STYLES: Record<OrderStatus, string> = {
  NEW: 'badge badge-success',
  IN_CONTACT: 'badge badge-warning',
  COMPLETED: 'badge badge-info',
}

export default function OrderCard({ order }: Props) {
  const router = useRouter()
  const [showProduct, setShowProduct] = useState(false)


  const orderDelete = async () => {
    if (!window.confirm('Vil du slette bestillingen?')) return
    try {
      await deleteOrder(order.id)
      toast.success("Bestilling fjernet!")
      router.refresh()
    } catch {
      toast.error("Kunne ikke slette bestilling")
    }
  }

  const updateStatus = async (status: OrderStatus) => {
    try {
      await UpdateOrder(order.id, status)
      toast.success("Status oppdatert")
      router.refresh()
    } catch(error) {
      toast.error("Kunne ikke endre status")
    }
  }
  const thumbnail = order.product?.images?.[0]?.id

  return (
    <div className="card-subtle flex flex-col gap-0 overflow-hidden border">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={STATUS_STYLES[order.status]}>{STATUS_LABELS[order.status]}</span>
            <span className="text-faint small-text">#{order.id}</span>
          </div>
          <h2 className="heading-3">{order.clientName}</h2>
        </div>

        <div className="flex items-center gap-2 shrink-0 pt-1">
          <select
            className="input w-auto cursor-pointer text-sm"
            defaultValue=""
            onChange={(e) => updateStatus(e.target.value as OrderStatus)}
            >
            <option value="" disabled>Endre status</option>
            <option value="NEW">Ny bestilling</option>
            <option value="IN_CONTACT">I kontakt</option>
            <option value="COMPLETED">Ferdig</option>
          </select>
          <button className="btn btn-error" onClick={orderDelete}>Fjern</button>
        </div>
      </div>

      <hr />

      {/* Contact info */}
      <div className="grid grid-cols-3 gap-4 px-6 py-4 bg-sunken">
        <div className="flex flex-col gap-0.5">
          <span className="label">E-post</span>
          <p className="small-text">{order.clientEmail}</p>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="label">Telefon</span>
          <p className="small-text">{order.clientPhone}</p>
        </div>
        {order.extraDetails ? (
          <div className="flex flex-col gap-0.5">
            <span className="label">Tilleggsinformasjon</span>
            <p className="small-text text-faint">{order.extraDetails}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-0.5">
            <span className="label">Antall</span>
            <p className="small-text">{order.amount} stk</p>
          </div>
        )}
      </div>

      {/* Product toggle */}
      {order.product && (
        <>
          <hr />
          <div className="px-6 py-3">
            <button
              className="btn btn-ghost w-full justify-between"
              onClick={() => setShowProduct(prev => !prev)}
            >
              <span className="label">Produkt — {order.product.title}</span>
              <span className="text-faint text-sm">{showProduct ? '▲ Skjul' : '▼ Vis info'}</span>
            </button>
          </div>

          {showProduct && (
            <div className="px-6 pb-5">
              <Link
                href={`/produkter/${order.productId}`}
                className="card-accented flex items-center gap-4 hover:opacity-80 transition-opacity"
              >
                {thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`/images/${thumbnail}.webp`}
                    alt={order.product.title}
                    className="w-20 h-20 object-cover rounded-md shrink-0"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-md bg-muted shrink-0 flex items-center justify-center">
                    <span className="text-faint text-xs">Inget bilde</span>
                  </div>
                )}

                <div className="flex flex-1 items-center justify-between gap-6 flex-wrap">
                  <div className="flex flex-col gap-0.5">
                    <span className="label">Produkt</span>
                    <p className="body-text font-medium">{order.product.title}</p>
                  </div>
                  <div className="flex gap-6 shrink-0">
                    <div className="flex flex-col items-end gap-0.5">
                      <span className="label">Antall</span>
                      <p className="small-text">{order.amount} stk</p>
                    </div>
                    <div className="flex flex-col items-end gap-0.5">
                      <span className="label">Pris/stk</span>
                      <p className="small-text">NOK {Number(order.product.price).toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col items-end gap-0.5">
                      <span className="label">Totalt</span>
                      <p className="small-text font-semibold" style={{ color: 'var(--color-primary)' }}>
                        NOK {(Number(order.product.price) * order.amount).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </>
      )}

    </div>
  )
}
