import type { ProductCardData } from "@/app/lib/types"
import ProductCard from "./ProductCard"

interface ProductsGridProps {
  products: ProductCardData[]
  isAdmin: boolean
}

export default function ProductsGrid({ products, isAdmin }: ProductsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        (isAdmin || !product.draft) ? (
          <ProductCard key={product.id} product={product} isAdmin={isAdmin} />
        ) : null
      ))}
    </div>
  )
}
