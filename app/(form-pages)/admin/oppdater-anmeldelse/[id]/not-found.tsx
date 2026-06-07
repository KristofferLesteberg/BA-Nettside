"use client"

import Link from 'next/link'
import BackBtn from '@/components/shared/BackBtn'

export default function UpdateReviewNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-page">
      <div className="w-full max-w-120 mx-auto space-y-6">
        <BackBtn />
        <div className="space-y-1">
          <p className="label">Rediger anmeldelse</p>
          <h1 className="heading-2">Anmeldelsen ble ikke funnet</h1>
          <p className="body-text">
            Anmeldelsen du prøver å redigere finnes ikke. Det kan ha blitt slettet.
          </p>
        </div>
        <Link href="/admin?tab=anmeldelser" className="btn btn-primary inline-block">Tilbake til anmeldelser</Link>
      </div>
    </div>
  )
}
