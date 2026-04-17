"use client"
import React, { useEffect, useState } from 'react'
import { Product } from "@/generated/prisma"
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import MeasurementList, { Measure } from '@/app/components/admin/MeasurementList'
import ImageOrder, { ImageItem } from './ImageOrder'

export default function UpdateProductForm({ productId }: { productId: number }) {
  const router = useRouter()

  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [existingImages, setExistingImages] = useState<{ id: string; url: string }[]>([])
  const [images, setImages] = useState<ImageItem[]>([])

  const [educationField, setEducationField] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [amount, setAmount] = useState(0)
  const [measures, setMeasures] = useState<Measure[]>([])

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`)
        if (!res.ok) { console.log(res.status); return }

        const data = await res.json()
        setProduct(data)
        setTitle(data.title)
        setDescription(data.description)
        setPrice(Number(data.price))
        setAmount(data.amount)
        setEducationField(data.educationField ?? "")
        setMeasures(Object.entries(data.measures ?? {}).map(([name, value]) => ({ name, value: String(value) })))

        // Populate existing images for ImageOrder
        if (data.images && data.images.length > 0) {
          const mapped = data.images.map((img: { id: string }) => ({
            id: img.id,
            url: `/images/${img.id}.webp`,
          }))
          setExistingImages(mapped)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(true)
      }
    }
    getSingleProduct()
  }, [productId])

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("educationField", educationField)
    formData.append("title", title)
    formData.append("description", description)
    formData.append("price", price.toString())
    formData.append("measures", JSON.stringify(Object.fromEntries(measures.map(m => [m.name, m.value]))))
    formData.append("amount", amount.toString())

    // Split images into existing (ids only) and new (files)
    // The order of both arrays matches — the API uses imageIds[i] as the id for imageFiles[i]
    images.forEach((img) => {
      if (img.type === "existing") {
        formData.append("imageIds", img.id)
      } else {
        formData.append("imageIds", img.id)
        formData.append("imageFiles", img.file)
      }
    })

    const res = await fetch(`/api/products/${productId}`, {
      method: "PATCH",
      body: formData,
    })

    if (!res.ok) {
      toast.error("Noe gikk galt")
      console.log(`Update failed: ${res.status}`)
      return
    }

    toast.success("Produkt oppdatert")
    router.push("/admin")
  }

  if (!isLoading) return <p>Laster...</p>
  if (!product) return <p>Ingen produkt funnet...</p>

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <form onSubmit={handleForm} className="card-accented space-y-6">

        <h2 className="heading-2">Oppdater {product.title}</h2>

        {/* Education Field */}
        <div className="space-y-1">
          <label className="label">Kategori</label>
          <select value={educationField} className="input" onChange={(e) => setEducationField(e.target.value)}>
            <option value="">Velg kategori</option>
            <option value="BUILDING">Bygg</option>
            <option value="CONSTRUCTION">Anlegg</option>
          </select>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <label className="label">Tittel</label>
          <input
            type="text" className="input" placeholder="Produkt navn"
            value={title} onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="label">Beskrivelse</label>
          <textarea
            className="input min-h-[100px]" placeholder="Beskriv produkt"
            value={description} onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Price + Amount */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="label">Pris</label>
            <input
              type="number" className="input" value={price}
              onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-1">
            <label className="label">Antall</label>
            <input
              type="number" className="input" value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
            />
          </div>
        </div>

        {/* Measures */}
        <MeasurementList initialMeasures={measures} onChange={setMeasures} />

        {/* Images */}
        <div className="space-y-1">
          <label className="label">Bilder</label>
          <ImageOrder
            initialImages={existingImages}
            onChange={(imgs) => setImages(imgs)}
          />
        </div>

        <div className="pt-4">
          <button type="submit" className="btn btn-primary w-full">
            Oppdater annonse
          </button>
        </div>

      </form>
    </div>
  )
}