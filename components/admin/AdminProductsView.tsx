import Link from 'next/link'
import { HiOutlinePlusSm } from 'react-icons/hi'
import { prisma } from '@/app/lib/prisma'
import FilteredProductsGrid from '../shared/products/FilteredProductsGrid'

// Admin-specific filter state lives here as the project grows.
// Example of adding a filter:
//   const [inStockOnly, setInStockOnly] = useState(false)
//   const extraFilters = useMemo(() => inStockOnly ? [(p: ProductCardData) => p.amount > 0] : [], [inStockOnly])
//
// Then pass extraFilters and extraControls to FilteredProductsGrid below.

export default async function AdminProductsView() {
  const products = await prisma.product.findMany({
    include: { images: { take: 1, orderBy: { sortOrder: 'asc' } } }
  })

  const convertedProducts = products.map(({ images, ...product }) => ({
    ...product,
    price: product.price.toNumber(),
    publishedAt: product.publishedAt.toISOString(),
    image: images[0] ?? null,
  }))

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
