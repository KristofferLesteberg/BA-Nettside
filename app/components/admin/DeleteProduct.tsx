import React from 'react'

const DeleteProduct = ({ productID }: { productID: string}) => {
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

        <button onClick={removeProduct}>
            Fjern
        </button>
  )
  
}
export default DeleteProduct