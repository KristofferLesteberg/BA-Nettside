"use client"

import React, { useState } from 'react'
import Router, { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import ImageOrder, { ImageItem } from '@/app/components/admin/ImageOrder'
import MeasurementList, { Measure } from '@/app/components/admin/MeasurementList'

export default function NewProduct() {
  const router = useRouter()

  const [educationField, setEducationField] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [measures, setMeasures] = useState<Measure[]>([])
  const [amount, setAmount] = useState(0)
  const [images, setImages] = useState<ImageItem[]>([])

  const handleForm = async (e: any) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("educationField", educationField)
    formData.append("title", title)
    formData.append("description", description)
    formData.append("price", price.toString())
    formData.append("amount", amount.toString())
    formData.append("measures", JSON.stringify(Object.fromEntries(measures.map(m => [m.name, m.value]))))

    images.forEach((img) => {
      if (img.type === "new") {
        formData.append("files", img.file)
        formData.append("ids", img.id)
      }
    })

    const response = await fetch("/api/products", {
      method: "POST",
      body: formData
    })

    if (!response.ok) {
      console.error(await response.json())
    }
    toast.success("Produkt lagt til")
    router.push("/admin")
  }

  return (
    <div className="w-4/5 min-w-120 max-w-230 mx-auto my-10">
      <form onSubmit={handleForm} className="card-accented space-y-6 shadow-mist-500 shadow-xl">

        <h2 className="heading-2">Opprett produkt</h2>

        {/* Education Field */}
        <div className="space-y-1">
          <label className="label">Kategori</label>
          <select
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
        <MeasurementList onChange={setMeasures}/>

        {/* Image */}
        <label className="label">Bilder</label>
        <ImageOrder onChange={setImages}/>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full">
          Opprett annonse
        </button>

      </form>
    </div>
  )
}