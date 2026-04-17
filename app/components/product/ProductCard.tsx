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
        <div className="rounded w-100 h-full border shadow-sm transition-all duration-300 cursor-pointer hover:translate-y-1 hover:shadow-lg">
            <Link href={`/products/${product.id}`}>
            {product.images[0] && (
                <img src={`/images/${product.images[0].id}.webp`} className="w-full h-70 rounded" />
            )}
            <h1 className="heading-4 text-red-500 mt-5">{product.title}</h1>
            <br />
            {`${Number(product.price)}kr`}
            <br />
            {product.publishedAt}
            </Link>
            {isAdmin && (
                <div className="">
                    <DeleteProduct productID={product.id}/>
                    <Link href={`/admin/updateProduct/${product.id}`}>
                        <button className="btn btn-outline">Edit</button>
                    </Link>
                
                </div>
            )}
        </div>

  )
}

export default ProductCard