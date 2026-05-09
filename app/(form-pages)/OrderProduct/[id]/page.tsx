"use client"

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { createProductOrder } from '@/actions/orderProduct'
import BackBtn from '@/components/shared/BackBtn'
import { getProductById, updateProductAmount } from '@/actions/products'


export default function OrderProduct() {

 
  const router = useRouter()
  const params = useParams()
  const productId = Number(params.id) || undefined


  const [loading, setLoading] = useState(false)

  const [clientName, setClientName] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [amount, setAmount] = useState("")
  const [extraDetails, setExtraDetails] = useState("")
  
  const [product, setProduct] = useState<Awaited<ReturnType<typeof getProductById>>>(null)

  useEffect(() => {
    if (productId) getProductById(productId).then(setProduct)
  }, [productId])

  async function handleSubmit(e: any) {
    e.preventDefault()

    if(Number(amount) > Number(product?.amount)) {
      toast.error(`Det er ikke mulig å bestille mer enn ${product?.amount}`)
      return
    }
    
    setLoading(true)
    try {
      await createProductOrder({
        clientName,
        clientEmail,
        clientPhone,
        amount,
        extraDetails: extraDetails || undefined,
        productId,
      })
      await updateProductAmount(Number(productId), Number(amount))

      toast.success('Bestilling sendt!')
      router.push('/')
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Kunne ikke opprette et nytt produkt")
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="w-4/5 min-w-120 max-w-160 mx-auto py-10">
      <div className="card-accented shadow-xl space-y-6 px-8 pb-8">
        <div className="flex items-center justify-between">
          <BackBtn />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <h2 className="heading-2">Bestill produkt</h2>
            <p className="text-text-faint italic text-sm">
              Feltene merket med <span className="text-error">*</span> er påkrevde
            </p>
          </div>

          <div className="space-y-1">
            <label className="label">Navn <span className="text-error">*</span></label>
            <input
              type="text"
              className="input"
              placeholder="Ola Nordmann"
              value={clientName}
              onChange={(e) => { setClientName(e.target.value)}}
            />
            
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="label">E-post <span className="text-error">*</span></label>
              <input
                type="email"
                className="input"
                placeholder="ola@eksempel.no"
                value={clientEmail}
                onChange={(e) => { setClientEmail(e.target.value)}}
              />
          
            </div>

            <div className="space-y-1">
              <label className="label">Telefon <span className="text-error">*</span></label>
              <input
                type="tel"
                className="input"
                placeholder="+47 000 00 000"
                value={clientPhone}
                onChange={(e) => { setClientPhone(e.target.value)}}
              />

            </div>
          </div>

          <div className="space-y-1">
            <label className="label">Antall <span className="text-error">*</span></label>
            <input
              type="number"
              min={1}
              className="input"
              placeholder="1"
              value={amount}
              onChange={(e) => { setAmount(e.target.value)}}
            />
         
          </div>

          <div className="space-y-1">
            <label className="label">Tilleggsinformasjon</label>
            <textarea
              className="input min-h-25"
              placeholder="Eventuelle spesifikasjoner eller kommentarer..."
              value={extraDetails}
              onChange={(e) => setExtraDetails(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Sender...' : 'Send bestilling'}
          </button>
        </form>
      </div>
    </div>
  )
}
