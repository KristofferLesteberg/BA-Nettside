'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { getAllAppConfig, saveAppConfig } from '@/actions/controlPanel'
import { usePopUp } from '@/components/shared/PopUp'

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
      <section aria-labelledby="config-heading">
        <h2 id="config-heading" className="heading-3 mb-6">Systeminnstillinger</h2>
        <p className="small-text text-muted">Laster innstillinger…</p>
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

      <div className="flex flex-col gap-5 max-w-xl">
        <div>
          <label htmlFor="cfg-lifetime" className="label mb-1 block">
            Sesjonslevetid (sekunder)
          </label>
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
          <label htmlFor="cfg-username" className="label mb-1 block">Brukernavn</label>
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
          <label htmlFor="cfg-password" className="label mb-1 block">Passord</label>
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
            >
              {showPassword ? 'Skjul' : 'Vis'}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="cfg-allowlist" className="label mb-1 block">
            Tillatte Google-kontoer
          </label>
          <p className="small-text text-muted mb-1">Kommaseparert liste med e-postadresser</p>
          <textarea
            id="cfg-allowlist"
            rows={3}
            className="input resize-none"
            value={config[K.EMAIL_ALLOWLIST] ?? ''}
            onChange={(e) => update(K.EMAIL_ALLOWLIST, e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="cfg-notification" className="label mb-1 block">Varslingsadresse</label>
          <p className="small-text text-muted mb-1">
            Mottar e-post ved nye bestillinger og prosjektforespørsler
          </p>
          <input
            id="cfg-notification"
            type="email"
            className="input"
            value={config[K.NOTIFICATION_EMAIL] ?? ''}
            onChange={(e) => update(K.NOTIFICATION_EMAIL, e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="cfg-retries" className="label mb-1 block">Maks e-postforsøk</label>
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
