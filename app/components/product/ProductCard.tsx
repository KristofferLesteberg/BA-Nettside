"use client"

import { Product, ProductImage } from "@/generated/prisma"
import DeleteProduct from "../admin/DeleteProduct"

import Link from 'next/link'
import { useState } from "react"


import { BsThreeDots } from "react-icons/bs";
import { MdOutlineModeEdit } from "react-icons/md";

interface ProductCardProps {
    product: Omit<Product, 'price' | 'publishedAt'> & { price: number, publishedAt: string, images: ProductImage[] }
    isAdmin: boolean
}

const ProductCard = ({ product, isAdmin }: ProductCardProps ) => {

    const [options, setOptions] = useState(false)

    console.log(product.images[0])
    

  return (
    <div className="group rounded w-100 h-full shadow-sm transition-all duration-300 cursor-pointer p-2 hover:card-accented">
        <Link href={`/products/${product.id}`}>
            {product.images[0] ? (
                <img src={`/images/${product.images[0].id}.webp`} className="w-full h-70 rounded bg-grey-500" />
            ) : 
            <p className="w-full h-70 bg-grey-100">Ingen bilder..</p>}
        </Link>
        <div className="flex flex-row relative mt-5">
            <h1 className="heading-4 text-red-500">
                {`${product.title} (${product.amount})`}
            </h1>
        
            {isAdmin && (
                <button
                    type="button"
                    onClick={() => setOptions(!options)}
                    className="ml-auto mr-3 w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:border-gray-500 cursor-pointer transition-colors"
                >
                        <BsThreeDots />
                </button>  
            )}
            {options && (
                <div className="flex flex-col absolute right-0 bottom-full mb-2 rounded mr-5">
                    
                    <DeleteProduct productID={product.id}/>
                    <hr />
                    <Link href={`/admin/updateProduct/${product.id}`}>
                        <button  className="cursor-pointer flex flex-row items-center gap-2"><MdOutlineModeEdit />Edit</button>
                        <hr />
                    </Link>      
                </div>
                )}                     
        </div>

        <br />
        {`${Number(product.price)}kr`}
        <br />
      

    </div>
  )
}

export default ProductCard