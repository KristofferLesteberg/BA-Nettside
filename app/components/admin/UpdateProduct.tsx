"use client"
import React, { useEffect, useState } from 'react'

//Prisma autogenerates interfaced for types
import { Product, ProductImage, EducationField } from "@/generated/prisma"

const UpdateProduct = ({ productId }: { productId: string}) => {
    
    const [product, setProduct] = useState<Product | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    /*PRODUCT VARIABLES*/

    const [educationField, setEducationField] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [measures, setMeasures] = useState({
        height: 0,
        width: 0,
        length: 0
      })
    const [amount, setAmount] = useState(0)
    const [image, setImage] = useState<File | null>(null)


    useEffect(() => {
        const getSingelProduct = async () => {
        try {
            const respons = await fetch(`/api/products/${productId}`)
            if(!respons.ok) {
                console.log(respons.status)
                return
            }
            const data = await respons.json()

            setProduct(data)             
        } catch(error) {
            console.error(error)

        } finally {
            setIsLoading(true)
        }
    }
    getSingelProduct()

    }, [productId])
    

    const handleForm = (e: any) => {
        e.preventDefault()

        const formData = new FormData
        const educationField = formData.get("educationField") as EducationField
        const title          = formData.get("title") as string
        const description    = formData.get("description") as string
        const price          = Number(formData.get("price"))
        const measures       = JSON.parse(formData.get("measures") as string)
        const amount         = Number(formData.get("amount"))
        const image          = formData.get("image") as File

    }

    if(!isLoading) return <p>Laster...</p>
    if(!product) return <p>Ingen product funnet...</p>

    return (
        <div>
            {product?.title}
        </div>
    )

}

export default UpdateProduct