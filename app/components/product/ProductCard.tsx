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
    <div className="border w-100 h-full">
        {product.images[0] && (
            <img src={`/images/${product.images[0].id}.webp`} className="w-full h-70" />
        )}
        {product.title}
        <br />
        {Number(product.price)}
        <br />
        {product.publishedAt}
        {isAdmin && (
            <div>
                <DeleteProduct productID={product.id}/>
                <Link href={`/admin/updateProduct/${product.id}`}>
                    <button>Edit</button>
                </Link>
              
            </div>
        )}
    </div>
  )
}

export default ProductCard