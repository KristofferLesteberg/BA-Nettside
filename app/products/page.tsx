import { prisma } from '../lib/prisma'
import ProductsGrid from '../components/product/productCardGrid'

export default async function ProductsPage () {      
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
    <ProductsGrid products={convertedProducts} isAdmin={false}/>
  )
}