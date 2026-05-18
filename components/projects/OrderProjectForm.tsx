"use client"

import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { createProject } from '@/actions/projects'
import PhoneInputWithCountrySelect from 'react-phone-number-input'
import { parsePhoneNumberWithError } from 'libphonenumber-js'
import type { E164Number, CountryCode } from 'libphonenumber-js'
import OrgNumberInput from '@/components/shared/input/orgNumberInput'
import AddressInput from '@/components/shared/input/address-input'
import PriceRange from '@/components/shared/input/price-range'
import { ProjectRequestPage1Schema, ProjectRequestPage2Schema } from '@/app/lib/schemas'
import { FaLink } from 'react-icons/fa'
import BackBtn from '@/components/shared/BackBtn'

type IdentityType = 'private' | 'organization' | ''

interface Props {
  onSuccess: (data: { id: string; email: string }) => void
}

export default function OrderProjectForm({ onSuccess }: Props) {
  const [page,      setPage]      = useState(0)
  const [sliding,   setSliding]   = useState(false)
  const [slideDir,  setSlideDir]  = useState<'left' | 'right'>('left')
  // Page 1 — contact info
  const [identityType,  setIdentityType]  = useState<IdentityType>('')
  const [forename,      setForename]      = useState('')
  const [surname,       setSurname]       = useState('')
  const [email,         setEmail]         = useState('')
  const [phone,         setPhone]         = useState<E164Number | undefined>()
  const [phoneCountry,  setPhoneCountry]  = useState<CountryCode>('NO')
  const [orgName,       setOrgName]       = useState('')
  const [orgNumber,     setOrgNumber]     = useState('')
  const [address,       setAddress]       = useState('')
  const [billingAddress, setBillingAddress] = useState('')
  const [sameAsAddress, setSameAsAddress]  = useState(false)

  // Page 2 — project info
  const [educationField, setEducationField] = useState('')
  const [title,          setTitle]          = useState('')
  const [description,    setDescription]    = useState('')
  const [minBudget,      setMinBudget]      = useState('0')
  const [maxBudget,      setMaxBudget]      = useState('500000')

  // Scroll refs
  const forenameRef        = useRef<HTMLDivElement>(null)
  const emailRef           = useRef<HTMLDivElement>(null)
  const addressRef         = useRef<HTMLDivElement>(null)
  const orgNameRef         = useRef<HTMLDivElement>(null)
  const educationFieldRef  = useRef<HTMLDivElement>(null)
  const titleRef           = useRef<HTMLDivElement>(null)

  // Whether enough page-1 fields are filled to reveal the main form section
  const showMainFields =
    (identityType === 'private'       && !!educationField) ||
    (identityType === 'organization'  && !!orgName)

  // ── Navigation ────────────────────────────────────────────────────────────

  function navigate(to: number) {
    setSlideDir(to > page ? 'left' : 'right')
    setSliding(true)
    setTimeout(() => { setPage(to); setSliding(false) }, 300)
  }

  // ── Page 1 submit ─────────────────────────────────────────────────────────

  function handleNext(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    const result = ProjectRequestPage1Schema.safeParse({
      identityType,
      clientForename:     forename,
      clientSurname:      surname,
      clientEmail:        email,
      clientPhone:        phone,
      address,
      billingAddress:     sameAsAddress ? address : billingAddress,
      organizationName:   orgName    || undefined,
      organizationNumber: orgNumber  || undefined,
    })

    if (!result.success) {
      for (const issue of result.error.issues) {
        const field = String(issue.path[0])
        if (!newErrors[field]) newErrors[field] = issue.message
      }
    }

    if (Object.keys(newErrors).length > 0) {
      toast.error(Object.values(newErrors)[0])
      const first = Object.keys(newErrors)[0]
      if (first === 'clientForename' || first === 'clientSurname') forenameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      else if (first === 'clientEmail' || first === 'clientPhone') emailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      else if (first === 'address' || first === 'billingAddress')  addressRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      else if (first === 'organizationName')                       orgNameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    navigate(1)
  }

  // ── Page 2 submit ─────────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    const result = ProjectRequestPage2Schema.safeParse({
      educationField,
      title,
      description,
      minPrice: minBudget || '0',
      maxPrice: maxBudget || '0',
    })

    if (!result.success) {
      for (const issue of result.error.issues) {
        const field = String(issue.path[0])
        if (!newErrors[field]) newErrors[field] = issue.message
      }
    }

    if (Object.keys(newErrors).length > 0) {
      toast.error(Object.values(newErrors)[0])
      if (newErrors.educationField) {
        // educationField lives on page 1 — navigate back then scroll
        navigate(0)
        setTimeout(() => educationFieldRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 350)
      } else if (newErrors.title) {
        titleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    try {
      const { id } = await createProject({
        educationField,
        title,
        description,
        minPrice:           minBudget || '0',
        maxPrice:           maxBudget || '0',
        clientForename:     forename,
        clientSurname:      surname,
        clientEmail:        email,
        clientPhone:        phone,
        organizationName:   orgName   || undefined,
        organizationNumber: orgNumber || undefined,
        address,
        billingAddress:     sameAsAddress ? address : billingAddress,
      })
      localStorage.setItem(`project-verify-${id}`, JSON.stringify({ forename, surname, email, expiresAt: Date.now() + 60 * 60 * 1000 }))
      onSuccess({ id, email })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Noe gikk galt')
    }
  }

  // ── Slide class ───────────────────────────────────────────────────────────

  const slideClass = sliding
    ? slideDir === 'left' ? 'opacity-0 -translate-x-8' : 'opacity-0 translate-x-8'
    : 'opacity-100 translate-x-0'

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="w-4/5 min-w-120 max-w-230 mx-auto py-10 overflow-hidden">
      <div className="card-accented shadow-xl px-8 py-8 space-y-6">

        {/* Header: back btn + progress dots */}
        <div className="flex items-center justify-between">
          <BackBtn handleOnClick={page === 1 ? () => navigate(0) : undefined} />
          <div className="flex items-center gap-2 pr-2">
            <span className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${page === 0 ? 'bg-primary' : 'bg-border-strong'}`} />
            <span className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${page === 1 ? 'bg-primary' : 'bg-border-strong'}`} />
          </div>
        </div>

        {/* Sliding content */}
        <div className={`transition-all duration-300 ease-in-out ${slideClass}`}>

          {/* ── Page 1 ── */}
          {page === 0 ? (
            <form onSubmit={handleNext} className="space-y-6">

              <div className="space-y-1">
                <h2 className="heading-2">Bestill et prosjekt</h2>
                <p className="small-text">Steg 1 av 2 — Om deg</p>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${identityType ? 'max-h-8 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                  <p className="small-text pt-1">
                    Feltene merket med <span className="text-error">*</span> må fylles ut
                  </p>
                </div>
              </div>

              {/* Identity toggle */}
              <div className="space-y-2">
                <label className="label">Jeg er en</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIdentityType('private')}
                    className={`btn flex-1 transition-colors duration-200 ${identityType === 'private' ? 'btn-secondary' : 'btn-outline'}`}
                  >
                    Privatperson
                  </button>
                  <button
                    type="button"
                    onClick={() => setIdentityType('organization')}
                    className={`btn flex-1 transition-colors duration-200 ${identityType === 'organization' ? 'btn-secondary' : 'btn-outline'}`}
                  >
                    Organisasjon
                  </button>
                </div>
              </div>

              {/* Linje + org number — revealed when identity is chosen */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${identityType ? 'max-h-75 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                <div>

                  <div className="space-y-1.5" ref={educationFieldRef}>
                    <label className="label">Linje <span className="text-error">*</span></label>
                    <select
                      className="input"
                      value={educationField}
                      onChange={(e) => setEducationField(e.target.value)}
                    >
                      <option value="" disabled>Velg linje</option>
                      <option value="BUILDING">Bygg</option>
                      <option value="CONSTRUCTION">Anlegg</option>
                    </select>
                  </div>

                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${identityType === 'organization' ? 'mt-6 max-h-30 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                    <div className="space-y-1.5">
                      <label className="label">Organisasjonsnummer</label>
                      <OrgNumberInput
                        inputClassName="input"
                        value={orgNumber}
                        onChange={(e) => setOrgNumber(e.target.value.replace(/\D/g, '').slice(0, 9))}
                        setEmail={setEmail}
                        setPhoneCountry={setPhoneCountry}
                        setPhone={setPhone}
                        setOrgName={setOrgName}
                        setAddress={setAddress}
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* Main contact fields — revealed when gate condition is met */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showMainFields ? 'max-h-225 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                <div>

                  {/* Org name — only for organizations */}
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${identityType === 'organization' ? 'max-h-25 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                    <div className="space-y-1.5" ref={orgNameRef}>
                      <label className="label">Organisasjonsnavn <span className="text-error">*</span></label>
                      <input
                        type="text"
                        className="input"
                        placeholder="Firma AS"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Name */}
                  <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${identityType === 'organization' ? 'mt-6' : ''}`} ref={forenameRef}>
                    <div className="space-y-1.5">
                      <label className="label">Fornavn <span className="text-error">*</span></label>
                      <input
                        type="text"
                        className="input"
                        placeholder="Ola"
                        autoComplete="given-name"
                        value={forename}
                        onChange={(e) => setForename(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="label">Etternavn <span className="text-error">*</span></label>
                      <input
                        type="text"
                        className="input"
                        placeholder="Nordmann"
                        autoComplete="family-name"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6" ref={emailRef}>
                    <div className="space-y-1.5">
                      <label className="label">E-post <span className="text-error">*</span></label>
                      <input
                        type="email"
                        className="input"
                        placeholder="ola@eksempel.no"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="label">Telefon <span className="text-error">*</span></label>
                      <PhoneInputWithCountrySelect
                        className="input"
                        international
                        defaultCountry="NO"
                        country={phoneCountry}
                        onCountryChange={(c) => setPhoneCountry(c ?? 'NO')}
                        placeholder="Telefonnummer"
                        autoComplete="tel"
                        value={phone}
                        onChange={(phoneNr) => {
                          setPhone(phoneNr)
                          if (phoneNr) {
                            try {
                              const p = parsePhoneNumberWithError(String(phoneNr))
                              if (p?.country) setPhoneCountry(p.country)
                            } catch {}
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex gap-3 items-end mt-6" ref={addressRef}>
                    <div className="flex-1 space-y-1.5">
                      <label className="label">Bestillingsadresse <span className="text-error">*</span></label>
                      <AddressInput
                        value={address}
                        onChange={(value) => setAddress(value)}
                        placeholder="Gateveien 1, 0001 Oslo"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setSameAsAddress(prev => !prev)}
                      title={sameAsAddress ? 'Koble fra' : 'Bruk samme adresse'}
                      className={`flex-none mb-px w-8 h-8 rounded-full flex items-center justify-center text-xs border transition-all duration-200 cursor-pointer ${
                        sameAsAddress
                          ? 'bg-secondary text-text-on-primary border-secondary'
                          : 'bg-bg text-text-muted border-border-strong hover:bg-surface hover:text-secondary hover:border-secondary'
                      }`}
                    >
                      <FaLink />
                    </button>
                    <div className="flex-1 space-y-1.5">
                      <label className="label">Fakturaadresse <span className="text-error">*</span></label>
                      <div onInput={() => setSameAsAddress(false)}>
                        <AddressInput
                          value={sameAsAddress ? address : billingAddress}
                          onChange={(value) => { setSameAsAddress(false); setBillingAddress(value) }}
                          placeholder="Gateveien 1, 0001 Oslo"
                        />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary w-full mt-6">
                    Neste →
                  </button>

                </div>
              </div>

            </form>

          ) : (

          /* ── Page 2 ── */
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="space-y-1">
                <h2 className="heading-2">Bestill et prosjekt</h2>
                <p className="small-text">Steg 2 av 2 — Om prosjektet</p>
                <p className="small-text pt-1">
                  Feltene merket med <span className="text-error">*</span> må fylles ut
                </p>
              </div>

              <div className="space-y-1.5" ref={titleRef}>
                <label className="label">Prosjekttittel <span className="text-error">*</span></label>
                <input
                  type="text"
                  className="input"
                  placeholder="Kort beskrivende tittel"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="label">Beskrivelse</label>
                <textarea
                  className="input min-h-30"
                  placeholder="Beskriv hva du ønsker utført"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <PriceRange
                min={minBudget}
                max={maxBudget}
                onChange={(lo, hi) => { setMinBudget(lo); setMaxBudget(hi) }}
              />

              <button type="submit" className="btn btn-primary w-full">
                Send forespørsel
              </button>

            </form>
          )}

        </div>
      </div>
    </div>
  )
}
