"use client"
import { deleteOrder, getAllOrders, UpdateOrder } from "@/actions/orderProduct"
import { OrderStatus } from "@/generated/prisma"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { usePopUp } from "@/components/shared/PopUp"
import toast from "react-hot-toast"
import {
  IconDelete, IconEmail, IconPhone, IconProductQty, IconProduct,
  IconChevronDown, IconInfo, IconStatusChange,
} from "@/app/lib/icons"
import { formatPrice } from "@/app/lib/product-utils"

type OrderWithProduct = Awaited<ReturnType<typeof getAllOrders>>[number]

interface Props {
  order: OrderWithProduct
}

const STATUS_LABELS: Record<OrderStatus, string> = {
  NEW:        'Ny bestilling',
  IN_CONTACT: 'I kontakt',
  COMPLETED:  'Ferdig',
}

const STATUS_STYLES: Record<OrderStatus, string> = {
  NEW:        'badge badge-md badge-success',
  IN_CONTACT: 'badge badge-md badge-warning',
  COMPLETED:  'badge badge-md badge-info',
}

const ALL_STATUSES: OrderStatus[] = ['NEW', 'IN_CONTACT', 'COMPLETED']

export default function OrderCard({ order }: Props) {
  const router = useRouter()
  const { open: openPopUp, element: popUpElement } = usePopUp()
  const [showProduct, setShowProduct] = useState(false)
  const [kontaktOpen, setKontaktOpen] = useState(false)
  const [descOpen,    setDescOpen]    = useState(false)

  const [menuMounted, setMenuMounted] = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const menuRef    = useRef<HTMLDivElement>(null)

  const openMenu = () => {
    clearTimeout(closeTimer.current)
    setMenuMounted(true)
    setMenuOpen(true)
  }

  const closeMenu = () => {
    setMenuOpen(false)
    closeTimer.current = setTimeout(() => setMenuMounted(false), 150)
  }

  useEffect(() => {
    if (!menuMounted) return
    const onDown   = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) closeMenu()
    }
    const onScroll = () => closeMenu()
    document.addEventListener('mousedown', onDown)
    window.addEventListener('scroll', onScroll, true)
    return () => {
      document.removeEventListener('mousedown', onDown)
      window.removeEventListener('scroll', onScroll, true)
    }
  }, [menuMounted])

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  const orderDelete = async () => {
    try {
      await toast.promise(deleteOrder(order.id), {
        loading: 'Sletter bestilling…',
        success: 'Bestilling fjernet',
        error: 'Kunne ikke slette bestilling',
      })
      router.refresh()
    } catch {}
  }

  const handleStatusChange = async (status: OrderStatus) => {
    closeMenu()
    if (status === order.status) return
    try {
      await toast.promise(UpdateOrder(order.id, status), {
        loading: 'Oppdaterer status…',
        success: 'Status oppdatert',
        error: 'Kunne ikke endre status',
      })
      router.refresh()
    } catch {}
  }

  const thumbnail = order.product?.images?.[0]?.id

  return (
    <div className="card card-subtle py-3 px-5" role="article">
      {popUpElement}

      {/* Main row */}
      <div className="flex items-center">

        {/* Left: name, id, mobile badges */}
        <div className="flex-1 min-w-0">
          <p className="heading-4 truncate">{order.clientName}</p>
          <p className="small-text text-faint font-mono mt-0.5">#{order.id}</p>
          <div className="md:hidden flex items-center gap-2 flex-wrap mt-1.5">
            <span className={STATUS_STYLES[order.status]}>
              {STATUS_LABELS[order.status]}
            </span>
            {order.product && (
              <span className="badge badge-lg badge-neutral gap-1.5">
                <IconProduct className="shrink-0" aria-hidden="true" />
                <span className="truncate max-w-32">{order.product.title}</span>
              </span>
            )}
          </div>
        </div>

        {/* Middle: inline info — desktop only */}
        <div className="hidden md:flex items-center shrink-0">
          <div className="w-px self-stretch bg-border" />

          <div className="flex items-center gap-2">
            <div className="w-32 flex justify-center -mr-1.5">
              <span className={STATUS_STYLES[order.status]}>
                {STATUS_LABELS[order.status]}
              </span>
            </div>

            {order.product && (
              <div className="flex justify-center -ml-1.5">
                <span className="badge badge-lg badge-neutral gap-1.5 max-w-48">
                  <IconProduct className="shrink-0" aria-hidden="true" />
                  <span className="truncate">{order.product.title}</span>
                </span>
              </div>
            )}

            <div className="w-px self-stretch bg-border mx-1" />

            <div className="flex flex-col gap-0.5">
              <a href={`mailto:${order.clientEmail}`} className="text-secondary hover:underline flex items-center gap-1.5 small-text whitespace-nowrap">
                <IconEmail className="text-text-faint shrink-0" aria-hidden="true" />
                {order.clientEmail}
              </a>
              <a href={`tel:${order.clientPhone}`} className="text-secondary hover:underline flex items-center gap-1.5 small-text whitespace-nowrap">
                <IconPhone className="text-text-faint shrink-0" aria-hidden="true" />
                {order.clientPhone}
              </a>
            </div>

            <div className="w-px self-stretch bg-border mx-1" />

            <span className="flex items-center gap-1.5 small-text text-text font-medium whitespace-nowrap">
              <IconProductQty className="text-text-faint shrink-0 w-4 h-4" aria-hidden="true" />
              {order.amount} stk
            </span>
          </div>

          <div className="w-px self-stretch bg-border mx-5" />
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-0.5 shrink-0">
          <div ref={menuRef} className="relative">
            <button
              onClick={menuOpen ? closeMenu : openMenu}
              className="btn btn-ghost p-2"
              title="Endre status"
              aria-label="Endre status"
              aria-expanded={menuOpen}
              aria-haspopup="true"
            >
              <IconStatusChange className="w-5 h-5" aria-hidden="true" />
            </button>

            {menuMounted && (
              <div role="menu" className={`absolute top-full right-0 mt-1 z-10 card rounded-md flex flex-col p-1 min-w-40 shadow-lg ${menuOpen ? 'animate-dropdown-in' : 'animate-dropdown-out'}`}>
                {ALL_STATUSES.map(s => (
                  <button
                    key={s}
                    role="menuitem"
                    onClick={() => handleStatusChange(s)}
                    className={`relative text-left pl-4 pr-3 py-2 rounded-[calc(var(--radius-md)-2px)] small-text transition-colors hover:bg-surface-raised cursor-pointer ${order.status === s ? 'font-semibold text-text' : 'text-text-muted'}`}
                    aria-current={order.status === s ? 'true' : undefined}
                  >
                    {order.status === s && (
                      <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-3/5 rounded-full bg-secondary" />
                    )}
                    {STATUS_LABELS[s]}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => openPopUp({
              title:    "Slett bestillingen?",
              subtitle: "Er du sikker på at du vil slette denne bestillingen? Denne handlingen kan ikke angres.",
              yesLabel: "Ja, slett",
              noLabel:  "Nei, behold",
              onYes:    orderDelete,
            })}
            className="btn btn-ghost p-2 text-error hover:bg-error-bg"
            title="Slett bestilling"
            aria-label="Slett bestilling"
          >
            <IconDelete className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Kontakt accordion — mobile only */}
      <div className="md:hidden mt-2 flex flex-col">
        <div className="border-t border-border">
          <button
            onClick={() => setKontaktOpen(v => !v)}
            className="group flex items-center justify-between w-full py-2 small-text font-medium text-text"
            aria-expanded={kontaktOpen}
            aria-controls={`order-kontakt-${order.id}`}
          >
            Kontakt
            <IconChevronDown className={`w-3 h-3 text-text-faint transition-all duration-150 group-hover:scale-125 group-hover:text-text-muted ${kontaktOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
          <div id={`order-kontakt-${order.id}`} className={`grid transition-[grid-template-rows] duration-200 ${kontaktOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
            <div className="overflow-hidden min-h-0">
              <div className="flex flex-col gap-1.5 pb-2">
                <a href={`mailto:${order.clientEmail}`} className="text-secondary hover:underline flex items-center gap-1.5 small-text">
                  <IconEmail className="text-text-faint shrink-0" aria-hidden="true" />
                  {order.clientEmail}
                </a>
                <a href={`tel:${order.clientPhone}`} className="text-secondary hover:underline flex items-center gap-1.5 small-text">
                  <IconPhone className="text-text-faint shrink-0" aria-hidden="true" />
                  {order.clientPhone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tillegsinformasjon accordion — all screen sizes */}
      <div className="mt-2 border-t border-border">
        <button
          onClick={() => setDescOpen(v => !v)}
          className="group flex items-center justify-between w-full py-2 small-text font-medium text-text"
          aria-expanded={descOpen}
          aria-controls={`order-desc-${order.id}`}
        >
          Tillegsinformasjon
          <IconChevronDown className={`w-3 h-3 text-text-faint transition-all duration-150 group-hover:scale-125 group-hover:text-text-muted ${descOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
        <div id={`order-desc-${order.id}`} className={`grid transition-[grid-template-rows] duration-200 ${descOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
          <div className="overflow-hidden min-h-0">
            <div className="pb-2">
              {order.extraDetails ? (
                <p className="small-text text-muted">{order.extraDetails}</p>
              ) : (
                <span className="flex items-center gap-1.5 small-text text-faint italic">
                  <IconInfo className="shrink-0" aria-hidden="true" />
                  Ingen tillegsinformasjon oppgitt
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product accordion — all screen sizes */}
      {order.product && (
        <div className="mt-2 border-t border-border">
          <button
            onClick={() => setShowProduct(v => !v)}
            className="group flex items-center justify-between w-full py-2 small-text font-medium text-text"
            aria-expanded={showProduct}
            aria-controls={`order-product-${order.id}`}
          >
            Produktdetaljer
            <IconChevronDown className={`w-3 h-3 text-text-faint transition-all duration-150 group-hover:scale-125 group-hover:text-text-muted ${showProduct ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
          <div id={`order-product-${order.id}`} className={`grid transition-[grid-template-rows] duration-200 ${showProduct ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
            <div className="overflow-hidden min-h-0">
              <div className="pb-2">
                <Link
                  href={`/produkter/${order.productId}`}
                  className="card-accented flex items-center gap-4 hover:opacity-80 transition-opacity"
                >
                  {thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`/images/low-res/${thumbnail}.webp`}
                      alt={order.product.title}
                      className="w-16 h-16 object-cover rounded-md shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-md bg-muted shrink-0 flex items-center justify-center">
                      <IconProduct className="text-text-faint text-lg" aria-hidden="true" />
                    </div>
                  )}

                  <div className="flex flex-1 items-center justify-between gap-4 flex-wrap">
                    <p className="body-text font-medium">{order.product.title}</p>
                    <div className="flex gap-4 shrink-0 flex-wrap">
                      <div className="flex flex-col items-end gap-0.5">
                        <span className="label">Antall</span>
                        <p className="small-text">{order.amount} stk</p>
                      </div>
                      <div className="flex flex-col items-end gap-0.5">
                        <span className="label">Pris/stk</span>
                        <p className="small-text">{formatPrice(order.product.price)}</p>
                      </div>
                      <div className="flex flex-col items-end gap-0.5">
                        <span className="label">Totalt</span>
                        <p className="small-text font-semibold text-primary">
                          {formatPrice(Number(order.product.price) * order.amount)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
