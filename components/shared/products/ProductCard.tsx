"use client"

import type { ProductCardData } from "@/app/lib/types"
import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { usePopUp } from "@/components/shared/PopUp"

import toast from 'react-hot-toast'
import { deleteProduct, publishProduct } from '@/actions/products'
import { getOrdersByProductId } from '@/actions/orderProduct'

import { IconMenuDots, IconEdit, IconPublish, IconUnpublish, IconDelete, IconSpinner } from "@/app/lib/icons"
import { EDUCATION_FIELD_LABELS } from "@/app/lib/education-fields"
import { isProductPublishable, formatPrice } from "@/app/lib/product-utils"




// A temporary designing decision to have each linje in a different color
// Considering the fact that we dont have that many colors, will probably need to change this in the future :)
const FIELD_BADGE: Record<string, string> = {
  PLUMBER:      'badge-secondary',
  CONCRETE:     'badge-neutral',
  CARPENTER:    'badge-info',
  CONSTRUCTION: 'badge-primary',
}

interface ProductCardProps {
  product: ProductCardData
  isAdmin: boolean
}

type OrderSummary = Awaited<ReturnType<typeof getOrdersByProductId>>[number]

const STATUS_LABELS: Record<string, string> = {
  NEW: 'Ny',
  IN_CONTACT: 'Kontaktet',
  COMPLETED: 'Fullført',
}

const STATUS_BADGE: Record<string, string> = {
  NEW: 'badge-status-new',
  IN_CONTACT: 'badge-status-progress',
  COMPLETED: 'badge-success',
}

function OrderList({ orders }: { orders: OrderSummary[] }) {
  return (
    <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
      {orders.map(order => (
        <div key={order.id} className="flex items-center justify-between gap-2 px-3 py-2 bg-sunken rounded">
          <span className="small-text font-medium truncate">{order.clientName}</span>
          <div className="flex items-center gap-2 shrink-0">
            <span className="small-text text-muted">{order.amount} stk</span>
            <span className={`badge ${STATUS_BADGE[order.status]}`}>{STATUS_LABELS[order.status]}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function DeleteProduct({ productID, openPopUp }: {
  productID: number
  openPopUp: ReturnType<typeof usePopUp>['open']
}) {
  const router = useRouter()
  const [fetching, setFetching] = useState(false)

  const handleDelete = async (deleteOrders?: boolean) => {
    try {
      await toast.promise(deleteProduct(productID, deleteOrders ?? false), {
        loading: 'Sletter produkt…',
        success: 'Produkt slettet',
        error: 'Kunne ikke slette produktet',
      })
      router.refresh()
    } catch {}
  }

  const handleClick = async () => {
    setFetching(true)
    try {
      const orders = await getOrdersByProductId(productID)
      openPopUp({
        title: "Vil du slette produktet?",
        subtitle: orders.length > 0
          ? `Dette produktet har ${orders.length} tilknyttede bestillinger. Sletting kan ikke angres.`
          : undefined,
        content: orders.length > 0 ? <OrderList orders={orders} /> : undefined,
        checkbox: orders.length > 0
          ? { label: `Slett alle tilknyttede bestillinger (${orders.length} stk)`, defaultChecked: false }
          : undefined,
        yesLabel: "Slett",
        noLabel: "Avbryt",
        onYes: handleDelete,
      })
    } finally {
      setFetching(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={fetching}
      className="btn btn-ghost w-full justify-start gap-2 text-lg text-error hover:bg-error-bg disabled:opacity-60"
    >
      {fetching ? <IconSpinner size={18} className="animate-spin" /> : <IconDelete />}
      Slett
    </button>
  )
}

function Publish({ productID, openPopUp, publish, canPublish }: {
  productID: number
  openPopUp: ReturnType<typeof usePopUp>['open']
  publish: boolean
  canPublish: boolean
}) {
  const router = useRouter()
  const handleConfirm = async () => {
    try {
      await toast.promise(publishProduct(productID, !publish), {
        loading: publish ? 'Publiserer…' : 'Gjør til utkast…',
        success: publish ? 'Produkt publisert' : 'Produkt gjort om til utkast',
        error: publish ? 'Kunne ikke publisere produktet' : 'Kunne ikke gjøre produktet til utkast',
      })
      router.refresh()
    } catch {}
  }
  return (
    <button
      onClick={() => openPopUp({
        title: publish ? "Vil du publisere produktet?" : "Vil du gjøre produktet til utkast?",
        subtitle: publish
          ? "Trykker du ja vil produktet bli offentliggjort"
          : "Trykker du ja vil produktet ikke lengere være synlig for kunder",
        yesLabel: publish ? "Publiser produkt" : "Gjør til utkast",
        noLabel: 'Avbryt',
        onYes: handleConfirm,
      })}
      disabled={publish && !canPublish}
      className="btn btn-ghost w-full justify-start gap-2 text-lg text-secondary hover:bg-error-bg whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {publish ? <IconPublish /> : <IconUnpublish />}
      {publish ? "Publiser" : "Gjør utkast"}
    </button>
  )
}

export default function ProductCard({ product, isAdmin }: ProductCardProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const { open: openPopUp, element: popUpElement } = usePopUp()

  const closeMenu = useCallback(() => { if (open && !closing) setClosing(true) }, [open, closing])
  function handleAnimationEnd() { if (closing) { setClosing(false); setOpen(false) } }

  useEffect(() => {
    if (!open || closing) return
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) closeMenu()
    }
    function onKeyDown(e: KeyboardEvent) { if (e.key === 'Escape') closeMenu() }
    function onScroll() { closeMenu() }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('scroll', onScroll)
    } 
  }, [open, closing, closeMenu])

  return (
 // No overflow-hidden here — it would clip the admin dropdown
  <>
   
    <div
      className={` card group flex flex-col p-0 hover:border-primary transition-colors duration-200 hover:shadow-md cursor-pointer`}
      onClick={() => router.push(isAdmin ? `/admin/preview-produkt/${product.id}` : `/produkter/${product.id}`)}
      onMouseLeave={closeMenu}
    >
      {popUpElement}

      {/* Image — overflow-hidden is scoped here so it doesn't clip the dropdown */}
      <div className="relative w-full aspect-4/3 overflow-hidden rounded-t-lg bg-surface">
        {product.image ? (
          <Image
            src={`/images/low-res/${product.image.id}.webp`}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center small-text text-faint">
            Ingen bilde
          </div>
        )}

        {product.educationField && (
          <span className={`badge ${FIELD_BADGE[product.educationField]} absolute top-2 left-2`}>
            {EDUCATION_FIELD_LABELS[product.educationField]}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-4">

        {/* Title + admin menu */}
        <div className="flex items-start justify-between gap-2">
          <span className="heading-4 group-hover:text-primary transition-colors duration-150 leading-snug">
            {product.title}
          </span>

          {isAdmin && (
            // z-[2] keeps the admin menu above the stretched link
            <div ref={menuRef} className="relative shrink-0" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => open ? closeMenu() : setOpen(true)}
                className="btn btn-ghost w-8 h-8 p-0"
                aria-label="Alternativer"
              >
                <IconMenuDots />
              </button>

              {(open || closing) && (
                <div
                  onAnimationEnd={handleAnimationEnd}
                  className={`card absolute right-0 bottom-full mb-1 z-20 flex flex-col p-1 min-w-24 shadow-md ${closing ? 'animate-[dropdown-out_0.15s_ease_both]' : 'animate-[dropdown-in_0.15s_ease_both]'}`}
                >
                  <Link
                    href={`/admin/oppdater-produkt/${product.id}`}
                    onClick={() => closeMenu()}
                    className="btn btn-ghost w-full justify-start gap-2 text-lg"
                  >
                    <IconEdit />
                    Rediger
                  </Link>
                  <hr className="border-border my-1" />
                  <DeleteProduct productID={product.id} openPopUp={openPopUp} />
                  <hr className="border-border my-1" />
                  <Publish productID={product.id} openPopUp={openPopUp} publish={product.draft} canPublish={isProductPublishable(product)} />
                  
                </div>
              )}
            </div>
          )}
        </div>

        {/* Price + stock */}
        <div className="flex items-center justify-between">
          <span className="font-semibold text-text">
            {formatPrice(product.price)}
          </span>
          <div className="flex flex-row gap-2">
            {product.draft ? <span className="badge badge-info">Utkast</span> : ""}
            {product.amount > 0 ? (
              <span className="badge badge-neutral">{product.amount} stk</span>
            ) : (
              <span className="badge badge-error">Utsolgt</span>
            )}
          </div>
        </div>

      </div>
    </div>
    </>
  )
}

