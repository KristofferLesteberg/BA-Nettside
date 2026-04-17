

import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import DeleteProduct from '../components/admin/DeleteProduct'
import ProductCard from '../components/product/ProductCard'
import { prisma } from '../lib/prisma'



const page = async () => {      
 
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
      {/*<button onClick={() => signOut({ callbackUrl: 'http://localhost:3000/admin/login' })} >Log out</button>
      <p>logged in as {session?.user?.name}</p>*/}

      <Link href={"/admin/newProduct"}>
        <button
          className='a'>
          Nytt produkt
        </button>
      </Link>
      
      <DeleteProduct productID={8}/>
      <div className="max-w-full mx-auto px-4">
        <h1 className='heading-1 mt-50 mb-10'>Produkter:</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center'>
            {convertedProducts.map((product) => (
                <ProductCard key={product.id} product={product} isAdmin={true}/>
            ))}
        </div>
     </div>
</div>
  )
}

export default page