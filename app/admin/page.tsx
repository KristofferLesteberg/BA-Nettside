import { prisma } from '@/app/lib/prisma'
import Link from 'next/link';
import { HiOutlinePlusSm } from "react-icons/hi";

import ProductsGrid from '../components/product/productCardGrid';

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
        <ProductsGrid products={convertedProducts} isAdmin={true} />
     </div>
</div>
  )
}

export default page