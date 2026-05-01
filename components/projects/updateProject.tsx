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
}

function EditBtn({ field, active, onUnlock, onLock }: EditBtnProps) {
  const editing = active === field
  return (
    <button
      type="button"
      onClick={editing ? onLock : () => onUnlock(field)}
      disabled={!editing && active !== null}
      className={`btn text-sm shrink-0 ${editing ? 'btn-success' : 'btn-outline'} disabled:opacity-40`}
    >
      {editing ? 'Lås' : 'Rediger'}
    </button>
  )
}

export default function UpdateProjectForm({ id, initialValues }: { id: string; initialValues: FormValues }) {
  const router = useRouter()
  const [values, setValues] = useState<FormValues>(initialValues)
  const [activeField, setActiveField] = useState<EditableField | null>(null)
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
    onUnlock: (f: EditableField) => setActiveField(f),
    onLock:   () => setActiveField(null),
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
    <div className="w-4/5 min-w-120 max-w-230 mx-auto py-10">
      <form onSubmit={handleSubmit} className="card-accented shadow-xl space-y-8 px-8">

        {/* Header */}
        <div className="flex items-center justify-between pt-2">
          <BackBtn />
          {activeField !== null && (
            <p className="small-text text-warning">Lås gjeldende felt for å sende inn</p>
          )}
        </div>

        <div>
          <h2 className="heading-2">Oppdater prosjekt</h2>
          <p className="text-text-faint italic mt-1 text-sm">
            Trykk «Rediger» på et felt for å endre det, og «Lås» for å bekrefte
          </p>
        </div>

        {/* ── Prosjektinformasjon ──────────────────────────── */}
        <section className="space-y-5">
          <h3 className="heading-4 border-b border-border pb-2">Prosjektinformasjon</h3>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="label">Linje</label>
              <EditBtn field="educationField" {...editProps} />
            </div>
            {activeField === 'educationField' ? (
              <select className="input" value={values.educationField} onChange={(e) => set('educationField')(e.target.value)}>
                <option value="">Ikke spesifisert</option>
                <option value="BUILDING">Bygg</option>
                <option value="CONSTRUCTION">Anlegg</option>
              </select>
            ) : (
              <p className="body-text">
                {values.educationField
                  ? EDUCATION_LABELS[values.educationField]
                  : <span className="italic text-text-faint">Ikke spesifisert</span>
                }
              </p>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="label">Prosjekttittel</label>
              <EditBtn field="title" {...editProps} />
            </div>
            {activeField === 'title' ? (
              <input type="text" className="input" value={values.title} onChange={(e) => set('title')(e.target.value)} />
            ) : (
              <p className="body-text">{values.title}</p>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="label">Beskrivelse</label>
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

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="label">Budsjettramme</label>
              <EditBtn field="budget" {...editProps} />
            </div>
            {activeField === 'budget' ? (
              <PriceRange
                min={values.minPrice}
                max={values.maxPrice}
                onChange={(lo, hi) => setValues(prev => ({ ...prev, minPrice: lo, maxPrice: hi }))}
              />
            ) : (
              <p className="body-text">
                {Number(values.minPrice).toLocaleString('nb-NO')} kr – {Number(values.maxPrice).toLocaleString('nb-NO')} kr
              </p>
            )}
          </div>
        </section>

        {/* ── Kontaktinformasjon ───────────────────────────── */}
        <section className="space-y-5">
          <h3 className="heading-4 border-b border-border pb-2">Kontaktinformasjon</h3>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="label">Navn</label>
              <EditBtn field="name" {...editProps} />
            </div>
            {activeField === 'name' ? (
              <div className="grid grid-cols-2 gap-4">
                <input type="text" className="input" placeholder="Fornavn"  value={values.clientForename} onChange={(e) => set('clientForename')(e.target.value)} />
                <input type="text" className="input" placeholder="Etternavn" value={values.clientSurname}  onChange={(e) => set('clientSurname')(e.target.value)} />
              </div>
            ) : (
              <p className="body-text">{values.clientForename} {values.clientSurname}</p>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="label">E-post</label>
              <EditBtn field="email" {...editProps} />
            </div>
            {activeField === 'email' ? (
              <input type="email" className="input" value={values.clientEmail} onChange={(e) => set('clientEmail')(e.target.value)} />
            ) : (
              <p className="body-text">{values.clientEmail}</p>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="label">Telefon</label>
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
        </section>

        {/* ── Organisasjon (vises kun hvis oppgitt) ────────── */}
        {hasOrg && (
          <section className="space-y-5">
            <h3 className="heading-4 border-b border-border pb-2">Organisasjon</h3>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="label">Detaljer</label>
                <EditBtn field="org" {...editProps} />
              </div>
              {activeField === 'org' ? (
                <div className="grid grid-cols-2 gap-4">
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
                <div className="flex gap-6 flex-wrap">
                  <p className="body-text">{values.organizationName || <span className="italic text-text-faint">–</span>}</p>
                  {values.organizationNumber && <p className="body-text text-text-muted">Org.nr. {values.organizationNumber}</p>}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── Adresser ─────────────────────────────────────── */}
        <section className="space-y-5">
          <h3 className="heading-4 border-b border-border pb-2">Adresser</h3>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="label">Adresse</label>
              <EditBtn field="address" {...editProps} />
            </div>
            {activeField === 'address' ? (
              <input type="text" className="input" value={values.address} onChange={(e) => set('address')(e.target.value)} />
            ) : (
              <p className="body-text">{values.address}</p>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="label">Fakturaadresse</label>
              <EditBtn field="billingAddress" {...editProps} />
            </div>
            {activeField === 'billingAddress' ? (
              <input type="text" className="input" value={values.billingAddress} onChange={(e) => set('billingAddress')(e.target.value)} />
            ) : (
              <p className="body-text">{values.billingAddress}</p>
            )}
          </div>
        </section>

        {/* ── Send ─────────────────────────────────────────── */}
        <button
          type="submit"
          disabled={submitting || activeField !== null}
          className="btn btn-primary w-full mb-2 disabled:opacity-50"
        >
          {submitting ? 'Lagrer...' : 'Oppdater prosjekt'}
        </button>

      </form>
    </div>
  )
}
