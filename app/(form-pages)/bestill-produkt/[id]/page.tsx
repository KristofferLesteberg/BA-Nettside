"use client"

import { useState } from 'react'
import { useParams } from 'next/navigation'
import OrderProductForm from '@/components/products/OrderProductForm'
import ProductOrderedSuccess from '@/components/products/ProductOrderedSuccess'

export default function BestillProduktPage() {
  const params = useParams()
  const productId = Number(params.id) || 0

  const [ordered, setOrdered] = useState<{ id: number; email: string; amount: number; productTitle: string } | null>(null)

  if (ordered) return <ProductOrderedSuccess id={ordered.id} email={ordered.email} amount={ordered.amount} productTitle={ordered.productTitle} />
  return <OrderProductForm productId={productId} onSuccess={setOrdered} />
}
