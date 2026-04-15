"use client"
import React, { useEffect, useState } from 'react'

//Prisma autogenerates interfaced for types
import { Product, ProductImage, EducationField } from "@/generated/prisma"

import Router, { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const UpdateProduct = ({ productId }: { productId: string}) => {
    const router = useRouter()
    
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
            
            //Set the values to the product
            setTitle(data.title)
            setDescription(data.description)
            setPrice(Number(data.price))
            setAmount(data.amount)
            setEducationField(data.educationField ?? "")

            //TODO: Tix this later
            setMeasures({ ...data.measures, length: data.measures.length, height: data.measures.height })
           
            console.log(JSON.stringify(data.measures))
            console.log(data.measures.length)

        } catch(error) {
            console.error(error)

        } finally {
            setIsLoading(true)
        }
    }
    getSingelProduct()

    }, [productId])
    

    const handleForm = async (e: any) => {
        e.preventDefault()


        const formData = new FormData()
        formData.append("educationField", educationField)
        formData.append("title", title)
        formData.append("description", description)
        formData.append("price", price.toString())
        formData.append("measures", JSON.stringify(measures))
        formData.append("amount", amount.toString())
        formData.append("image", image as File)


        const respons = await fetch(`/api/products/${productId}`, {
            method: "PATCH",
            body: formData
        })

        if(!respons.ok) {
            console.log(`Updating dit not work: ${respons.status}`)
        }

        toast.success("Produkt oppdatert")
        router.push("/admin")
    }


    if(!isLoading) return <p>Laster...</p>
    if(!product) return <p>Ingen product funnet...</p>

    return (
    <div className="max-w-2xl mx-auto mt-10">
      <form onSubmit={handleForm} className="card-accented space-y-6">

        <h2 className="heading-2">Oppdater {product.title}</h2>

        {/* Education Field */}
        <div className="space-y-1">
          <label className="label">Kategori</label>
          <select
            value={educationField}
            className="input"
            onChange={(e) => setEducationField(e.target.value)}
          >
            <option value="">Velg kategori</option>
            <option value="BUILDING">Bygg</option>
            <option value="CONSTRUCTION">Anlegg</option>
          </select>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <label className="label">Tittel</label>
          <input
            type="text"
            className="input"
            placeholder="Produkt navn"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="label">Beskrivelse</label>
          <textarea
            className="input min-h-[100px]"
            placeholder="Beskriv produkt"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Price + Amount */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="label">Pris</label>
            <input
              type="number"
              className="input"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
            />
          </div>

          <div className="space-y-1">
            <label className="label">Antall</label>
            <input
              type="number"
              className="input"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
            />
          </div>
        </div>

        {/* Measures */}
        <div>
          <label className="label">Mål (cm)</label>
          <div className="grid grid-cols-3 gap-3 mt-2">
            <input
              type="number"
              className="input"
              placeholder="Høyde"
              onChange={(e) =>
                setMeasures({ ...measures, height: Number(e.target.value) })
              }
            />
            <input
              type="number"
              className="input"
              placeholder="Bredde"
              onChange={(e) =>
                setMeasures({ ...measures, width: Number(e.target.value) })
              }
            />
            <input
              type="number"
              className="input"
              placeholder="Lengde"
              onChange={(e) =>
                setMeasures({ ...measures, length: Number(e.target.value) })
              }
            />
          </div>
        </div>

        {/* Image */}
        <div className="space-y-1">
          <label className="label">Bilde</label>
          <input
            type="file"
            className="input"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>

        {/* Submit */}
        
        <div className="pt-4">
          <button type="submit" className="btn btn-primary w-full">
            Oppdater annonse
          </button>
        </div>

      </form>
    </div>
  )
}

export default UpdateProduct