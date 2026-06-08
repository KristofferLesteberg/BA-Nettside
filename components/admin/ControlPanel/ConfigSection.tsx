'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { getAllAppConfig, saveAppConfig } from '@/actions/controlPanel'
import { usePopUp } from '@/components/shared/PopUp'
import { InfoPopover } from './InfoPopover'

// These match the CONFIG_KEYS values in app/lib/app-config.ts
const K = {
  SESSION_LIFETIME:   'session_lifetime_seconds',
  USERNAME:           'admin_username',
  PASSWORD:           'admin_password',
  EMAIL_ALLOWLIST:    'admin_email_allowlist',
  NOTIFICATION_EMAIL: 'notification_email',
  EMAIL_RETRIES:      'email_max_retry_attempts',
} as const

const SESSION_SENSITIVE = new Set([K.USERNAME, K.PASSWORD, K.EMAIL_ALLOWLIST, K.SESSION_LIFETIME])

type ConfigMap = Record<string, string>

function FieldLabel({ htmlFor, label, info }: { htmlFor: string; label: string; info: string }) {
  return (
    <div className="flex items-center gap-1.5 mb-1">
      <label htmlFor={htmlFor} className="label">{label}</label>
      <InfoPopover content={info} />
    </div>
  )
}

export default function ConfigSection() {
  const { open: openPopUp, element: popUpElement } = usePopUp()
  const [config, setConfig] = useState<ConfigMap>({})
  const [loading, setLoading] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    getAllAppConfig().then((c) => {
      setConfig(Object.fromEntries(Object.entries(c).map(([k, v]) => [k, v ?? ''])))
      setLoading(false)
    })
  }, [])

  const update = (key: string, value: string) =>
    setConfig((prev) => ({ ...prev, [key]: value }))

  const handleSave = () => {
    const touchesSession = Object.keys(config).some((k) => SESSION_SENSITIVE.has(k as never))

    const doSave = (invalidate: boolean) =>
      toast.promise(saveAppConfig(config, invalidate), {
        loading: 'Lagrer innstillinger…',
        success: 'Innstillinger lagret!',
        error: (e: Error) => e.message ?? 'Noe gikk galt',
      })

    if (touchesSession) {
      openPopUp({
        title: 'Lagre innstillinger',
        subtitle: 'Noen innstillinger påvirker aktive påloggingssesjoner.',
        checkbox: {
          label: 'Invalider alle aktive sesjoner (inkludert din egen)',
          defaultChecked: false,
        },
        yesLabel: 'Lagre',
        noLabel: 'Avbryt',
        onYes: (invalidate) => doSave(!!invalidate),
      })
    } else {
      doSave(false)
    }
  }

  if (loading) {
    return (
      <section aria-labelledby="config-heading" aria-busy="true">
        <h2 id="config-heading" className="heading-3 mb-6">Systeminnstillinger</h2>
        <p className="small-text text-muted" aria-live="polite">Laster innstillinger…</p>
      </section>
    )
  }

  return (
    <section aria-labelledby="config-heading">
      {popUpElement}
      <h2 id="config-heading" className="heading-3 mb-1">Systeminnstillinger</h2>
      <p className="small-text text-muted mb-6">
        Verdier lagres i databasen og overstyrer miljøvariabler. Tomme felt faller tilbake til
        miljøvariabelen.
      </p>

      <div className="flex flex-col gap-5 max-w-120">
        <div>
          <FieldLabel
            htmlFor="cfg-lifetime"
            label="Sesjonslevetid (sekunder)"
            info="Bestemmer hvor lenge du forblir innlogget. Verdien er i sekunder – 3600 tilsvarer 1 time. Endringen gjelder neste gang du logger inn."
          />
          <input
            id="cfg-lifetime"
            type="number"
            min={60}
            className="input"
            value={config[K.SESSION_LIFETIME] ?? ''}
            onChange={(e) => update(K.SESSION_LIFETIME, e.target.value)}
          />
        </div>

        <div>
          <FieldLabel
            htmlFor="cfg-username"
            label="Brukernavn"
            info="Brukernavnet du logger inn med på admin-siden. Endringer trer i kraft neste gang du logger inn."
          />
          <input
            id="cfg-username"
            type="text"
            autoComplete="off"
            className="input"
            value={config[K.USERNAME] ?? ''}
            onChange={(e) => update(K.USERNAME, e.target.value)}
          />
        </div>

        <div>
          <FieldLabel
            htmlFor="cfg-password"
            label="Passord"
            info="Passordet du logger inn med på admin-siden. Endringer trer i kraft neste gang du logger inn."
          />
          <div className="flex gap-2">
            <input
              id="cfg-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              className="input flex-1"
              value={config[K.PASSWORD] ?? ''}
              onChange={(e) => update(K.PASSWORD, e.target.value)}
            />
            <button
              type="button"
              className="btn btn-outline whitespace-nowrap"
              onClick={() => setShowPassword((p) => !p)}
              aria-label={showPassword ? 'Skjul passord' : 'Vis passord'}
              aria-pressed={showPassword}
            >
              {showPassword ? 'Skjul' : 'Vis'}
            </button>
          </div>
        </div>

        <div>
          <FieldLabel
            htmlFor="cfg-allowlist"
            label="Tillatte Google-kontoer"
            info="E-postadressene som kan logge inn på admin-siden via Google. Skriv adressene adskilt med komma. Kun disse kontoene får tilgang."
          />
          <textarea
            id="cfg-allowlist"
            rows={3}
            className="input resize-none"
            value={config[K.EMAIL_ALLOWLIST] ?? ''}
            onChange={(e) => update(K.EMAIL_ALLOWLIST, e.target.value)}
          />
        </div>

        <div>
          <FieldLabel
            htmlFor="cfg-notification"
            label="Varslingsadresse"
            info="E-postadressen som mottar beskjed når noen sender inn en ny bestilling eller prosjektforespørsel via nettstedet."
          />
          <input
            id="cfg-notification"
            type="email"
            className="input"
            value={config[K.NOTIFICATION_EMAIL] ?? ''}
            onChange={(e) => update(K.NOTIFICATION_EMAIL, e.target.value)}
          />
        </div>

        <div>
          <FieldLabel
            htmlFor="cfg-retries"
            label="Maks e-postforsøk"
            info="Antall ganger systemet prøver å sende en e-post på nytt dersom noe går galt. Høyere tall gir flere forsøk før det gis opp."
          />
          <input
            id="cfg-retries"
            type="number"
            min={1}
            max={20}
            className="input"
            value={config[K.EMAIL_RETRIES] ?? ''}
            onChange={(e) => update(K.EMAIL_RETRIES, e.target.value)}
          />
        </div>

        <button onClick={handleSave} className="btn btn-primary self-start mt-2">
          Lagre innstillinger
        </button>
      </div>
    </section>
  )
}
