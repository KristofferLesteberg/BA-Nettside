"use client"

import type { ProductCardData } from "@/app/lib/types"
import DeleteProduct from "../admin/DeleteProduct"
import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef, useEffect } from "react"
import { BsThreeDots } from "react-icons/bs"
import { MdOutlineModeEdit } from "react-icons/md"

const FIELD_LABEL: Record<string, string> = {
  BUILDING:     'Bygg',
  CONSTRUCTION: 'Anlegg',
}

// A temporary designing decision to have each linje in a different color
// Considering the fact that we dont have that many colors, will probably need to change this in the future :)
const FIELD_BADGE: Record<string, string> = {
  BUILDING:     'badge-secondary',
  CONSTRUCTION: 'badge-primary',
}

interface ProductCardProps {
  product: ProductCardData
  isAdmin: boolean
}

export default function ProductCard({ product, isAdmin }: ProductCardProps) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [open])

  return (
    // No overflow-hidden here — it would clip the admin dropdown
    <div className="card group flex flex-col p-0 hover:border-primary transition-colors duration-200 hover:shadow-md">

      {/* Image — overflow-hidden is scoped here so it doesn't clip the dropdown */}
      <Link href={`/products/${product.id}`} className="relative block w-full aspect-4/3 overflow-hidden rounded-t-lg bg-surface">
        {product.image ? (
          <Image
            src={`/images/${product.image.id}.webp`}
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
            {FIELD_LABEL[product.educationField]}
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col gap-3 p-4">

        {/* Title + admin menu */}
        <div className="flex items-start justify-between gap-2">
          <Link href={`/products/${product.id}`} className="heading-4 hover:text-primary transition-colors duration-150 leading-snug">
            {product.title}
          </Link>

          {isAdmin && (
            <div ref={menuRef} className="relative shrink-0">
              <button
                type="button"
                onClick={() => setOpen(prev => !prev)}
                className="btn btn-ghost w-8 h-8 p-0"
                aria-label="Alternativer"
              >
                <BsThreeDots />
              </button>

              {open && (
                <div className="card absolute right-0 bottom-full mb-1 z-20 flex flex-col p-1 min-w-24 shadow-md">
                  <Link
                    href={`/admin/updateProduct/${product.id}`}
                    onClick={() => setOpen(false)}
                    className="btn btn-ghost w-full justify-start gap-2 text-lg"
                  >
                    <MdOutlineModeEdit />
                    Rediger
                  </Link>
                  <hr className="border-border my-1" />
                  <DeleteProduct productID={product.id} />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Price + stock */}
        <div className="flex items-center justify-between">
          <span className="font-semibold text-text">
            {product.price.toLocaleString('nb-NO')} kr
          </span>
          {product.amount > 0 ? (
            <span className="badge badge-neutral">{product.amount} stk</span>
          ) : (
            <span className="badge badge-error">Utsolgt</span>
          )}
        </div>

      </div>
    </div>
  )
}
