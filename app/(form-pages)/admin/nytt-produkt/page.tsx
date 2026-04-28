"use client"

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import type { ApiResponse } from '@/app/lib/api-response'
import ProductForm, { ProductFormValues } from '@/app/components/admin/ProductForm'

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

    const res = await fetch("/api/products", { method: "POST", body: formData })
    const body: ApiResponse<unknown> = await res.json()

    if (!body.success) {
      if (body.fields) {
        Object.values(body.fields).flat().forEach(msg => toast.error(msg))
      } else {
        toast.error(body.error)
      }
      return
    }

    toast.success(body.message ?? "Produkt lagt til")
    router.push("/admin")
  }

  return (
    <ProductForm
      heading="Opprett produkt"
      submitLabel="Opprett annonse"
      onSubmit={handleSubmit}
    />
  )
}