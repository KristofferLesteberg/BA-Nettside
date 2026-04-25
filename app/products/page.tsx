import { prisma } from '../lib/prisma'
import FilteredProductsGrid from '../components/product/FilteredProductsGrid'

export default async function ProductsPage() {
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
    <section className="flex flex-col gap-10 mt-8 mb-8 ml-8">
      <div className="">
        <h1 className='heading-1'>Produkter:</h1>
      </div>
      <FilteredProductsGrid products={convertedProducts} isAdmin={false} />
    </section>
  )
}
