"use client"

import { OrderStatus as PrismaOrderStatus } from "@/generated/prisma"
import { useEffect, useMemo } from "react"
import type { OrderWithProduct } from "@/actions/orderProduct"
import OrderProductCard from "./OrderProductCard"
import { useSearchParams, useRouter } from "next/navigation"
import Pagination from "@/components/shared/Pagination"
import FilterPanel, { FilterOption } from "@/components/shared/FilterPanel"

export type { OrderWithProduct }

export type OrderStatusFilter = PrismaOrderStatus | "ALL"
export type SortOption = "nyeste" | "eldste"

interface Props {
  orders: OrderWithProduct[]
}

const STATUS_OPTIONS: { value: OrderStatusFilter; urlValue: string; label: string }[] = [
  { value: "ALL",        urlValue: "alle",      label: "Alle"      },
  { value: "NEW",        urlValue: "ny",        label: "Ny"        },
  { value: "IN_CONTACT", urlValue: "i-kontakt", label: "I kontakt" },
  { value: "COMPLETED",  urlValue: "ferdig",    label: "Ferdig"    },
]

const STATUS_FROM_URL: Record<string, OrderStatusFilter> = {
  alle:      "ALL",
  ny:        "NEW",
  "i-kontakt": "IN_CONTACT",
  ferdig:    "COMPLETED",
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "nyeste", label: "Nyeste" },
  { value: "eldste", label: "Eldste" },
]

export default function FilteredOrdersGrid({ orders }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const status = STATUS_FROM_URL[searchParams.get('status') ?? 'alle'] ?? 'ALL'
  const sort = (searchParams.get('sort') as SortOption) ?? 'nyeste'

  function setFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set(key, value)
    const qs = params.toString()
    const forStorage = new URLSearchParams(qs)
    forStorage.delete('tab')
    sessionStorage.setItem('tabFilters_bestillinger', forStorage.toString())
    router.replace('?' + qs)
  }

  useEffect(() => {
    const hasFilters = ['status', 'sort'].some(k => searchParams.get(k))
    if (!hasFilters) {
      const saved = sessionStorage.getItem('tabFilters_bestillinger')
      if (saved) router.replace('?' + saved + '&tab=bestillinger')
    }
  }, [])

  const filtered = useMemo(() => {
    const result = orders.filter(order => status === "ALL" || order.status === status)
    if (sort === "eldste") result.sort((a, b) => a.id - b.id)
    else result.sort((a, b) => b.id - a.id)
    return result
  }, [orders, status, sort])

  const currentPage = Number(searchParams.get('page') ?? '1')
  const pageSize = Number(searchParams.get('pageSize') ?? '10')
  const maxPage = Math.ceil(filtered.length / pageSize)
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const statusActiveCount = status !== "ALL" ? 1 : 0

  const categories = [
    {
      label: 'Status',
      activeCount: statusActiveCount,
      controls: STATUS_OPTIONS.map(opt => (
        <FilterOption
          key={opt.value}
          active={status === opt.value}
          onClick={() => setFilter('status', opt.urlValue)}
        >
          {opt.label}
        </FilterOption>
      )),
    },
    {
      label: 'Sorter',
      controls: SORT_OPTIONS.map(opt => (
        <FilterOption
          key={opt.value}
          active={sort === opt.value}
          onClick={() => setFilter('sort', opt.value)}
        >
          {opt.label}
        </FilterOption>
      )),
    },
  ]

  return (
    <FilterPanel categories={categories} activeFilterCount={statusActiveCount}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 small-text text-muted">
            <span>{filtered.length} {filtered.length === 1 ? "bestilling" : "bestillinger"}</span>
            <span>·</span>
            <span>Side {currentPage} av {maxPage}</span>
          </div>
          <select
            value={pageSize}
            onChange={e => setFilter('pageSize', e.target.value)}
            className="input w-auto py-1 text-sm cursor-pointer"
          >
            {[10, 20, 30, 40, 50].map(n => (
              <option key={n} value={n}>{n} per side</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-5">
          {paginated.map(order => (
            <OrderProductCard order={order} key={order.id} />
          ))}
        </div>
        <div className="mx-auto mt-10">
          <Pagination currentPage={currentPage} maxPages={maxPage} />
        </div>
      </div>
    </FilterPanel>
  )
}
