import { getAllProducts } from '@/actions/products'
import FilteredProductsGrid from '../shared/products/FilteredProductsGrid'
import CreateProduct from './CreateProduct'

export default async function AdminProductsView() {
  const products = await getAllProducts(true)
  return <FilteredProductsGrid products={products} isAdmin={true} headerAction={<CreateProduct />} />
}
