"use client"

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { createProduct } from '@/actions/products'
import { getAllContacts  } from '@/actions/contact'
import ProductForm, { ProductFormValues } from '@/components/admin/ProductForm'
import { useEffect, useState } from 'react'
import { ContactPerson } from '@/generated/prisma'

export default function NewProduct() {
  const router = useRouter()
  const [contactPersons, setContactPersons] = useState<ContactPerson[]>([])

  useEffect(() => {

    const getContacts = async () => {
      try {
        const contactPersons = await getAllContacts()
        setContactPersons(contactPersons)

      } catch(error) {
        toast.error("Kunne ikke hente kontakt personer")

      }
    }
    getContacts()

  }, [])


  const handleSubmit = async ({ educationField, title, description, price, amount, measures, images, contactId }: ProductFormValues) => {
    const formData = new FormData()
    formData.append("educationField", educationField)
    formData.append("title", title)
    formData.append("description", description)
    formData.append("price", price || "0")
    formData.append("amount", amount || "0")
    formData.append("measures", JSON.stringify(measures))
    if (contactId) formData.append("contactId", String(contactId))

    const newImages = images.filter(img => img.type === 'new')
    formData.append("imageIds", JSON.stringify(newImages.map(img => img.id)))
    newImages.forEach(img => formData.append("images", img.file))

    try {
      await createProduct(formData)
      toast.success("Produkt opprettet")
      router.push("/admin?tab=produkter")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Kunne ikke opprette et nytt produkt")
    }
  }

  return (
    <ProductForm
      heading="Opprett produkt"
      submitLabel="Opprett annonse"
      onSubmit={handleSubmit}
      contactPersons={contactPersons}
    />
  )
}
