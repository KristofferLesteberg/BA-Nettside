"use client"
import { HiOutlinePlusSm } from 'react-icons/hi'
import { createDraftProduct, getAllProducts } from '@/actions/products'
import FilteredProductsGrid from '../shared/products/FilteredProductsGrid'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Products = Awaited<ReturnType<typeof getAllProducts>>

export default function AdminProductsView() {
  const router = useRouter()
  const [products, setProducts] = useState<Products>([])

  useEffect(() => {
    getAllProducts().then(setProducts)
  }, [])

  const handleNewProduct = async () => {
    const { id } = await createDraftProduct()
    router.push(`/admin/oppdater-produkt/${id}`)
  }

  return (
    <FilteredProductsGrid
      products={products}
      isAdmin={true}
      sidebarAction={
        <button onClick={handleNewProduct} className="btn btn-primary w-full gap-1.5">
          <HiOutlinePlusSm className="text-base" />
          Ny produkt
        </button>
      }
    />
  )
}
