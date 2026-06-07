"use client"

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import ProductForm, { ProductFormValues } from '@/components/admin/ProductForm'
import { cleanupEmptyDrafts, createDraftProduct, updateProduct, addImageToProduct } from '@/actions/products'

export default function NyttProduktPage() {
  const router = useRouter()
  const [productId, setProductId] = useState<number | null>(null)

  useEffect(() => { cleanupEmptyDrafts().catch(() => {}) }, [])
  const productIdRef = useRef<number | null>(null)
  const draftCreationRef = useRef<Promise<number> | null>(null)

  const ensureDraft = useCallback(async (): Promise<number> => {
    if (productIdRef.current !== null) return productIdRef.current
    if (!draftCreationRef.current) {
      draftCreationRef.current = createDraftProduct()
        .then(({ id }) => {
          productIdRef.current = id
          setProductId(id)
          return id
        })
        .catch((err) => {
          draftCreationRef.current = null
          throw err
        })
    }
    return draftCreationRef.current
  }, [])

  const handleSubmit = async ({ educationField, title, description, price, amount, measures, images, contactId }: ProductFormValues) => {
    const id = await ensureDraft()
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
      await updateProduct(id, formData)
      toast.success('Produkt opprettet!')
      router.push('/admin?tab=produkter')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Kunne ikke opprette produktet')
    }
  }

  return (
    <ProductForm
      mode="create"
      heading="Nytt Produkt"
      submitLabel="Opprett annonse"
      onSubmit={handleSubmit}
      productId={productId}
      ensureDraft={ensureDraft}
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
        const id = await ensureDraft()
        const formData = new FormData()
        formData.append('image', file)
        return addImageToProduct(id, formData)
      }}
    />
  )
}
