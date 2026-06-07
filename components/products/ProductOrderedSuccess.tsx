import Link from 'next/link'
import { IconSuccess, IconEmail, IconHome, IconPhone } from '@/app/lib/icons'
import CopyButton from '../shared/CopyButton'
import { formatPrice } from '@/app/lib/product-utils'

interface ContactPerson {
  name: string
  email: string | null
  phone: string | null
  title: string
}

interface Props {
  id: number
  email: string
  amount: number
  productTitle: string
  price: number
  extraDetails?: string
  contactPerson: ContactPerson | null
}

export default function ProductOrderedSuccess({ id, email, amount, productTitle, price, extraDetails, contactPerson }: Props) {
  const total = price * amount

  return (
    <div className="w-full max-w-160 mx-auto px-4 py-10">
      <div className="card-accented shadow-xl space-y-6 px-4 sm:px-8 py-8">

        <div className="flex flex-col items-center text-center gap-3 py-2">
          <IconSuccess className="text-success text-5xl" />
          <h2 className="heading-2">Bestilling mottatt!</h2>
          <p className="body-text">
            Takk for din bestilling av{' '}
            <span className="font-semibold text-text">{amount} stk. {productTitle}</span>.
            Vi har mottatt den og vil ta kontakt med deg så snart som mulig.
          </p>
        </div>

        <hr className="border-border" />

        <div className="space-y-3">
          <h3 className="heading-3">Ordreoversikt</h3>
          <div className="card p-3 flex flex-col divide-y rounded-lg">
            <div className="flex justify-between px-4 py-2">
              <span className="small-text text-muted">Produkt</span>
              <span className="small-text font-medium text-text">{productTitle}</span>
            </div>
            <div className="flex justify-between px-4 py-2">
              <span className="small-text text-muted">Antall</span>
              <span className="small-text text-text">{amount} stk</span>
            </div>
            <div className="flex justify-between px-4 py-2">
              <span className="small-text text-muted">Pris/stk</span>
              <span className="small-text text-text">{formatPrice(price)}</span>
            </div>
            <div className="flex justify-between px-4 py-2">
              <span className="small-text text-muted font-semibold">Totalt</span>
              <span className="small-text font-semibold text-primary">{formatPrice(total)}</span>
            </div>
            {extraDetails && (
              <div className="flex flex-col gap-1 px-4 py-2">
                <span className="small-text text-muted">Tilleggsinfo</span>
                <span className="small-text text-text">{extraDetails}</span>
              </div>
            )}
            {contactPerson && (
              <div className="flex flex-col gap-1 px-4 py-2">
                <span className="small-text text-muted">Kontaktperson</span>
                <span className="small-text font-medium text-text">{contactPerson.name} · {contactPerson.title}</span>
                {contactPerson.email && (
                  <a href={`mailto:${contactPerson.email}`} className="small-text text-secondary hover:underline flex items-center gap-1.5">
                    <IconEmail className="shrink-0" aria-hidden="true" />
                    {contactPerson.email}
                  </a>
                )}
                {contactPerson.phone && (
                  <a href={`tel:${contactPerson.phone}`} className="small-text text-secondary hover:underline flex items-center gap-1.5">
                    <IconPhone className="shrink-0" aria-hidden="true" />
                    {contactPerson.phone}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <hr className="border-border" />

        <div className="space-y-3">
          <h3 className="heading-3">Hva skjer videre?</h3>
          <ol className="space-y-2 body-text list-decimal list-inside">
            <li>Vi behandler bestillingen din og bekrefter lagerstatus.</li>
            <li>En av våre representanter tar kontakt med deg på oppgitt e-post eller telefon.</li>
            <li>Vi avtaler levering og videre detaljer.</li>
          </ol>
        </div>

        <hr className="border-border" />

        <div className="card-subtle space-y-2">
          <div className="flex items-center gap-2">
            <p className="label">Referansenummer</p>
            <div className="inline-flex items-center gap-4 pl-3 pr-1 py-2 rounded-md bg-secondary text-text-on-primary text-sm font-mono">
              #{id}
              <CopyButton valueToCopy={`#${id}`} />
            </div>
          </div>
          <p className="small-text">Oppgi dette nummeret om du kontakter oss angående bestillingen.</p>
        </div>

        <hr className="border-border" />

        <div className="flex items-start gap-3">
          <IconEmail className="text-text-muted mt-1 shrink-0" />
          <p className="small-text">
            En bekreftelse er sendt til{' '}
            <span className="font-semibold text-text">{email}</span>.
            Sjekk søppelpost om du ikke finner den i innboksen.
          </p>
        </div>

        <Link href="/" className="btn btn-primary w-full justify-center gap-1">
          <IconHome /> Tilbake til forsiden
        </Link>

      </div>
    </div>
  )
}
