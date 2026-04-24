"use client"

import { Product, ProductImage } from "@/generated/prisma"
import DeleteProduct from "../admin/DeleteProduct"

import Image from 'next/image'
import Link from 'next/link'
import { useState } from "react"


import { BsThreeDots } from "react-icons/bs";
import { MdOutlineModeEdit } from "react-icons/md";

interface ProductCardProps {
    product: Omit<Product, 'price' | 'publishedAt'> & { price: number, publishedAt: string, image: ProductImage | null }
    isAdmin: boolean
}

const ProductCard = ({ product, isAdmin }: ProductCardProps ) => {

    const [options, setOptions] = useState(false)

  return (
    <div className="group w-100 h-full shadow-sm transition-all duration-300 cursor-pointer p-2 border rounded border-transparent hover:border-primary">

      <Link href={`/products/${product.id}`}>
        {product.image ? (
          <div className="relative w-full h-70 rounded overflow-hidden">
            <Image src={`/images/${product.image.id}.webp`} alt={product.title} fill className="object-cover" />
          </div>
        ) :
        <p className="w-full h-70 bg-grey-100">Ingen bilder..</p>}
      </Link>
      <div className="flex flex-row relative mt-5">
        <h1 className="heading-4">
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
              <button className="cursor-pointer flex flex-row items-center gap-2"><MdOutlineModeEdit />Edit</button>
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