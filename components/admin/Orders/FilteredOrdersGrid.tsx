"use client"
import { Prisma, OrderStatus as PrismaOrderStatus } from "@/generated/prisma"
import { useMemo, useState } from "react"
import OrderProductCard from '../OrderProductCard'

type OrderWithProduct = Prisma.ProductOrderGetPayload<{
  include: { product: { include: { images: true } } }
}>

interface Props {
  orders: OrderWithProduct[]
}

export type OrderStatus = PrismaOrderStatus | 'ALL'

const STATUS_OPTIONS: { value: OrderStatus, label: string }[] = [
  { value: 'NEW',        label: 'Ny'        },
  { value: 'IN_CONTACT', label: 'I Kontakt' },
  { value: 'COMPLETED',  label: 'Ferdig'    },
  { value: 'ALL',        label: 'Alle'      },
]

export default function FilteredOrdersGrid({ orders }: Props) {
  const [status, setStatus] = useState<OrderStatus>("ALL")

  const filtered = useMemo(() => {
    return orders.filter((order) => {
      if (status === 'ALL') return true
      return order.status === status
    })
  }, [status, orders])

  const filter = (
    <div className="flex flex-col gap-1.5">
      <div>
        {STATUS_OPTIONS.map((sta) => (
          <button
            key={sta.value}
            onClick={() => setStatus(sta.value)}
            className={`btn w-full justify-start ${status === sta.value ? 'btn-primary' : 'btn-outline'}`}
          >
            {sta.label}
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div>
      <div>
        {filter}
      </div>
      <div>
        {filtered.map((order, key) => (
          <OrderProductCard order={order} key={key} />
        ))}
      </div>
    </div>
  )
}
