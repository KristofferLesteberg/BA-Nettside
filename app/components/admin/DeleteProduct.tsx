"use client"
import React from 'react'

import { FaRegTrashCan } from "react-icons/fa6";

const DeleteProduct = ({ productID }: { productID: number}) => {
        const removeProduct = async () => {
        if(!window.confirm("Vil du slette produktet?")) return

        const respons = await fetch(`/api/products/${productID}`, {
            method: "DELETE",
        }
    )
        if(!respons.ok) {
            console.log("Error deleting")
            throw new Error()
        }
    }
    return (
        <button
            onClick={removeProduct}
            className='cursor-pointers flex flex-row items-center gap-2'
        >
            <FaRegTrashCan />Fjern
        </button>
  )
  
}
export default DeleteProduct