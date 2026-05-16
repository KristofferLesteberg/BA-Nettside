"use client"

import { useState } from 'react'
import { verifyProjectClient } from '@/actions/projects'
import UpdateProjectForm from './updateProject'
import Link from 'next/link'

type FormValues = {
  educationField: string
  title: string
  description: string
  minPrice: string
  maxPrice: string
  clientForename: string
  clientSurname: string
  clientEmail: string
  clientPhone: string
  organizationName: string
  organizationNumber: string
  address: string
  billingAddress: string
}

export default function ClientVerificationGate({ id }: { id: string }) {
  const [forename, setForename] = useState('')
  const [clientSurname, setClientSurname] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [initialValues, setInitialValues] = useState<FormValues | null>(null)

  if (initialValues) {
    return <UpdateProjectForm id={id} initialValues={initialValues} />
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const result = await verifyProjectClient(id, forename, email)
      if (!result) {
        setError('Feil navn eller e-postadresse. Sjekk at du bruker samme navn og e-post som da du sendte inn prosjektet.')
        return
      }
      setInitialValues(result)
    } catch {
      setError('Noe gikk galt. Prøv igjen.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-page">
      <div className="w-full max-w-96 md:max-w-2/3 lg:max-w-3/5 space-y-6">

        <div className="space-y-1">
          <p className="label">Prosjektforespørsel</p>
          <h1 className="heading-2">Bekreft identitet</h1>
          <p className="body-text">
            Skriv inn fornavnet, etternavnet og e-postadressen du brukte da du sendte inn prosjektet for å se og redigere detaljene.
          </p>
        </div>

        <div className="card space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="label" htmlFor="forename">Fornavn</label>
              <input
                id="forename"
                type="text"
                className="input"
                placeholder="Ditt fornavn"
                value={forename}
                onChange={(e) => setForename(e.target.value)}
                required
                autoComplete="forename"
                autoFocus
              />
              <label className="label" htmlFor="surname">Etternavn</label>
              <input
                id="surname"
                type="text"
                className="input"
                placeholder="Ditt etternavn"
                value={clientSurname}
                onChange={(e) => setClientSurname(e.target.value)}
                required
                autoComplete="surname"
                autoFocus
              />
            </div>

            <div className="space-y-1.5">
              <label className="label" htmlFor="email">E-postadresse</label>
              <input
                id="email"
                type="email"
                className="input"
                placeholder="din@epost.no"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            {error && (
              <div className="rounded-md bg-error-bg border border-error px-3 py-2.5">
                <p className="small-text text-error">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full mt-6"
            >
              {loading ? 'Bekrefter…' : 'Gå til prosjektet'}
            </button>
          </form>
        </div>

        <p className="small-text text-center">
          Finner du ikke frem? 
          <Link href="/kontakt-oss">
            &nbsp;Ta kontakt med oss&nbsp;
          </Link>
          så hjelper vi deg.
        </p>
      </div>
    </div>
  )
}
