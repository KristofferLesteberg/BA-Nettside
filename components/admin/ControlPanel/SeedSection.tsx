'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { seedProducts, seedContactPersons, seedReviews, seedProjects, seedOrders } from '@/actions/seed'
import { InfoPopover } from './InfoPopover'

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
  info,
  onSeed,
  children,
}: {
  title: string
  info: string
  onSeed: () => Promise<void>
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-end sm:justify-between gap-3 sm:gap-4 py-4 border-b border-default last:border-0">
      <button
        className="btn btn-secondary whitespace-nowrap self-start sm:order-last"
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
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-end gap-3 sm:gap-4">
        <div className="flex items-center gap-1.5 sm:w-44 sm:shrink-0">
          <span className="label">{title}</span>
          <InfoPopover content={info} />
        </div>
        {children}
      </div>
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
          info="Lager testprodukter på nettstedet. Publiserte testprodukter vil vises for besøkende, utkast er ikke synlige."
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
            label="Utkast"
            value={productDraft}
            onChange={setProductDraft}
          />
        </SeedRow>

        <SeedRow
          title="Kontaktpersoner"
          info="Lager testkontaktpersoner som kan knyttes til produkter og vises på nettstedet."
          onSeed={() => seedContactPersons({ count: contacts })}
        >
          <NumberInput id="seed-contacts" label="Antall" value={contacts} onChange={setContacts} />
        </SeedRow>

        <SeedRow
          title="Anmeldelser"
          info="Lager testanmeldelser som vil vises i anmeldelsesseksjonen på forsiden."
          onSeed={() => seedReviews({ count: reviews })}
        >
          <NumberInput id="seed-reviews" label="Antall" value={reviews} onChange={setReviews} />
        </SeedRow>

        <SeedRow
          title="Prosjekter"
          info="Lager testprosjektforespørsler. Kryss av «Send e-poster» om du vil at det sendes e-postvarsler underveis."
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
          info="Lager testbestillinger. Kryss av «Send e-poster» om du vil at det sendes e-postvarsler underveis."
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
