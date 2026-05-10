import Link from 'next/link'
import { FaCheckCircle, FaEnvelope, FaExternalLinkAlt } from 'react-icons/fa'

interface Props {
  id: string
  email: string
}

export default function ProjectOrderedSuccess({ id, email }: Props) {
  return (
    <div className="w-4/5 min-w-120 max-w-230 mx-auto py-10">
      <div className="card-accented shadow-xl space-y-6 px-8 py-8">

        <div className="flex flex-col items-center text-center gap-3 py-2">
          <FaCheckCircle className="text-success text-5xl" />
          <h2 className="heading-2">Forespørsel mottatt!</h2>
          <p className="body-text max-w-md">
            Takk for din prosjektforespørsel. Vi har mottatt den og vil gå gjennom den så snart som mulig.
          </p>
        </div>

        <hr className="border-border" />

        <div className="space-y-3">
          <h3 className="heading-4">Hva skjer videre?</h3>
          <ol className="space-y-2 body-text list-decimal list-inside">
            <li>Vi gjennomgår forespørselen din og vurderer omfanget.</li>
            <li>En av våre representanter tar kontakt med deg på oppgitt e-post eller telefon.</li>
            <li>Vi avtaler videre fremdrift og detaljer for prosjektet.</li>
          </ol>
        </div>

        <hr className="border-border" />

        <div className="space-y-2">
          <h3 className="heading-4">Referansenummer</h3>
          <p className="small-text">
            Oppgi dette nummeret om du kontakter oss angående forespørselen.
          </p>
          <span className="badge badge-secondary font-mono tracking-wide">{id}</span>
          <div className="pt-1">
            <Link
              href={`/prosjekter/${id}`}
              className="btn btn-outline inline-flex items-center gap-2 text-sm"
            >
              <FaExternalLinkAlt className="text-xs" />
              Åpne forespørselen
            </Link>
          </div>
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

        <Link href="/" className="btn btn-primary w-full justify-center">
          Tilbake til forsiden
        </Link>

      </div>
    </div>
  )
}
