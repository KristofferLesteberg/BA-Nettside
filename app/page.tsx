import { Prisma } from "@/generated/prisma"
import { Product, ProductImage } from "@/generated/prisma"
import { prisma } from "./lib/prisma"

import ProductCard from "./components/product/ProductCard"
export default async function Home() {

  const products = await prisma.product.findMany({
    include: { images: true}
  })

  const convertedProducts = products.map((product) => ({
    ...product, 
    price: product.price.toNumber(),
    publishedAt: product.publishedAt.toISOString()
  }))

  return (
    <div>
      <div>Hello World</div>
      <p className="text-primary">This is pink</p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-50 place-items-center'>
            {convertedProducts.map((product) => (
              <ProductCard key={product.id} product={product} isAdmin={false}/>
            ))}
        </div>
    </div>
  )
}
