
import { HiOutlinePlusSm } from 'react-icons/hi'
import { createDraftProduct, getAllProducts } from '@/actions/products'
import FilteredProductsGrid from '../shared/products/FilteredProductsGrid'
import CreateProduct from './CreateProduct'

export default async function AdminProductsView() {

  const products = await getAllProducts()

 
  
  return (
    <FilteredProductsGrid
      products={products}
      isAdmin={true}
      sidebarAction={
        <CreateProduct />
      }
    />
  )
}
