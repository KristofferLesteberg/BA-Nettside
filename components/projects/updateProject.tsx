"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import OrgNumberInput from '../shared/input/orgNumberInput'
import PhoneInputWithCountrySelect from 'react-phone-number-input'
import { parsePhoneNumberWithError } from 'libphonenumber-js'
import type { E164Number, CountryCode } from 'libphonenumber-js'
import PriceRange from '@/components/shared/input/price-range'
import AddressInput from '../shared/input/address-input'
import BackBtn from '@/components/shared/BackBtn'
import { usePopUp } from '@/components/shared/PopUp'
import { updateProject } from '@/actions/projects'
import { FaEdit, FaUndo } from 'react-icons/fa'

// ─── Types ────────────────────────────────────────────────────────────────────

type EditableField =
  | 'educationField' | 'title' | 'description' | 'budget'
  | 'name' | 'email' | 'phone' | 'org' | 'address' | 'billingAddress'

interface FormValues {
  educationField:     string
  title:              string
  description:        string
  minPrice:           string
  maxPrice:           string
  clientForename:     string
  clientSurname:      string
  clientEmail:        string
  clientPhone:        string
  organizationName:   string
  organizationNumber: string
  address:            string
  billingAddress:     string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const EDUCATION_LABELS: Record<string, string> = {
  BUILDING: 'Bygg',
  CONSTRUCTION: 'Anlegg',
}

// Maps each EditableField to the FormValues keys it controls.
// Add new fields here if the form grows.
const FIELD_KEYS: Record<EditableField, (keyof FormValues)[]> = {
  educationField: ['educationField'],
  title:          ['title'],
  description:    ['description'],
  budget:         ['minPrice', 'maxPrice'],
  name:           ['clientForename', 'clientSurname'],
  email:          ['clientEmail'],
  phone:          ['clientPhone'],
  org:            ['organizationName', 'organizationNumber'],
  address:        ['address'],
  billingAddress: ['billingAddress'],
}

// ─── EditBtn ──────────────────────────────────────────────────────────────────

interface EditBtnProps {
  field:    EditableField
  active:   EditableField | null
  onUnlock: (f: EditableField) => void
  onLock:   () => void
  onCancel: () => void
  changed?: boolean
  onUndo?:  () => void
}

function EditBtn({ field, active, onUnlock, onLock, onCancel, changed, onUndo }: EditBtnProps) {
  const editing = active === field
  const blocked = !editing && active !== null

  // key="editing"/"view" forces React to unmount+remount on mode switch,
  // so animate-fade-in triggers in both directions.
  if (editing) {
    return (
      <div key="editing" className="flex gap-2 animate-fade-in">
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
    <div key="view" className="flex gap-1.5 animate-fade-in">
      <button
        type="button"
        onClick={() => onUnlock(field)}
        disabled={blocked}
        className="btn btn-ghost p-1.5 py-1 text-sm gap-1 transition-opacity duration-150 disabled:opacity-30"
      >
        <FaEdit className="text-xs" /> Rediger
      </button>
      {/* Always rendered so CSS transition handles both appear and disappear. */}
      <button
        type="button"
        onClick={onUndo}
        disabled={blocked}
        aria-hidden={!changed}
        className={`btn btn-ghost p-1.5 py-1 text-sm gap-1 text-warning transition-all duration-200 ${
          changed ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
        }`}
      >
        <FaUndo className="text-xs" /> Angre
      </button>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function UpdateProjectForm({
  id,
  initialValues,
}: {
  id: string
  initialValues: FormValues
}) {
  const router  = useRouter()
  const popup   = usePopUp()

  const [baseValues,    setBaseValues]    = useState<FormValues>(initialValues)
  const [values,        setValues]        = useState<FormValues>(initialValues)
  const [activeField,   setActiveField]   = useState<EditableField | null>(null)
  const [snapshot,      setSnapshot]      = useState<FormValues | null>(null)
  const [submitting,    setSubmitting]    = useState(false)
  const [sameAsAddress, setSameAsAddress] = useState(
    () => !!initialValues.billingAddress && initialValues.billingAddress === initialValues.address
  )
  const [phoneCountry,  setPhoneCountry]  = useState<CountryCode>(() => {
    try {
      return (parsePhoneNumberWithError(initialValues.clientPhone).country as CountryCode) ?? 'NO'
    } catch { return 'NO' }
  })

  // ── Derived ──────────────────────────────────────────────────────────────

  const hasChanges = (Object.keys(values) as (keyof FormValues)[]).some(
    k => values[k] !== baseValues[k]
  )

  const isFieldChanged = (field: EditableField) =>
    FIELD_KEYS[field].some(k => values[k] !== baseValues[k])

  // ── Helpers ───────────────────────────────────────────────────────────────

  const set = (key: keyof FormValues) => (val: string) =>
    setValues(prev => ({ ...prev, [key]: val }))

  const editProps = {
    active:   activeField,
    onUnlock: (f: EditableField) => { setSnapshot({ ...values }); setActiveField(f) },
    onLock:   () => { setSnapshot(null); setActiveField(null) },
    onCancel: () => { if (snapshot) setValues(snapshot); setSnapshot(null); setActiveField(null) },
  }

  function undoField(field: EditableField) {
    setValues(prev => {
      const next = { ...prev }
      FIELD_KEYS[field].forEach(k => { next[k] = baseValues[k] })
      return next
    })
    if (field === 'phone') {
      try {
        const p = parsePhoneNumberWithError(baseValues.clientPhone)
        setPhoneCountry((p.country as CountryCode) ?? 'NO')
      } catch { setPhoneCountry('NO') }
    }
    if (field === 'address' || field === 'billingAddress') {
      setSameAsAddress(!!baseValues.billingAddress && baseValues.billingAddress === baseValues.address)
    }
  }

  function discardAll() {
    setValues({ ...baseValues })
    setSameAsAddress(!!baseValues.billingAddress && baseValues.billingAddress === baseValues.address)
    try {
      const p = parsePhoneNumberWithError(baseValues.clientPhone)
      setPhoneCountry((p.country as CountryCode) ?? 'NO')
    } catch { setPhoneCountry('NO') }
    setActiveField(null)
    setSnapshot(null)
  }

  // ── Save ──────────────────────────────────────────────────────────────────

  async function save(): Promise<boolean> {
    const effectiveBilling = sameAsAddress ? values.address : values.billingAddress
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
        billingAddress:     effectiveBilling,
      })
      setBaseValues({ ...values, billingAddress: effectiveBilling })
      toast.success('Prosjekt oppdatert')
      return true
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Kunne ikke oppdatere prosjektet')
      return false
    } finally {
      setSubmitting(false)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (activeField !== null) return
    await save()
  }

  // ── Navigation guard ──────────────────────────────────────────────────────

  function handleBack() {
    if (!hasChanges) { router.push('/'); return }
    popup.open({
      title:    'Ulagrede endringer',
      subtitle: 'Du har endringer som ikke er lagret. Hva vil du gjøre?',
      yesLabel: 'Lagre og forlat',
      noLabel:  'Forkast og forlat',
      onYes: async () => { const ok = await save(); if (ok) router.push('/') },
      onNo:  () => router.push('/'),
    })
  }

  function handleDiscardAll() {
    popup.open({
      title:    'Forkast alle endringer?',
      subtitle: 'Dette vil tilbakestille alle felt til opprinnelige verdier.',
      yesLabel: 'Forkast endringer',
      noLabel:  'Avbryt',
      onYes:    discardAll,
    })
  }

  // ── Render ────────────────────────────────────────────────────────────────

  const hasOrg = !!(values.organizationName || values.organizationNumber)

  return (
    <>
      {popup.element}

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10 pb-24">
        <form id="update-project-form" onSubmit={handleSubmit} className="space-y-6">

          {/* ── Header ─────────────────────────────────────────── */}
          <BackBtn handleOnClick={handleBack} text='← Forside' />
          <h1 className="heading-1">Prosjektforespørsel</h1>

          {/* ── Prosjektinformasjon ─────────────────────────────── */}
          <section className="card space-y-6">
            <h2 className="label border-b border-border pb-3 block">Prosjektinformasjon</h2>

            {/* Linje */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="label">Linje</span>
                <EditBtn field="educationField" {...editProps}
                  changed={isFieldChanged('educationField')} onUndo={() => undoField('educationField')} />
              </div>
              {activeField === 'educationField' ? (
                <select className="input animate-fade-in" value={values.educationField} onChange={(e) => set('educationField')(e.target.value)}>
                  <option value="">Ikke spesifisert</option>
                  <option value="BUILDING">Bygg</option>
                  <option value="CONSTRUCTION">Anlegg</option>
                </select>
              ) : (
                <span className={`badge animate-fade-in ${values.educationField ? 'badge-secondary' : 'badge-neutral'}`}>
                  {values.educationField ? EDUCATION_LABELS[values.educationField] : 'Ikke spesifisert'}
                </span>
              )}
            </div>

            {/* Tittel */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="label">Prosjekttittel</span>
                <EditBtn field="title" {...editProps}
                  changed={isFieldChanged('title')} onUndo={() => undoField('title')} />
              </div>
              {activeField === 'title' ? (
                <input type="text" className="input animate-fade-in" value={values.title} onChange={(e) => set('title')(e.target.value)} />
              ) : (
                <p className="heading-3 animate-fade-in">{values.title}</p>
              )}
            </div>

            {/* Beskrivelse */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="label">Beskrivelse</span>
                <EditBtn field="description" {...editProps}
                  changed={isFieldChanged('description')} onUndo={() => undoField('description')} />
              </div>
              {activeField === 'description' ? (
                <textarea className="input min-h-30 animate-fade-in" value={values.description} onChange={(e) => set('description')(e.target.value)} />
              ) : (
                <p className="body-text whitespace-pre-wrap animate-fade-in">
                  {values.description || <span className="italic text-text-faint">Ingen beskrivelse</span>}
                </p>
              )}
            </div>

            {/* Budsjett */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="label">Budsjettramme</span>
                <EditBtn field="budget" {...editProps}
                  changed={isFieldChanged('budget')} onUndo={() => undoField('budget')} />
              </div>
              {activeField === 'budget' ? (
                <div className="animate-fade-in">
                  <PriceRange
                    min={values.minPrice}
                    max={values.maxPrice}
                    onChange={(lo, hi) => setValues(prev => ({ ...prev, minPrice: lo, maxPrice: hi }))}
                  />
                </div>
              ) : (
                <p className="heading-4 animate-fade-in">
                  {Number(values.minPrice).toLocaleString('nb-NO')} kr – {Number(values.maxPrice).toLocaleString('nb-NO')} kr
                </p>
              )}
            </div>
          </section>

          {/* ── Kontaktinformasjon ──────────────────────────────── */}
          <section className="card">
            <h3 className="label border-b border-border pb-3 block">Kontaktinformasjon</h3>

            <div className="divide-y divide-border">

              {/* Navn */}
              <div className="py-3 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="label">Navn</span>
                  <EditBtn field="name" {...editProps}
                    changed={isFieldChanged('name')} onUndo={() => undoField('name')} />
                </div>
                {activeField === 'name' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in">
                    <input type="text" className="input" placeholder="Fornavn"   value={values.clientForename} onChange={(e) => set('clientForename')(e.target.value)} />
                    <input type="text" className="input" placeholder="Etternavn" value={values.clientSurname}  onChange={(e) => set('clientSurname')(e.target.value)} />
                  </div>
                ) : (
                  <p className="body-text font-semibold text-text animate-fade-in">{values.clientForename} {values.clientSurname}</p>
                )}
              </div>

              {/* E-post */}
              <div className="py-3 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="label">E-post</span>
                  <EditBtn field="email" {...editProps}
                    changed={isFieldChanged('email')} onUndo={() => undoField('email')} />
                </div>
                {activeField === 'email' ? (
                  <input type="email" className="input animate-fade-in" value={values.clientEmail} onChange={(e) => set('clientEmail')(e.target.value)} />
                ) : (
                  <p className="body-text animate-fade-in">{values.clientEmail}</p>
                )}
              </div>

              {/* Telefon */}
              <div className="py-3 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="label">Telefon</span>
                  <EditBtn field="phone" {...editProps}
                    changed={isFieldChanged('phone')} onUndo={() => undoField('phone')} />
                </div>
                {activeField === 'phone' ? (
                  <div className="animate-fade-in">
                    <PhoneInputWithCountrySelect
                      className="input"
                      international
                      defaultCountry="NO"
                      country={phoneCountry}
                      onCountryChange={(c) => setPhoneCountry(c ?? 'NO')}
                      value={(values.clientPhone || undefined) as E164Number | undefined}
                      onChange={(v) => set('clientPhone')(v ?? '')}
                    />
                  </div>
                ) : (
                  <p className="body-text animate-fade-in">{values.clientPhone}</p>
                )}
              </div>

              {/* Organisasjon */}
              {hasOrg && (
                <div className="py-3 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="label">Organisasjon</span>
                    <EditBtn field="org" {...editProps}
                      changed={isFieldChanged('org')} onUndo={() => undoField('org')} />
                  </div>
                  {activeField === 'org' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in">
                      <div className="space-y-1">
                        <label className="label">Navn</label>
                        <input type="text" className="input" placeholder="Firma AS" value={values.organizationName} onChange={(e) => set('organizationName')(e.target.value)} />
                      </div>
                      <div className="space-y-1">
                        <label className="label">Org.nummer</label>
                        <OrgNumberInput
                          inputClassName="input"
                          value={values.organizationNumber}
                          onChange={(e) => set('organizationNumber')(e.target.value.replace(/\D/g, '').slice(0, 9))}
                          setEmail={set('clientEmail')}
                          setPhoneCountry={setPhoneCountry}
                          setPhone={(v) => set('clientPhone')(v)}
                          setOrgName={set('organizationName')}
                          setAddress={set('address')}
                          onSuccess={editProps.onLock}
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="body-text animate-fade-in">
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
                  <EditBtn field="address" {...editProps}
                    changed={isFieldChanged('address')} onUndo={() => undoField('address')} />
                </div>
                {activeField === 'address' ? (
                  <div className="animate-fade-in">
                    <AddressInput value={values.address} onChange={set('address')} />
                  </div>
                ) : (
                  <p className="body-text animate-fade-in">{values.address}</p>
                )}
              </div>

              {/* Fakturaadresse */}
              <div className="py-3 space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="label">Fakturaadresse</span>
                    <EditBtn
                      field="billingAddress"
                      {...editProps}
                      onUnlock={(f) => { setSameAsAddress(false); editProps.onUnlock(f) }}
                      changed={isFieldChanged('billingAddress')}
                      onUndo={() => undoField('billingAddress')}
                    />
                  </div>
                  {activeField === 'billingAddress' && (
                    <label className="flex items-center gap-1.5 cursor-pointer select-none animate-fade-in">
                      <input
                        type="checkbox"
                        checked={sameAsAddress}
                        onChange={(e) => setSameAsAddress(e.target.checked)}
                        className="w-3.5 h-3.5 accent-primary cursor-pointer"
                      />
                      <span className="small-text">Samme som adresse</span>
                    </label>
                  )}
                </div>
                {activeField === 'billingAddress' ? (
                  <div className="animate-fade-in" onInput={() => setSameAsAddress(false)}>
                    <AddressInput
                      value={sameAsAddress ? values.address : values.billingAddress}
                      onChange={(val) => { setSameAsAddress(false); set('billingAddress')(val) }}
                    />
                  </div>
                ) : (
                  <p className="body-text animate-fade-in">{sameAsAddress ? values.address : values.billingAddress}</p>
                )}
              </div>

            </div>
          </section>

        </form>
      </div>

      {/* ── Sticky footer ──────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-10 bg-surface border-t border-border shadow-t-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3 flex-wrap">

          {/* Left slot: warning text and discard button share the same grid cell
              so neither causes a layout shift when the other appears/disappears. */}
          <div className="grid items-center">
            <p className={`row-start-1 col-start-1 small-text text-warning whitespace-nowrap transition-all duration-200 ${
              activeField !== null ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'
            }`}>
              Lagre eller avbryt gjeldende felt for å sende inn
            </p>
            <button
              type="button"
              onClick={handleDiscardAll}
              className={`row-start-1 col-start-1 btn btn-outline text-sm whitespace-nowrap transition-all duration-200 ${
                hasChanges && activeField === null ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'
              }`}
            >
              Forkast alle endringer
            </button>
          </div>

          <button
            type="submit"
            form="update-project-form"
            disabled={submitting || activeField !== null || !hasChanges}
            className="btn btn-primary transition-opacity duration-200 disabled:opacity-50"
          >
            {submitting ? 'Lagrer...' : 'Lagre endringer'}
          </button>
        </div>
      </div>
    </>
  )
}
