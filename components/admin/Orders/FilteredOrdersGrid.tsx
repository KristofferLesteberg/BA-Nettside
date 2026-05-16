"use client"

import { OrderStatus as PrismaOrderStatus } from "@/generated/prisma"
import { useMemo, useState } from "react"
import { FaSliders, FaXmark } from "react-icons/fa6"
import type { OrderWithProduct } from "@/actions/orderProduct"
import OrderProductCard from "./OrderProductCard"

export type { OrderWithProduct }

export type OrderStatusFilter = PrismaOrderStatus | "ALL"
export type SortOption = "newest" | "oldest"


interface Props {
  orders: OrderWithProduct[]
  sidebarAction?: React.ReactNode
}

const STATUS_OPTIONS: { value: OrderStatusFilter; label: string }[] = [
  { value: "ALL",        label: "Alle"      },
  { value: "NEW",        label: "Ny"        },
  { value: "IN_CONTACT", label: "I kontakt" },
  { value: "COMPLETED",  label: "Ferdig"    },
]

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Nyeste" },
  { value: "oldest", label: "Eldste" },
]

export default function FilteredOrdersGrid({ orders, sidebarAction }: Props) {
  const [status, setStatus] = useState<OrderStatusFilter>("ALL")
  const [sort, setSort] = useState<SortOption>("newest")
  const [drawerOpen, setDrawerOpen] = useState(false)

  const filtered = useMemo(() => {
    const result = orders.filter(order => {
      if (status !== "ALL" && order.status !== status) return false
      return true
    })
    switch (sort) {
      case "newest": result.sort((a, b) => b.id - a.id); break
      case "oldest": result.sort((a, b) => a.id - b.id); break
    }
    return result
  }, [orders, status, sort])

  const activeFilterCount = status !== "ALL" ? 1 : 0

  const controlPanel = (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className="label">Status</span>
        <div className="flex flex-col gap-1.5">
          {STATUS_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setStatus(opt.value)}
              className={`btn w-full justify-start ${status === opt.value ? "btn-primary" : "btn-outline"}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-border" />

      <div className="flex flex-col gap-2">
        <span className="label">Sorter</span>
        <div className="flex flex-col gap-1.5">
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setSort(opt.value)}
              className={`btn w-full justify-start ${sort === opt.value ? "btn-secondary" : "btn-outline"}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex gap-8 items-start">

      {/* Orders list */}
      <div className="flex-1 min-w-0 flex flex-col gap-4">

        {/* Mobile controls — hidden on desktop */}
        <div className="flex flex-col gap-2 lg:hidden">
          {sidebarAction}
          <div className="flex items-center justify-between">
            <p className="small-text">
              {filtered.length} {filtered.length === 1 ? "bestilling" : "bestillinger"}
            </p>
            <button onClick={() => setDrawerOpen(true)} className="btn btn-outline gap-2">
              <FaSliders />
              Filtre{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {filtered.map(order => (
            <OrderProductCard order={order} key={order.id} />
          ))}
        </div>
      </div>

      {/* Desktop sidebar — hidden on mobile */}
      <aside className="hidden lg:flex flex-col gap-0 w-56 shrink-0 sticky top-28 card">
        {sidebarAction && (
          <>
            {sidebarAction}
            <hr className="border-border my-5" />
          </>
        )}
        {controlPanel}
      </aside>

      {/* Mobile backdrop */}
      <div
        onClick={() => setDrawerOpen(false)}
        className={`fixed inset-0 z-59 bg-black/40 lg:hidden transition-opacity duration-300 ${drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Mobile drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 z-60 bg-bg border-l border-border shadow-xl flex flex-col gap-0 overflow-y-auto lg:hidden transition-transform duration-300 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-bg">
          <h2 className="heading-4">Filtre</h2>
          <button onClick={() => setDrawerOpen(false)} className="btn btn-ghost w-8 h-8 p-0">
            <FaXmark />
          </button>
        </div>
        <div className="p-5 flex-1">
          {controlPanel}
        </div>
      </aside>

    </div>
  )
}
