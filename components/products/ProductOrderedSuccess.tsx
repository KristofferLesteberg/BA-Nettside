import Link from 'next/link'
import { FaCheckCircle, FaEnvelope, FaHome } from 'react-icons/fa'
import CopyButton from '../shared/CopyButton'

interface Props {
  id: number
  email: string
  amount: number
  productTitle: string
}

export default function ProductOrderedSuccess({ id, email, amount, productTitle }: Props) {
  return (
    <div className="w-4/5 min-w-120 max-w-160 mx-auto py-10">
      <div className="card-accented shadow-xl space-y-6 px-8 py-8">

        <div className="flex flex-col items-center text-center gap-3 py-2">
          <FaCheckCircle className="text-success text-5xl" />
          <h2 className="heading-2">Bestilling mottatt!</h2>
          <p className="body-text">
            Takk for din bestilling av{' '}
            <span className="font-semibold text-text">{amount} stk. {productTitle}</span>.
            Vi har mottatt den og vil ta kontakt med deg så snart som mulig.
          </p>
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
          <FaEnvelope className="text-text-muted mt-1 shrink-0" />
          <p className="small-text">
            En bekreftelse er sendt til{' '}
            <span className="font-semibold text-text">{email}</span>.
            Sjekk søppelpost om du ikke finner den i innboksen.
          </p>
        </div>

        <Link href="/" className="btn btn-primary w-full justify-center gap-1">
          <FaHome /> Tilbake til forsiden
        </Link>

      </div>
    </div>
  )
}
