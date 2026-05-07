"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import PhoneInputWithCountrySelect from 'react-phone-number-input'
import { parsePhoneNumberWithError } from 'libphonenumber-js'
import type { E164Number, CountryCode } from 'libphonenumber-js'
import PriceRange from '@/components/shared/input/price-range'
import BackBtn from '@/components/shared/BackBtn'
import { updateProject } from '@/actions/projects'
import { FaEdit } from "react-icons/fa"

type EditableField =
  | 'educationField' | 'title' | 'description' | 'budget'
  | 'name' | 'email' | 'phone' | 'org' | 'address' | 'billingAddress'

interface FormValues {
  educationField: string
  title: string
  description: string
  minPrice: string
  maxPrice: string
  clientForename: string
  clientSurname: string
  clientEmail: string
  clientPhone: string
  organizationName: string
  organizationNumber: string
  address: string
  billingAddress: string
}

const EDUCATION_LABELS: Record<string, string> = {
  BUILDING: 'Bygg',
  CONSTRUCTION: 'Anlegg',
}

interface EditBtnProps {
  field: EditableField
  active: EditableField | null
  onUnlock: (f: EditableField) => void
  onLock: () => void
  onCancel: () => void
}

function EditBtn({ field, active, onUnlock, onLock, onCancel }: EditBtnProps) {
  const editing = active === field
  const blocked = !editing && active !== null

  if (editing) {
    return (
      <div className="flex gap-2 animate-fade-in">
        <button type="button" onClick={onCancel} className="btn btn-ghost text-sm">
          Avbryt
        </button>
        <button type="button" onClick={onLock} className="btn btn-success text-sm">
          Lagre
        </button>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => onUnlock(field)}
      disabled={blocked}
      className="btn btn-ghost p-1.5 py-1 text-sm gap-1 transition-opacity duration-150 disabled:opacity-30"
    >
      <FaEdit className="text-xs" /> Rediger
    </button>
  )
}

export default function UpdateProjectForm({ id, initialValues }: { id: string; initialValues: FormValues }) {
  const router = useRouter()
  const [values, setValues] = useState<FormValues>(initialValues)
  const [activeField, setActiveField] = useState<EditableField | null>(null)
  const [snapshot, setSnapshot] = useState<FormValues | null>(null)
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>(() => {
    try {
      const parsed = parsePhoneNumberWithError(initialValues.clientPhone)
      return (parsed.country as CountryCode) ?? 'NO'
    } catch {
      return 'NO'
    }
  })
  const [submitting, setSubmitting] = useState(false)

  const set = (key: keyof FormValues) => (val: string) =>
    setValues(prev => ({ ...prev, [key]: val }))

  const editProps = {
    active:   activeField,
    onUnlock: (f: EditableField) => { setSnapshot({ ...values }); setActiveField(f) },
    onLock:   () => { setSnapshot(null); setActiveField(null) },
    onCancel: () => { if (snapshot) setValues(snapshot); setSnapshot(null); setActiveField(null) },
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (activeField !== null) return
    setSubmitting(true)
    try {
      await updateProject(id, {
        educationField:     values.educationField,
        title:              values.title,
        description:        values.description,
        minPrice:           values.minPrice,
        maxPrice:           values.maxPrice,
        clientForename:     values.clientForename,
        clientSurname:      values.clientSurname,
        clientEmail:        values.clientEmail,
        clientPhone:        values.clientPhone,
        organizationName:   values.organizationName   || undefined,
        organizationNumber: values.organizationNumber || undefined,
        address:            values.address,
        billingAddress:     values.billingAddress,
      })
      toast.success('Prosjekt oppdatert')
      router.push('/admin?tab=prosjekter')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Kunne ikke oppdatere prosjektet')
    } finally {
      setSubmitting(false)
    }
  }

  const hasOrg = !!(values.organizationName || values.organizationNumber)

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* ── Header ───────────────────────────────────────── */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <BackBtn />
          <div className="flex items-center gap-3 flex-wrap">
            {activeField !== null && (
              <p className="small-text text-warning">Lagre eller avbryt gjeldende felt for å sende inn</p>
            )}
            <button
              type="submit"
              disabled={submitting || activeField !== null}
              className="btn btn-primary disabled:opacity-50"
            >
              {submitting ? 'Lagrer...' : 'Oppdater prosjekt'}
            </button>
          </div>
        </div>

        <h1 className="heading-1">Prosjektforespørsel</h1>

        {/* ── Prosjektinformasjon ──────────────────────────── */}
        <section className="card space-y-6">
          <h2 className="label border-b border-border pb-3 block">Prosjektinformasjon</h2>

          {/* Linje */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="label">Linje</span>
              <EditBtn field="educationField" {...editProps} />
            </div>
            {activeField === 'educationField' ? (
              <select className="input" value={values.educationField} onChange={(e) => set('educationField')(e.target.value)}>
                <option value="">Ikke spesifisert</option>
                <option value="BUILDING">Bygg</option>
                <option value="CONSTRUCTION">Anlegg</option>
              </select>
            ) : (
              <span className={`badge ${values.educationField ? 'badge-secondary' : 'badge-neutral'}`}>
                {values.educationField ? EDUCATION_LABELS[values.educationField] : 'Ikke spesifisert'}
              </span>
            )}
          </div>

          {/* Tittel */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="label">Prosjekttittel</span>
              <EditBtn field="title" {...editProps} />
            </div>
            {activeField === 'title' ? (
              <input type="text" className="input" value={values.title} onChange={(e) => set('title')(e.target.value)} />
            ) : (
              <p className="heading-3">{values.title}</p>
            )}
          </div>

          {/* Beskrivelse */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="label">Beskrivelse</span>
              <EditBtn field="description" {...editProps} />
            </div>
            {activeField === 'description' ? (
              <textarea className="input min-h-30" value={values.description} onChange={(e) => set('description')(e.target.value)} />
            ) : (
              <p className="body-text whitespace-pre-wrap">
                {values.description || <span className="italic text-text-faint">Ingen beskrivelse</span>}
              </p>
            )}
          </div>

          {/* Budsjett */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="label">Budsjettramme</span>
              <EditBtn field="budget" {...editProps} />
            </div>
            {activeField === 'budget' ? (
              <PriceRange
                min={values.minPrice}
                max={values.maxPrice}
                onChange={(lo, hi) => setValues(prev => ({ ...prev, minPrice: lo, maxPrice: hi }))}
              />
            ) : (
              <p className="heading-4">
                {Number(values.minPrice).toLocaleString('nb-NO')} kr – {Number(values.maxPrice).toLocaleString('nb-NO')} kr
              </p>
            )}
          </div>
        </section>

        {/* ── Kontaktinformasjon ───────────────────────────── */}
        <section className="card">
          <h3 className="label border-b border-border pb-3 block">Kontaktinformasjon</h3>

          <div className="divide-y divide-border">

            {/* Navn */}
            <div className="py-3 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="label">Navn</span>
                <EditBtn field="name" {...editProps} />
              </div>
              {activeField === 'name' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input type="text" className="input" placeholder="Fornavn"  value={values.clientForename} onChange={(e) => set('clientForename')(e.target.value)} />
                  <input type="text" className="input" placeholder="Etternavn" value={values.clientSurname}  onChange={(e) => set('clientSurname')(e.target.value)} />
                </div>
              ) : (
                <p className="body-text font-semibold text-text">{values.clientForename} {values.clientSurname}</p>
              )}
            </div>

            {/* E-post */}
            <div className="py-3 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="label">E-post</span>
                <EditBtn field="email" {...editProps} />
              </div>
              {activeField === 'email' ? (
                <input type="email" className="input" value={values.clientEmail} onChange={(e) => set('clientEmail')(e.target.value)} />
              ) : (
                <p className="body-text">{values.clientEmail}</p>
              )}
            </div>

            {/* Telefon */}
            <div className="py-3 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="label">Telefon</span>
                <EditBtn field="phone" {...editProps} />
              </div>
              {activeField === 'phone' ? (
                <PhoneInputWithCountrySelect
                  className="input"
                  international
                  defaultCountry="NO"
                  country={phoneCountry}
                  onCountryChange={(c) => setPhoneCountry(c ?? 'NO')}
                  value={(values.clientPhone || undefined) as E164Number | undefined}
                  onChange={(v) => set('clientPhone')(v ?? '')}
                />
              ) : (
                <p className="body-text">{values.clientPhone}</p>
              )}
            </div>

            {/* Organisasjon */}
            {hasOrg && (
              <div className="py-3 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="label">Organisasjon</span>
                  <EditBtn field="org" {...editProps} />
                </div>
                {activeField === 'org' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="label">Navn</label>
                      <input type="text" className="input" placeholder="Firma AS" value={values.organizationName} onChange={(e) => set('organizationName')(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <label className="label">Org.nummer</label>
                      <input
                        type="text"
                        className="input"
                        placeholder="123456789"
                        value={values.organizationNumber}
                        onChange={(e) => set('organizationNumber')(e.target.value.replace(/\D/g, '').slice(0, 9))}
                      />
                    </div>
                  </div>
                ) : (
                  <p className="body-text">
                    {values.organizationName || '–'}
                    {values.organizationNumber && (
                      <span className="text-text-faint text-sm ml-2">· Org.nr. {values.organizationNumber}</span>
                    )}
                  </p>
                )}
              </div>
            )}

            {/* Adresse */}
            <div className="py-3 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="label">Adresse</span>
                <EditBtn field="address" {...editProps} />
              </div>
              {activeField === 'address' ? (
                <input type="text" className="input" value={values.address} onChange={(e) => set('address')(e.target.value)} />
              ) : (
                <p className="body-text">{values.address}</p>
              )}
            </div>

            {/* Fakturaadresse */}
            <div className="py-3 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="label">Fakturaadresse</span>
                <EditBtn field="billingAddress" {...editProps} />
              </div>
              {activeField === 'billingAddress' ? (
                <input type="text" className="input" value={values.billingAddress} onChange={(e) => set('billingAddress')(e.target.value)} />
              ) : (
                <p className="body-text">{values.billingAddress}</p>
              )}
            </div>

          </div>
        </section>

      </form>
    </div>
  )
}
