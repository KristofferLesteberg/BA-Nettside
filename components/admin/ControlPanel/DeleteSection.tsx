'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { IconWarning } from '@/app/lib/icons'
import { InfoPopover } from './InfoPopover'
import {
  deleteSeededProducts,
  deleteSeededOrders,
  deleteSeededProjects,
  deleteSeededReviews,
  deleteSeededContactPersons,
  deleteAllSeeded,
  deleteAllProducts,
  deleteAllOrders,
  deleteAllProjects,
  deleteAllReviews,
  deleteAllContactPersons,
  deleteEverything,
} from '@/actions/controlPanel'

const PHRASES = {
  products: 'slett alle produkter',
  orders:   'slett alle bestillinger',
  projects: 'slett alle prosjekter',
  reviews:  'slett alle anmeldelser',
  contacts: 'slett alle kontaktpersoner',
  all:      'slett absolutt alt',
} as const

type PhraseKey = keyof typeof PHRASES

const CATEGORIES: {
  key: Exclude<PhraseKey, 'all'>
  label: string
  deleteSeeded: () => Promise<void>
  deleteAll: () => Promise<void>
  seedInfo: string
  allInfo: string
}[] = [
  {
    key: 'products',
    label: 'Produkter',
    deleteSeeded: deleteSeededProducts,
    deleteAll: deleteAllProducts,
    seedInfo: 'Fjerner kun produkter som er merket som testdata. Vanlige produkter på nettstedet berøres ikke.',
    allInfo: 'Fjerner alle produkter fra nettstedet permanent. Dette kan ikke angres.',
  },
  {
    key: 'orders',
    label: 'Bestillinger',
    deleteSeeded: deleteSeededOrders,
    deleteAll: deleteAllOrders,
    seedInfo: 'Fjerner kun bestillinger som er merket som testdata. Vanlige bestillinger berøres ikke.',
    allInfo: 'Fjerner alle bestillinger permanent. Dette kan ikke angres.',
  },
  {
    key: 'projects',
    label: 'Prosjekter',
    deleteSeeded: deleteSeededProjects,
    deleteAll: deleteAllProjects,
    seedInfo: 'Fjerner kun prosjektforespørsler som er merket som testdata. Vanlige forespørsler berøres ikke.',
    allInfo: 'Fjerner alle prosjektforespørsler permanent. Dette kan ikke angres.',
  },
  {
    key: 'reviews',
    label: 'Anmeldelser',
    deleteSeeded: deleteSeededReviews,
    deleteAll: deleteAllReviews,
    seedInfo: 'Fjerner kun anmeldelser som er merket som testdata. Anmeldelsene på forsiden berøres ikke.',
    allInfo: 'Fjerner alle anmeldelser fra forsiden permanent. Dette kan ikke angres.',
  },
  {
    key: 'contacts',
    label: 'Kontaktpersoner',
    deleteSeeded: deleteSeededContactPersons,
    deleteAll: deleteAllContactPersons,
    seedInfo: 'Fjerner kun kontaktpersoner som er merket som testdata. Vanlige kontaktpersoner berøres ikke.',
    allInfo: 'Fjerner alle kontaktpersoner permanent. Produkter som viste en kontaktperson vil mangle denne informasjonen. Dette kan ikke angres.',
  },
]

function ConfirmInput({
  phraseKey,
  onConfirm,
  onCancel,
}: {
  phraseKey: PhraseKey
  onConfirm: () => Promise<void>
  onCancel: () => void
}) {
  const [value, setValue] = useState('')
  const required = PHRASES[phraseKey]
  const matches = value === required

  return (
    <div className="mt-2 p-3 rounded-sm bg-error-bg border border-error/30 flex flex-col gap-2">
      <p className="small-text text-error">
        Skriv <strong>{required}</strong> for å bekrefte. Du kan ikke lime inn.
      </p>
      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          className="input border-error flex-1 min-w-48"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onPaste={(e) => e.preventDefault()}
          placeholder={required}
          aria-label={`Skriv "${required}" for å bekrefte`}
          autoComplete="off"
          spellCheck={false}
        />
        <button
          disabled={!matches}
          onClick={() => {
            if (!matches) return
            toast.promise(onConfirm(), {
              loading: 'Sletter…',
              success: 'Slettet!',
              error: (e: Error) => e.message ?? 'Noe gikk galt',
            })
            onCancel()
          }}
          className="btn btn-error whitespace-nowrap"
        >
          Slett
        </button>
        <button onClick={onCancel} className="btn btn-outline whitespace-nowrap">
          Avbryt
        </button>
      </div>
    </div>
  )
}

export default function DeleteSection() {
  const [activeConfirm, setActiveConfirm] = useState<PhraseKey | null>(null)

  const toggle = (key: PhraseKey) =>
    setActiveConfirm((prev) => (prev === key ? null : key))

  const handleSeededDelete = (label: string, action: () => Promise<void>) =>
    toast.promise(action(), {
      loading: `Sletter testdata (${label.toLowerCase()})…`,
      success: 'Testdata slettet!',
      error: (e: Error) => e.message ?? 'Noe gikk galt',
    })

  return (
    <section aria-labelledby="delete-heading">
      <div className="flex items-center gap-2 mb-1">
        <h2 id="delete-heading" className="heading-3">Slett data</h2>
        <IconWarning className="text-warning" size={18} aria-hidden="true" />
      </div>
      <p className="small-text text-muted mb-6">Sletting er permanent og kan ikke angres.</p>

      <div className="flex flex-col">
        {CATEGORIES.map(({ key, label, deleteSeeded, deleteAll, seedInfo, allInfo }) => (
          <div key={key} className="py-4 border-b border-default">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="label w-44 shrink-0">{label}</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <button
                    className="btn btn-outline small-text"
                    onClick={() => handleSeededDelete(label, deleteSeeded)}
                  >
                    Slett testdata
                  </button>
                  <InfoPopover content={seedInfo} align="right" />
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    className="btn btn-error small-text"
                    onClick={() => toggle(key)}
                    aria-expanded={activeConfirm === key}
                    aria-controls={`confirm-${key}`}
                  >
                    Slett alt
                  </button>
                  <InfoPopover content={allInfo} align="right" />
                </div>
              </div>
            </div>
            {activeConfirm === key && (
              <div id={`confirm-${key}`}>
                <ConfirmInput
                  phraseKey={key}
                  onConfirm={deleteAll}
                  onCancel={() => setActiveConfirm(null)}
                />
              </div>
            )}
          </div>
        ))}

        {/* Cross-category nukes */}
        <div className="py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="label w-44 shrink-0">Alle kategorier</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <button
                  className="btn btn-outline small-text"
                  onClick={() =>
                    toast.promise(deleteAllSeeded(), {
                      loading: 'Sletter all testdata…',
                      success: 'All testdata slettet!',
                      error: (e: Error) => e.message ?? 'Noe gikk galt',
                    })
                  }
                >
                  Slett all testdata
                </button>
                <InfoPopover
                  content="Fjerner all testdata fra nettstedet på én gang. Vanlig innhold berøres ikke."
                  align="right"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  className="btn btn-error small-text"
                  onClick={() => toggle('all')}
                  aria-expanded={activeConfirm === 'all'}
                  aria-controls="confirm-all"
                >
                  Slett absolutt alt
                </button>
                <InfoPopover
                  content="Fjerner absolutt alt innhold fra nettstedet permanent – produkter, bestillinger, prosjekter, anmeldelser og kontaktpersoner. Dette kan ikke angres."
                  align="right"
                />
              </div>
            </div>
          </div>
          {activeConfirm === 'all' && (
            <div id="confirm-all">
              <ConfirmInput
                phraseKey="all"
                onConfirm={deleteEverything}
                onCancel={() => setActiveConfirm(null)}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
