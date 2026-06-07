"use client"

import Link from 'next/link'
import BackBtn from '@/components/shared/BackBtn'

export default function PreviewProductNotFound() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 sm:px-6">
      <BackBtn />
      <div className="mt-6 space-y-2">
        <p className="label">Forhåndsvisning</p>
        <h1 className="heading-2">Produktet ble ikke funnet</h1>
        <p className="body-text">
          Produktet du prøver å forhåndsvise finnes ikke. Det kan ha blitt slettet.
        </p>
      </div>
      <Link href="/admin?tab=produkter" className="btn btn-primary mt-6 inline-block">Tilbake til produkter</Link>
    </div>
  )
}
