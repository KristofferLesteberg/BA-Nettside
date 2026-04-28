"use client"

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { createProduct } from '@/actions/products'

import ProductForm, { ProductFormValues } from '@/components/admin/ProductForm'
import { create } from 'node:domain'

export default function NewProduct() {
  const router = useRouter()

  const handleSubmit = async ({ educationField, title, description, price, amount, measures, images }: ProductFormValues) => {
    const formData = new FormData()
    formData.append("educationField", educationField)
    formData.append("title", title)
    formData.append("description", description)
    formData.append("price", price || "0")
    formData.append("amount", amount || "0")
    formData.append("measures", JSON.stringify(Object.fromEntries(measures.map(m => [m.name, m.value]))))

    images.filter(img => img.type === 'new').forEach(img => {
      formData.append("files", img.file)
      formData.append("ids", img.id)
    })
    try {
      await createProduct(formData)
      toast.success("Produkt opprettet")
      router.push("/admin?tab=produkter")
    } catch(error) {
      toast.error("Kunne ikke opprette et nytt produkt")
    }
  }

  return (
    <ProductForm
      heading="Opprett produkt"
      submitLabel="Opprett annonse"
      onSubmit={handleSubmit}
    />
  )
}
