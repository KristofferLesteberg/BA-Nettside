'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { seedProducts, seedContactPersons, seedReviews, seedProjects, seedOrders } from '@/actions/seed'

function NumberInput({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="small-text text-muted">{label}</label>
      <input
        id={id}
        type="number"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Math.max(0, Math.min(100, Number(e.target.value))))}
        className="input w-24"
      />
    </div>
  )
}

function SeedRow({
  title,
  onSeed,
  children,
}: {
  title: string
  onSeed: () => Promise<void>
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 py-4 border-b border-default last:border-0">
      <div className="flex flex-wrap items-end gap-4">
        <span className="label w-36 shrink-0">{title}</span>
        {children}
      </div>
      <button
        className="btn btn-secondary whitespace-nowrap"
        onClick={() =>
          toast.promise(onSeed(), {
            loading: `Genererer ${title.toLowerCase()}…`,
            success: `${title} generert!`,
            error: (e: Error) => e.message ?? 'Noe gikk galt',
          })
        }
      >
        Generer
      </button>
    </div>
  )
}

export default function SeedSection() {
  const [productPublished, setProductPublished] = useState(10)
  const [productDraft, setProductDraft] = useState(0)
  const [contacts, setContacts] = useState(10)
  const [reviews, setReviews] = useState(10)
  const [projects, setProjects] = useState(10)
  const [projectEmails, setProjectEmails] = useState(false)
  const [orders, setOrders] = useState(10)
  const [orderEmails, setOrderEmails] = useState(false)

  return (
    <section aria-labelledby="seed-heading">
      <h2 id="seed-heading" className="heading-3 mb-1">Generer testdata</h2>
      <p className="small-text text-muted mb-6">
        Genererte objekter merkes med et testdata-merke og kan slettes samlet i seksjonen nedenfor.
      </p>

      <div>
        <SeedRow
          title="Produkter"
          onSeed={() => seedProducts({ publishedCount: productPublished, draftCount: productDraft })}
        >
          <NumberInput
            id="seed-published"
            label="Publisert"
            value={productPublished}
            onChange={setProductPublished}
          />
          <NumberInput
            id="seed-draft"
            label="Kladd"
            value={productDraft}
            onChange={setProductDraft}
          />
        </SeedRow>

        <SeedRow
          title="Kontaktpersoner"
          onSeed={() => seedContactPersons({ count: contacts })}
        >
          <NumberInput id="seed-contacts" label="Antall" value={contacts} onChange={setContacts} />
        </SeedRow>

        <SeedRow
          title="Anmeldelser"
          onSeed={() => seedReviews({ count: reviews })}
        >
          <NumberInput id="seed-reviews" label="Antall" value={reviews} onChange={setReviews} />
        </SeedRow>

        <SeedRow
          title="Prosjekter"
          onSeed={() => seedProjects({ count: projects, sendEmails: projectEmails })}
        >
          <NumberInput id="seed-projects" label="Antall" value={projects} onChange={setProjects} />
          <label className="flex items-center gap-2 cursor-pointer select-none small-text pb-1">
            <input
              type="checkbox"
              checked={projectEmails}
              onChange={(e) => setProjectEmails(e.target.checked)}
              className="w-4 h-4 accent-primary shrink-0"
            />
            Send e-poster
          </label>
        </SeedRow>

        <SeedRow
          title="Bestillinger"
          onSeed={() => seedOrders({ count: orders, sendEmails: orderEmails })}
        >
          <NumberInput id="seed-orders" label="Antall" value={orders} onChange={setOrders} />
          <label className="flex items-center gap-2 cursor-pointer select-none small-text pb-1">
            <input
              type="checkbox"
              checked={orderEmails}
              onChange={(e) => setOrderEmails(e.target.checked)}
              className="w-4 h-4 accent-primary shrink-0"
            />
            Send e-poster
          </label>
        </SeedRow>
      </div>
    </section>
  )
}
