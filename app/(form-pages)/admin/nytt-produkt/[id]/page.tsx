"use client"

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Measure } from '@/components/admin/MeasurementList'
import ProductForm, { ProductFormValues } from '@/components/admin/ProductForm'
import { getProductById, updateProduct, addImageToProduct } from '@/actions/products'

interface LoadedProduct {
  title: string
  educationField: string
  description: string
  price: string
  amount: string
  measures: Measure[]
  existingImages: { id: string; url: string }[]
  contactId: string
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const productId = parseInt(use(params).id)
  const router = useRouter()
  const [loaded, setLoaded] = useState<LoadedProduct | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (Number.isNaN(productId)) { setError(true); return }

    const load = async () => {
      try {
        const product = await getProductById(productId)
        if (!product) { setError(true); return }

        setLoaded({
          title:          product.title,
          educationField: product.educationField ?? '',
          description:    product.description,
          price:          Number(product.price).toString(),
          amount:         String(product.amount),
          measures:       Array.isArray(product.measures) ? (product.measures as unknown as Measure[]) : [],
          existingImages: product.images.map(img => ({ id: img.id, url: `/images/${img.id}.webp` })),
          contactId: product.contactPersonId ? String(product.contactPersonId) : ''
        })
      } catch {
        toast.error("Kunne ikke laste produktet")
        setError(true)
      }
    }

    load()
  }, [productId])

  const handleSubmit = async ({ educationField, title, description, price, amount, measures, images, contactId }: ProductFormValues) => {
    const formData = new FormData()
    formData.append("educationField", educationField)
    formData.append("title", title)
    formData.append("description", description)
    formData.append("price", price || "0")
    formData.append("amount", amount || "0")
    formData.append("measures", JSON.stringify(measures))
    formData.append("contactId", contactId)
    formData.append("imageIds", JSON.stringify(images.map(img => img.id)))

    try {
      await updateProduct(productId, formData)
      toast.success("Produkt opprettet!")
      router.push("/admin?tab=produkter")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Kunne ikke opprette produktet")
    }
  }

  if (error)   return <p className="mt-10 text-center text-text-muted">Ingen produkt funnet.</p>
  if (!loaded) return <p className="mt-10 text-center text-text-muted">Laster...</p>

  return (
    <ProductForm
      heading={`Nytt Produkt`}
      submitLabel="Opprett annonse"
      onSubmit={handleSubmit}
      productId={productId}
      initialValues={loaded}
      onNewImage={async (file) => {
        const formData = new FormData()
        formData.append('image', file)
        return addImageToProduct(productId, formData)
      }}
    />
  )
}
