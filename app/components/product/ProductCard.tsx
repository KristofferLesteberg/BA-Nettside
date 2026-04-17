"use client"
import { useSession } from "next-auth/react"
import { Product, ProductImage } from "@/generated/prisma"
import DeleteProduct from "../admin/DeleteProduct"
import UpdateProductForm from "../admin/UpdateProductForm"
import Link from 'next/link'

interface ProductCardProps {
    product: Omit<Product, 'price' | 'publishedAt'> & { price: number, publishedAt: string, images: ProductImage[] }
    isAdmin: boolean
}

const ProductCard = ({ product, isAdmin }: ProductCardProps ) => {
    

  return (
        <div className="group rounded w-100 h-full border shadow-sm transition-all duration-300 cursor-pointer hover:bg-red-700 hover:text-white">
            <Link href={`/products/${product.id}`}>
            {product.images[0] ? (
                <img src={`/images/${product.images[0].id}.webp`} className="w-full h-70 rounded bg-grey-500" />
            ) : 
            <p className="w-full h-70 bg-grey-100 group-hover:text-white">Ingen bilder..</p>}
            <h1 className="heading-4 text-red-500 mt-5 group-hover:text-white">{product.title}</h1>
            <br />
            {`${Number(product.price)}kr`}
            <br />
            {product.publishedAt}
            </Link>
            {isAdmin && (
                <div className="">
                    <DeleteProduct  productID={product.id}/>
                    <Link href={`/admin/updateProduct/${product.id}`}>
                        <button  className="btn btn-outline group-hover:text-white">Edit</button>
                    </Link>
                
                </div>
            )}
        </div>
  )
}

export default ProductCard