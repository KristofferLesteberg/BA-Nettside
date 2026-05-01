import Link from 'next/link'
import { HiOutlinePlusSm } from 'react-icons/hi'
import { getAllProducts } from '@/actions/products'
import FilteredProductsGrid from '../shared/products/FilteredProductsGrid'

export default async function AdminProductsView() {
  const convertedProducts = await getAllProducts()

  return (
    <FilteredProductsGrid
      products={convertedProducts}
      isAdmin={true}
      sidebarAction={
        <Link href="/admin/nytt-produkt" className="btn btn-primary w-full gap-1.5">
          <HiOutlinePlusSm className="text-base" />
          Ny produkt
        </Link>
      }
    />
  )
}
