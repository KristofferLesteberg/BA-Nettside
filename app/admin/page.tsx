import { prisma } from '@/app/lib/prisma'
import AdminProductsView from '@/app/components/admin/AdminProductsView'

const page = async () => {

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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-12 flex flex-col gap-6">
      <h1 className="heading-1">Produkter</h1>
      <AdminProductsView products={convertedProducts} />
    </section>
  )
}

export default page
