import Link from 'next/link'
import { FaCheckCircle, FaEnvelope, FaExternalLinkAlt, FaHome } from 'react-icons/fa'
import CopyButton from '../shared/CopyButton'

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
          <p className="body-text">
            Takk for din prosjektforespørsel. Vi har mottatt den og vil gå gjennom den så snart som mulig.
          </p>
        </div>

        <hr className="border-border" />

        <div className="space-y-3">
          <h3 className="heading-3">Hva skjer videre?</h3>
          <ol className="space-y-2 body-text list-decimal list-inside">
            <li>Vi gjennomgår forespørselen din og vurderer omfanget.</li>
            <li>En av våre representanter tar kontakt med deg på oppgitt e-post eller telefon.</li>
            <li>Vi avtaler videre fremdrift og detaljer for prosjektet.</li>
          </ol>
        </div>

        <hr className="border-border" />

        <div className="space-y-4">
          <h3 className="heading-3">Referering til denne forespørselen</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="card-subtle space-y-2">
              <p className="label">Se forespørselen</p>
              <p className="small-text">Bruk denne lenken for å se eller avbestille forespørselen.</p>
              <a href={`/prosjekter/${id}`}
              target='_blank'
              className="btn btn-outline inline-flex items-center gap-2">
                Se min forespørsel
                <FaExternalLinkAlt className="text-xs" />
              </a>
            </div>

            <div className="card-subtle space-y-2">
              <p className="label">Referansenummer</p>
              <p className="small-text">Oppgi dette nummeret om du kontakter oss angående forespørselen.</p>
              <code className="flex flex-row justify-between w-full px-3 py-2 rounded-md bg-secondary text-text-on-primary text-sm font-mono break-all">
                {id}
                <CopyButton valueToCopy={id}/>
              </code>
            </div>

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

        <Link href="/" className="btn btn-primary w-full justify-center gap-1">
          <FaHome />Tilbake til forsiden
        </Link>

      </div>
    </div>
  )
}
