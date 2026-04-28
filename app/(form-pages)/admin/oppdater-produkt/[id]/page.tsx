"use client"

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Product } from "@/generated/prisma"
import toast from 'react-hot-toast'
import type { ApiResponse } from '@/app/lib/api-response'
import { Measure } from '@/components/admin/MeasurementList'
import ProductForm, { ProductFormValues } from '@/components/admin/ProductForm'

import { getProductById } from '@/actions/products'
import { prisma } from '@/app/lib/prisma'

interface LoadedProduct {
  title: string
  educationField: string
  description: string
  price: string
  amount: string
  measures: Measure[]
  existingImages: { id: string; url: string }[]
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const productId = parseInt(use(params).id)
  const router = useRouter()
  const [loaded, setLoaded] = useState<LoadedProduct | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (Number.isNaN(productId)) { setError(true); return }
    const getProduct = async () => {
      try {
        const product = await getProductById(productId)
        setLoaded(product)

      } catch(error) {
        toast.error("Kunne ikke oppdatere produktet")
      }
    }

    getProduct()
  }, [productId])



  const handleSubmit = async ({ educationField, title, description, price, amount, measures, images }: ProductFormValues) => {
    const formData = new FormData()
    formData.append("educationField", educationField)
    formData.append("title", title)
    formData.append("description", description)
    formData.append("price", price || "0")
    formData.append("amount", amount || "0")
    formData.append("measures", JSON.stringify(Object.fromEntries(measures.map(m => [m.name, m.value]))))

    images.forEach((img) => {
      formData.append("imageIds", img.id)
      if (img.type === "new") formData.append("imageFiles", img.file)
    })

    const res = await fetch(`/api/products/${productId}`, { method: "PATCH", body: formData })
    const body: ApiResponse<unknown> = await res.json()

    if (!body.success) {
      if (body.fields) {
        Object.values(body.fields).flat().forEach(msg => toast.error(msg))
      } else {
        toast.error(body.error)
      }
      return
    }

    toast.success(body.message ?? "Produkt oppdatert")
    router.push("/admin?tab=produkter")
  }

  if (error) return <p>Ingen produkt funnet...</p>
  if (!loaded) return <p>Laster...</p>

  return (
    <ProductForm
      heading={`Oppdater ${loaded.title}`}
      submitLabel="Oppdater annonse"
      initialValues={loaded}
      onSubmit={handleSubmit}
    />
  )
}
