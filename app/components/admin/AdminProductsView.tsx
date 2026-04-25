"use client"

import Link from 'next/link'
import { HiOutlinePlusSm } from 'react-icons/hi'
import type { ProductCardData } from '@/app/lib/types'
import FilteredProductsGrid from '@/app/components/product/FilteredProductsGrid'

// Admin-specific filter state lives here as the project grows.
// Example of adding a filter:
//   const [inStockOnly, setInStockOnly] = useState(false)
//   const extraFilters = useMemo(() => inStockOnly ? [(p: ProductCardData) => p.amount > 0] : [], [inStockOnly])
//
// Then pass extraFilters and extraControls to FilteredProductsGrid below.

export default function AdminProductsView({ products }: { products: ProductCardData[] }) {
  return (
    <FilteredProductsGrid
      products={products}
      isAdmin={true}
      extraControls={
        <Link href="/admin/newProduct" className="btn btn-primary ml-auto gap-1.5">
          <HiOutlinePlusSm className="text-base" />
          Ny annonse
        </Link>
      }
    />
  )
}
