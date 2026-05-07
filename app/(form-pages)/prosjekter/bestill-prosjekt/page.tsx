"use client"

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { createProject } from '@/actions/projects'
import PhoneInputWithCountrySelect from 'react-phone-number-input'
import { parsePhoneNumberWithError } from 'libphonenumber-js'
import type { E164Number, CountryCode } from 'libphonenumber-js'
import AddressInput from '@/components/shared/input/address-input'
import PriceRange from '@/components/shared/input/price-range'
import { ProjectRequestPage1Schema, ProjectRequestPage2Schema } from '@/app/lib/schemas'
import { IoSearch } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import BackBtn from '@/components/shared/BackBtn'

type IdentityType = "private" | "organization" | ""

export default function RequestProject() {
  const router = useRouter()
  const [page, setPage] = useState(0)
  const [sliding, setSliding] = useState(false)
  const [slideDir, setSlideDir] = useState<"left" | "right">("left")
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Page 1 — contact info
  const [identityType, setIdentityType] = useState<IdentityType>("")
  const [forename, setForename] = useState("")
  const [surname, setSurname] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState<E164Number | undefined>()
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>("NO")
  const [orgName, setOrgName] = useState("")
  const [orgNumber, setOrgNumber] = useState("")
  const [address, setAddress] = useState("")
  const [billingAddress, setBillingAddress] = useState("")
  const [sameAsAddress, setSameAsAddress] = useState(false)

  // Page 2 — project info
  const [educationField, setEducationField] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [minBudget, setMinBudget] = useState("0")
  const [maxBudget, setMaxBudget] = useState("500000")

  // Scroll refs
  const forenameRef = useRef<HTMLDivElement>(null)
  const emailRef = useRef<HTMLDivElement>(null)
  const addressRef = useRef<HTMLDivElement>(null)
  const orgNameRef = useRef<HTMLDivElement>(null)
  const educationFieldRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)




  const getOrgInfo = async (orgNumber: number) => {
    try {
      const res = await fetch(`https://data.brreg.no/enhetsregisteret/api/enheter/${orgNumber}`)
      if(!res) {
        toast.error("Fant ikke organisasjonen")
        return
      }
      const data = await res.json()
      if(data.epostadresse) {
        setEmail(data.epostadresse)
      }
      
      if(data.telefon) {
        setPhoneCountry("NO")
        const e164 = `+47${data.telefon.replace(/\s/g, "")}` as E164Number
        setPhone(e164)
      }

      setOrgName(data.navn)
      if(data.forretningsadresse) {
        setAddress(`${data.forretningsadresse.adresse[0]}, ${data.forretningsadresse.postnummer} ${data.forretningsadresse.poststed}`)
      }
      
    } catch(error) {
      console.error(error)
    }

  }
  function clearError(field: string) {
    setErrors(prev => { const next = { ...prev }; delete next[field]; return next })
  }

  const inputClass = (field: string) => errors[field] ? 'input border-error' : 'input'

  function navigate(to: number) {
    setSlideDir(to > page ? "left" : "right")
    setSliding(true)
    setTimeout(() => {
      setPage(to)
      setSliding(false)
    }, 300)
  }


  function handleNext(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const newErrors: Record<string, string> = {}

    const result = ProjectRequestPage1Schema.safeParse({
      identityType,
      clientForename: forename,
      clientSurname: surname,
      clientEmail: email,
      clientPhone: phone,
      address,
      billingAddress: sameAsAddress ? address : billingAddress,
      organizationName: orgName || undefined,
      organizationNumber: orgNumber || undefined,
    })
    if (!result.success) {
      for (const issue of result.error.issues) {
        const field = String(issue.path[0])
        if (!newErrors[field]) newErrors[field] = issue.message
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    navigate(1)
  }

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
      setErrors(newErrors)
      if (newErrors.educationField) educationFieldRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      else if (newErrors.title) titleRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }

    try {
      await createProject({
        educationField,
        title,
        description,
        minPrice: minBudget || '0',
        maxPrice: maxBudget || '0',
        clientForename: forename,
        clientSurname: surname,
        clientEmail: email,
        clientPhone: phone,
        organizationName: orgName || undefined,
        organizationNumber: orgNumber || undefined,
        address,
        billingAddress: sameAsAddress ? address : billingAddress,
      })
      toast.success('Forespørsel sendt!')
      router.push('/')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Noe gikk galt')
    }
  }

  const slideClass = sliding
    ? slideDir === "left"
      ? "opacity-0 -translate-x-8"
      : "opacity-0 translate-x-8"
    : "opacity-100 translate-x-0"




    

  return (
    <div className="w-4/5 min-w-120 max-w-230 mx-auto py-10 overflow-hidden">
      <div className="card-accented shadow-xl space-y-6 px-8">

        <div className="flex items-center justify-between">
          <BackBtn handleOnClick={page === 1 ? () => navigate(0) : undefined} />

          <div className="flex items-center gap-2 pr-2">
            <span className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${page === 0 ? 'bg-primary' : 'bg-border-strong'}`} />
            <span className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${page === 1 ? 'bg-primary' : 'bg-border-strong'}`} />
          </div> 
        </div>

        <div className={`transition-all duration-300 ease-in-out ${slideClass}`}>
          {page === 0 ? (
            <form onSubmit={handleNext} className={`${identityType ? 'space-y-6' : 'space-y-3'} transition-all duration-500 ease-in-out`}>
              <div className="space-y-3">
                <h2 className="heading-2">Bestill et prosjekt</h2>
                <p className="text-text-faint italic mt-1 text-sm">Steg 1 av 2 — Om deg</p>
                <p className={`text-text-faint italic -mt-2 transition-all duration-500 ease-in-out ${identityType ? 'max-h-200 opacity-100' : 'max-h-0 opacity-0'}`}>
                Feltene merket med <span className="text-error">*</span> må fylles ut før du kan fortsette
              </p>
              </div>

              {/* Identity type */}
              <div className="space-y-2">
                <label className="label">Jeg er en</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIdentityType("private")}
                    className={`btn flex-1 ${identityType === "private" ? "btn-secondary" : "btn-outline"}`}
                  >
                    Privatperson
                  </button>
                  <button
                    type="button"
                    onClick={() => setIdentityType("organization")}
                    className={`btn flex-1 ${identityType === "organization" ? "btn-secondary" : "btn-outline"}`}
                  >
                    Organisasjon
                  </button>
                </div>
              </div>
              {/* Education field / category */}
              <div className={`space-y-1 ${identityType ? 'max-h-200 opacity-100' : 'max-h-0 opacity-0'}`} ref={educationFieldRef}>
                <label className="label">Linje <span className="text-error">*</span></label>
                <select
                  className={inputClass("educationField")}
                  value={educationField}
                  onChange={(e) => { setEducationField(e.target.value); clearError("educationField") }}
                >
                  <option value="" disabled className="text-text-muted">Velg linje</option>
                  <option value="BUILDING">Bygg</option>
                  <option value="CONSTRUCTION">Anlegg</option>
                </select>
                {errors.educationField && <p className="text-error text-sm">{errors.educationField}</p>}
              </div>

              <div className={`space-y-1 ${identityType == "organization" ? 'max-h-200 opacity-100' : 'max-h-0 opacity-0'}`}>
                <label className="label">Organisasjonsnummer  </label>
                <div className='relative flex-1 justify-center align-middle'>
                  <input
                    type="text"
                    className={`${inputClass("organizationNumber")}`}
                    placeholder="123 456 789"
                    value={orgNumber}
                    onChange={(e) => { setOrgNumber(e.target.value.replace(/\D/g, "").slice(0, 9)); clearError("organizationNumber") }}
                  />
                  <button
                    type='button'
                    onClick={() => getOrgInfo(Number(orgNumber))}
                    className="absolute right-1 mt-auto mb-auto mr-3 h-full"
                  >
                    <IoSearch className='cursor-pointer' />
                  </button>
                </div>
                {errors.organizationNumber && <p className="text-error text-sm">{errors.organizationNumber}</p>}
              </div>

              {/* Revealed after identity is chosen */}
              <div className={`space-y-6 transition-all duration-500 ease-in-out ${(identityType === "private" && educationField) || (identityType === "organization" && orgName) ? 'max-h-200 opacity-100' : 'max-h-0 opacity-0'}`}>
                {/* Organization fields — only if org */}
                <div className={`overflow-hidden transition-all duration-400 ease-in-out ${identityType === "organization" ? 'max-h-50 opacity-100' : 'max-h-0 opacity-0'}`}>
                  
                  <div className="grid grid-cols-1 gap-4" ref={orgNameRef}>
                    <div className="space-y-1">
                      <label className="label">Organisasjonsnavn <span className="text-error">*</span></label>
                      <input
                        type="text"
                        className={inputClass("organizationName")}
                        placeholder="Firma AS"
                        value={orgName}
                        onChange={(e) => { setOrgName(e.target.value); clearError("organizationName") }}
                      />
                      {errors.organizationName && <p className="text-error text-sm">{errors.organizationName}</p>}
                    </div>
                  </div>
                </div>
                {/* Name */}
                <div className="grid grid-cols-2 gap-4" ref={forenameRef}>
                  <div className="space-y-1">
                    <label className="label">Fornavn <span className="text-error">*</span></label>
                    <input
                      type="text"
                      className={inputClass("clientForename")}
                      placeholder="Ola"
                      value={forename}
                      onChange={(e) => { setForename(e.target.value); clearError("clientForename") }}
                    />
                    {errors.clientForename && <p className="text-error text-sm">{errors.clientForename}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="label">Etternavn <span className="text-error">*</span></label>
                    <input
                      type="text"
                      className={inputClass("clientSurname")}
                      placeholder="Nordmann"
                      value={surname}
                      onChange={(e) => { setSurname(e.target.value); clearError("clientSurname") }}
                    />
                    {errors.clientSurname && <p className="text-error text-sm">{errors.clientSurname}</p>}
                  </div>
                </div>

                {/* Contact */}
                <div className="grid grid-cols-2 gap-4" ref={emailRef}>
                  <div className="space-y-1">
                    <label className="label">E-post <span className="text-error">*</span></label>
                    <input
                      type="email"
                      className={inputClass("clientEmail")}
                      placeholder="ola@eksempel.no"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); clearError("clientEmail") }}
                    />
                    {errors.clientEmail && <p className="text-error text-sm">{errors.clientEmail}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="label">Telefon <span className="text-error">*</span></label>
                    <PhoneInputWithCountrySelect
                      className={inputClass("clientPhone")}
                      international={true}
                      defaultCountry='NO'
                      country={phoneCountry}
                      onCountryChange={(c) => setPhoneCountry(c ?? "NO")}
                      placeholder="Telefonnummer"
                      value={phone}
                      onChange={(phoneNr) => {
                        setPhone(phoneNr)
                        if (phoneNr) {
                          try { const p = parsePhoneNumberWithError(String(phoneNr)); if (p?.country) setPhoneCountry(p.country) } catch {}
                        }
                        clearError("clientPhone")
                      }}
                    />
                    {errors.clientPhone && <p className="text-error text-sm">{errors.clientPhone}</p>}
                  </div>
                </div>

                {/* Address */}
                <div className="flex gap-3 items-end" ref={addressRef}>
                  <div className="flex-1 space-y-1">
                    <label className="label">Bestillingsadresse <span className="text-error">*</span></label>
                    <AddressInput
                      value={address}
                      onChange={(value) => { setAddress(value); clearError("address") }}
                      placeholder="Gateveien 1, 0001 Oslo"
                    />
                    {errors.address && <p className="text-error text-sm">{errors.address}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={() => setSameAsAddress(prev => !prev)}
                    title={sameAsAddress ? 'Koble fra' : 'Bruk samme adresse'}
                    className={`flex-none w-8 h-8 rounded-full flex items-center justify-center text-xs border transition-all duration-200 cursor-pointer ${
                      sameAsAddress
                        ? 'bg-secondary text-text-on-primary border-secondary'
                        : 'bg-bg text-text-muted border-border-strong hover:bg-surface hover:text-secondary hover:border-secondary'
                    }`}
                  >
                    <FaLink />
                  </button>
                  <div className="flex-1 space-y-1">
                    <label className="label">Fakturaadresse <span className="text-error">*</span></label>
                    <div onInput={() => setSameAsAddress(false)}>
                      <AddressInput
                        value={sameAsAddress ? address : billingAddress}
                        onChange={(value) => { setSameAsAddress(false); setBillingAddress(value); clearError("billingAddress") }}
                        placeholder='Gateveien 1, 0001 Oslo'
                      />
                    </div>
                    {errors.billingAddress && <p className="text-error text-sm">{errors.billingAddress}</p>}
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-full">
                  Neste →
                </button>

              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="heading-2">Bestill et prosjekt</h2>
                <p className="text-text-faint italic mt-1 text-sm">Steg 2 av 2 — Om prosjektet</p>
              </div>
              <p className="text-text-faint italic -mt-2">
                Feltene merket med <span className="text-error">*</span> må fylles ut før du kan fortsette
              </p>

          

              {/* Title */}
              <div className="space-y-1" ref={titleRef}>
                <label className="label">Prosjekttittel <span className="text-error">*</span></label>
                <input
                  type="text"
                  className={inputClass("title")}
                  placeholder="Kort beskrivende tittel"
                  value={title}
                  onChange={(e) => { setTitle(e.target.value); clearError("title") }}
                />
                {errors.title && <p className="text-error text-sm">{errors.title}</p>}
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="label">Beskrivelse</label>
                <textarea
                  className="input min-h-[120px]"
                  placeholder="Beskriv hva du ønsker utført"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Budget range */}
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