import type { ProductCardData } from "@/app/lib/types"
import ProductCard from "./ProductCard"

interface ProductsGridProps {
  products: ProductCardData[]
  isAdmin: boolean
}

export default function ProductsGrid({ products, isAdmin }: ProductsGridProps) {
  return (
    <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} isAdmin={isAdmin} />
      ))}
    </section>
  )
}
