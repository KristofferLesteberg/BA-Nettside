"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Measure } from '@/components/admin/MeasurementList'
import ProductForm, { ProductFormValues } from '@/components/admin/ProductForm'
import { updateProduct, addImageToProduct } from '@/actions/products'

export interface UpdateProductClientProps {
  productId: number
  title: string
  educationField: string
  description: string
  price: string
  amount: string
  measures: Measure[]
  existingImages: { id: string; url: string }[]
  contactId: string
  draft: boolean
}

export default function UpdateProductClient({
  productId,
  title,
  educationField,
  description,
  price,
  amount,
  measures,
  existingImages,
  contactId,
  draft,
}: UpdateProductClientProps) {
  const router = useRouter()
  const [submitLabel] = useState(draft ? 'Oppdater annonse og publiser' : 'Oppdater annonse')

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
      toast.success("Produkt oppdatert")
      router.push("/admin?tab=produkter")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Kunne ikke oppdatere produktet")
    }
  }

  return (
    <ProductForm
      mode="update"
      heading={`Oppdater ${title}`}
      submitLabel={submitLabel}
      initialValues={{ title, educationField, description, price, amount, measures, existingImages, contactId }}
      productId={productId}
      onSubmit={handleSubmit}
      onNewImage={async (file) => {
        const formData = new FormData()
        formData.append('image', file)
        return addImageToProduct(productId, formData)
      }}
    />
  )
}
