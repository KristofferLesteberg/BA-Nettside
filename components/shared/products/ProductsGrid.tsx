"use client"

import dynamic from 'next/dynamic'
import PublicProductCard from './PublicProductCard'
import type { ProductCardData } from "@/app/lib/types"

// Loaded only on admin routes — keeps admin-only deps (react-hot-toast, server
// actions, usePopUp) out of the public bundle entirely.
const AdminProductCard = dynamic(() => import('./ProductCard'))

interface ProductsGridProps {
  products: ProductCardData[]
  isAdmin: boolean
}

export default function ProductsGrid({ products, isAdmin }: ProductsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) =>
        (!product.draft || isAdmin) ? (
          isAdmin
            ? <AdminProductCard key={product.id} product={product} isAdmin={true} />
            : <PublicProductCard key={product.id} product={product} priority={index < 3} />
        ) : null
      )}
    </div>
  )
}
