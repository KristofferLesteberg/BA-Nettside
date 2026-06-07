"use client"

import Link from 'next/link'
import BackBtn from '@/components/shared/BackBtn'

export default function BestillNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-page">
      <div className="w-full max-w-120 mx-auto space-y-6">
        <BackBtn />
        <div className="space-y-1">
          <p className="label">Bestill produkt</p>
          <h1 className="heading-2">Produktet er ikke tilgjengelig</h1>
          <p className="body-text">
            Produktet du prøver å bestille finnes ikke eller er ikke tilgjengelig for øyeblikket.
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Link href="/produkter" className="btn btn-primary">Se alle produkter</Link>
          <Link href="/kontakt-oss" className="btn btn-outline">Kontakt oss</Link>
        </div>
      </div>
    </div>
  )
}
