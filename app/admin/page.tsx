
import ProductCard from '../components/product/ProductCard'
import { prisma } from '../lib/prisma'
import Link from 'next/link';

import { HiOutlinePlusSm } from "react-icons/hi";



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
      <div className="max-w-full mx-auto px-4">
        <div className='flex flex-row items-center mb-10 mt-50'>
          <h1 className='heading-1'>Produkter:</h1>
          <div className='ml-auto flex flex-row border items-center p-2 btn btn-outline bg-primary text-white gap-2 cursor-pointer'>
            <HiOutlinePlusSm />
            <Link href="/admin/newProduct">
              <button className='text-white cursor-pointer'>Annonse</button>
            </Link>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center border pt-4'>
            {convertedProducts.map((product) => (
                <ProductCard key={product.id} product={product} isAdmin={true}/>
            ))}
        </div>
     </div>
</div>
  )
}

export default page