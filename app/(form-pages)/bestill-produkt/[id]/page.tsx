"use client"

import { useState } from 'react'
import { useParams } from 'next/navigation'
import OrderProductForm from '@/components/products/OrderProductForm'
import ProductOrderedSuccess from '@/components/products/ProductOrderedSuccess'

interface ContactPerson {
  name: string
  email: string | null
  phone: string | null
  title: string
}

interface OrderedState {
  id: number
  email: string
  amount: number
  productTitle: string
  price: number
  extraDetails?: string
  contactPerson: ContactPerson | null
}

export default function BestillProduktPage() {
  const params = useParams()
  const productId = Number(params.id) || 0

  const [ordered, setOrdered] = useState<OrderedState | null>(null)

  if (ordered) return (
    <ProductOrderedSuccess
      id={ordered.id}
      email={ordered.email}
      amount={ordered.amount}
      productTitle={ordered.productTitle}
      price={ordered.price}
      extraDetails={ordered.extraDetails}
      contactPerson={ordered.contactPerson}
    />
  )
  return <OrderProductForm productId={productId} onSuccess={setOrdered} />
}
