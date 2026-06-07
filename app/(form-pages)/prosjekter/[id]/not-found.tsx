"use client"

import Link from 'next/link'
import BackBtn from '@/components/shared/BackBtn'

export default function ProjectNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-page">
      <div className="w-full max-w-120 mx-auto space-y-6">
        <BackBtn />
        <div className="space-y-1">
          <p className="label">Prosjektforespørsel</p>
          <h1 className="heading-2">Prosjekt ikke funnet</h1>
          <p className="body-text">
            Sjekk at du har riktig lenke. Finner du ikke frem?{' '}
            <Link href="/kontakt-oss" className="text-primary underline">Ta kontakt med oss</Link> så hjelper vi deg.
          </p>
        </div>
      </div>
    </div>
  )
}
