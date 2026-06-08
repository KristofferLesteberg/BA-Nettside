'use client'

import { useEffect, useRef, useState } from 'react'
import { signOut } from 'next-auth/react'
import toast from 'react-hot-toast'
import { getAllAppConfig, saveAppConfig } from '@/actions/controlPanel'
import {
  getNotificationRecipients,
  addNotificationRecipient,
  deleteNotificationRecipient,
} from '@/actions/notificationRecipients'
import { usePopUp } from '@/components/shared/PopUp'
import { InfoPopover } from './InfoPopover'
import { IconDelete, IconPlus } from '@/app/lib/icons'

// These match the CONFIG_KEYS values in app/lib/app-config.ts
const K = {
  SESSION_LIFETIME:   'session_lifetime_seconds',
  USERNAME:           'admin_username',
  PASSWORD:           'admin_password',
  EMAIL_RETRIES:      'email_max_retry_attempts',
  HIDE_TEST_DATA:     'hide_test_data',
} as const

const SESSION_SENSITIVE = new Set([K.USERNAME, K.PASSWORD, K.SESSION_LIFETIME])

type ConfigMap = Record<string, string>

interface Recipient {
  id: number
  name: string
  email: string
}

function FieldLabel({ htmlFor, label, info }: { htmlFor: string; label: string; info: string }) {
  return (
    <div className="flex items-center gap-1.5 mb-1">
      <label htmlFor={htmlFor} className="label">{label}</label>
      <InfoPopover content={info} />
    </div>
  )
}

function NotificationRecipientsList() {
  const [recipients, setRecipients] = useState<Recipient[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [adding, setAdding] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    getNotificationRecipients().then(setRecipients)
  }, [])

  const handleAdd = async () => {
    if (!name.trim() || !email.trim()) return
    setAdding(true)
    try {
      const created = await toast.promise(
        addNotificationRecipient(name.trim(), email.trim()),
        {
          loading: 'Legger til…',
          success: 'Mottaker lagt til',
          error: (e: Error) => e.message ?? 'Noe gikk galt',
        }
      )
      setRecipients((prev) => [...prev, created])
      setName('')
      setEmail('')
      nameRef.current?.focus()
    } catch {
      // toast already shows the error
    } finally {
      setAdding(false)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await toast.promise(deleteNotificationRecipient(id), {
        loading: 'Sletter…',
        success: 'Mottaker fjernet',
        error: (e: Error) => e.message ?? 'Noe gikk galt',
      })
      setRecipients((prev) => prev.filter((r) => r.id !== id))
    } catch {
      // toast already shows the error
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAdd()
  }

  return (
    <div>
      <div className="flex items-center gap-1.5 mb-1">
        <span className="label">Varslingsmottakere for prosjektforespørsler</span>
        <InfoPopover content="Disse personene mottar e-post når noen sender inn en ny prosjektforespørsel. Produktbestillinger uten kontaktperson varsler også denne listen." />
      </div>

      {recipients.length > 0 && (
        <ul className="mb-3 flex flex-col gap-1.5" aria-label="Varslingsmottakere">
          {recipients.map((r) => (
            <li key={r.id} className="flex items-center justify-between gap-3 px-3 py-2 rounded-[--radius-md] bg-sunken border border-default">
              <span className="text-sm truncate">
                <span className="font-medium">{r.name}</span>
                <span className="text-muted ml-2">{r.email}</span>
              </span>
              <button
                type="button"
                className="btn btn-ghost btn-icon shrink-0 text-error hover:bg-error-bg"
                onClick={() => handleDelete(r.id)}
                aria-label={`Fjern ${r.name}`}
              >
                <IconDelete size={14} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {recipients.length === 0 && (
        <p className="small-text text-muted mb-3">Ingen mottakere lagt til ennå.</p>
      )}

      <div className="flex items-center gap-2">
        <input
          ref={nameRef}
          type="text"
          placeholder="Navn"
          className="input w-36 shrink-0"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Navn på ny mottaker"
        />
        <input
          type="email"
          placeholder="E-postadresse"
          className="input flex-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="E-postadresse til ny mottaker"
        />
        <button
          type="button"
          className="btn btn-outline btn-icon shrink-0"
          onClick={handleAdd}
          disabled={adding || !name.trim() || !email.trim()}
          aria-label="Legg til mottaker"
        >
          <IconPlus size={14} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default function ConfigSection() {
  const { open: openPopUp, element: popUpElement } = usePopUp()
  const [config, setConfig] = useState<ConfigMap>({})
  const [initialConfig, setInitialConfig] = useState<ConfigMap>({})
  const [loading, setLoading] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    getAllAppConfig().then((c) => {
      const map = Object.fromEntries(Object.entries(c).map(([k, v]) => [k, v ?? '']))
      setConfig(map)
      setInitialConfig(map)
      setLoading(false)
    })
  }, [])

  const update = (key: string, value: string) =>
    setConfig((prev) => ({ ...prev, [key]: value }))

  const handleSave = () => {
    const touchesSession = Object.keys(config).some(
      (k) => SESSION_SENSITIVE.has(k as never) && config[k] !== initialConfig[k]
    )

    const doSave = async (invalidate: boolean) => {
      try {
        await toast.promise(saveAppConfig(config, invalidate), {
          loading: 'Lagrer innstillinger…',
          success: 'Innstillinger lagret!',
          error: (e: Error) => e.message ?? 'Noe gikk galt',
        })
        if (invalidate) signOut({ callbackUrl: '/admin/login' })
      } catch {}
    }

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

        <div>
          <div className="flex items-center gap-3">
            <input
              id="cfg-hide-test-data"
              type="checkbox"
              className="w-4 h-4 accent-primary shrink-0"
              checked={config[K.HIDE_TEST_DATA] === 'true'}
              onChange={(e) => update(K.HIDE_TEST_DATA, e.target.checked ? 'true' : 'false')}
            />
            <div className="flex items-center gap-1.5">
              <label htmlFor="cfg-hide-test-data" className="label cursor-pointer">
                Skjul testdata for besøkende
              </label>
              <InfoPopover content="Når aktivert skjules produkter, anmeldelser og andre elementer merket som testdata for besøkende. Administratorer ser alltid alt." />
            </div>
          </div>
        </div>

        <NotificationRecipientsList />

        <button onClick={handleSave} className="btn btn-primary self-start mt-2">
          Lagre innstillinger
        </button>
      </div>
    </section>
  )
}
