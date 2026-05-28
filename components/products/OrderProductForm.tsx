"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { Spinner } from '@/components/shared/Spinner'
import { createProductOrder } from '@/actions/orderProduct'
import { getProductById, updateProductAmount } from '@/actions/products'
import BackBtn from '@/components/shared/BackBtn'
import { formatPrice } from '@/app/lib/product-utils'
import PhoneInputWithCountrySelect from 'react-phone-number-input'
import { parsePhoneNumberWithError } from 'libphonenumber-js'
import type { E164Number, CountryCode } from 'libphonenumber-js'

interface Props {
  productId: number
  onSuccess: (data: { id: number; email: string; amount: number; productTitle: string }) => void
}

export default function OrderProductForm({ productId, onSuccess }: Props) {
  const [loading, setLoading] = useState(false)
  const [clientName, setClientName] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [clientPhone, setClientPhone] = useState<E164Number | undefined>()
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>("NO")
  const [amount, setAmount] = useState("")
  const [extraDetails, setExtraDetails] = useState("")
  const [product, setProduct] = useState<Awaited<ReturnType<typeof getProductById>>>(null)

  useEffect(() => {
    getProductById(productId).then(setProduct)
  }, [productId])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (Number(amount) > Number(product?.amount)) {
      toast.error(`Det er ikke mulig å bestille mer enn ${product?.amount}`)
      return
    }

    setLoading(true)
    try {
      const order = await toast.promise(
        createProductOrder({
          clientName,
          clientEmail,
          clientPhone: String(clientPhone),
          amount,
          extraDetails: extraDetails || undefined,
          productId,
        }),
        {
          loading: 'Sender bestilling…',
          success: 'Bestilling sendt!',
          error: (e: unknown) => e instanceof Error ? e.message : 'Kunne ikke sende bestillingen',
        }
      )
      await updateProductAmount(productId, Number(amount))
      onSuccess({ id: order.id, email: clientEmail, amount: Number(amount), productTitle: product?.title ?? '' })
    } catch {} finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-4/5 min-w-120 max-w-160 mx-auto py-10">
      <div className="card-accented shadow-xl space-y-6 px-8 pb-8">
        <div className="flex items-center justify-between">
          <BackBtn />
        </div>

        {product && (
          <div className="card flex gap-4 items-center">
            {product.images[0] && (
              <div className="relative w-24 h-24 shrink-0 rounded overflow-hidden">
                <Image
                  src={`/images/${product.images[0].id}.webp`}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h3 className="heading-4">{product.title}</h3>
              <p className="small-text">{formatPrice(product.price)}</p>
              <p className="small-text">På lager: {product.amount} stk</p>
            </div>
          </div>
        )}

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
              onChange={(e) => setClientName(e.target.value)}
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
                onChange={(e) => setClientEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="label">Telefon <span className="text-error">*</span></label>
              <PhoneInputWithCountrySelect
                className="input"
                international={true}
                defaultCountry="NO"
                country={phoneCountry}
                onCountryChange={(c) => setPhoneCountry(c ?? "NO")}
                placeholder="Telefonnummer"
                value={clientPhone}
                onChange={(nr) => {
                  setClientPhone(nr)
                  if (nr) {
                    try { const p = parsePhoneNumberWithError(String(nr)); if (p?.country) setPhoneCountry(p.country) } catch {}
                  }
                }}
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
              onChange={(e) => setAmount(e.target.value)}
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
            className="btn btn-primary w-full gap-2"
            disabled={loading}
          >
            {loading ? <><Spinner />Sender…</> : 'Send bestilling'}
          </button>
        </form>
      </div>
    </div>
  )
}
