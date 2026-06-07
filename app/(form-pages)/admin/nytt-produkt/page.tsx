"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Spinner } from '@/components/shared/Spinner'
import ProductForm, { ProductFormValues } from '@/components/admin/ProductForm'
import { createDraftProduct, updateProduct, addImageToProduct } from '@/actions/products'

export default function NyttProduktPage() {
  const router = useRouter()
  const [productId, setProductId] = useState<number | null>(null)

  useEffect(() => {
    createDraftProduct()
      .then(({ id }) => setProductId(id))
      .catch(() => toast.error('Kunne ikke opprette produktutkast'))
  }, [])

  const handleSubmit = async ({ educationField, title, description, price, amount, measures, images, contactId }: ProductFormValues) => {
    if (productId === null) return
    const formData = new FormData()
    formData.append('educationField', educationField)
    formData.append('title', title)
    formData.append('description', description)
    formData.append('price', price || '0')
    formData.append('amount', amount || '0')
    formData.append('measures', JSON.stringify(measures))
    formData.append('contactId', contactId)
    formData.append('imageIds', JSON.stringify(images.map(img => img.id)))

    try {
      await updateProduct(productId, formData)
      toast.success('Produkt opprettet!')
      router.push('/admin?tab=produkter')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Kunne ikke opprette produktet')
    }
  }

  if (productId === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    )
  }

  return (
    <ProductForm
      mode="create"
      heading="Nytt Produkt"
      submitLabel="Opprett annonse"
      onSubmit={handleSubmit}
      productId={productId}
      initialValues={{
        title: '',
        educationField: '',
        description: '',
        price: '',
        amount: '',
        measures: [],
        existingImages: [],
        contactId: '',
      }}
      onNewImage={async (file) => {
        const formData = new FormData()
        formData.append('image', file)
        return addImageToProduct(productId, formData)
      }}
    />
  )
}
