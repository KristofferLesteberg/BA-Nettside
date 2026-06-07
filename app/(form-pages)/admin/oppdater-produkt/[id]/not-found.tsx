"use client"

import Link from 'next/link'
import BackBtn from '@/components/shared/BackBtn'

export default function UpdateProductNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-page">
      <div className="w-full max-w-120 mx-auto space-y-6">
        <BackBtn />
        <div className="space-y-1">
          <p className="label">Rediger produkt</p>
          <h1 className="heading-2">Produktet ble ikke funnet</h1>
          <p className="body-text">
            Produktet du prøver å redigere finnes ikke. Det kan ha blitt slettet.
          </p>
        </div>
        <Link href="/admin?tab=produkter" className="btn btn-primary inline-block">Tilbake til produkter</Link>
      </div>
    </div>
  )
}
