"use client"

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

type IdentityType = "private" | "organization" | ""

export default function RequestProject() {
  const router = useRouter()
  const [page, setPage] = useState(0)
  const [sliding, setSliding] = useState(false)
  const [slideDir, setSlideDir] = useState<"left" | "right">("left")

  // Page 1 — contact info
  const [identityType, setIdentityType] = useState<IdentityType>("") // Either private or org
  const [forename, setForename] = useState("")
  const [surname, setSurname] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [orgName, setOrgName] = useState("")
  const [orgNumber, setOrgNumber] = useState("")
  const [address, setAddress] = useState("")

  // Page 2 — project info
  const [educationField, setEducationField] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [minBudget, setMinBudget] = useState("")
  const [maxBudget, setMaxBudget] = useState("")

  // Validation refs
  const identityRef = useRef<HTMLDivElement>(null)
  const forenameRef = useRef<HTMLDivElement>(null)
  const emailRef = useRef<HTMLDivElement>(null)
  const educationFieldRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

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
    if (!identityType) {
      identityRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }
    if (!forename.trim()) {
      forenameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }
    if (!email.trim()) {
      emailRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }
    navigate(1)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!educationField) {
      educationFieldRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }
    if (!title.trim()) {
      titleRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }
    // TODO: submit logic
  }

  const slideClass = sliding
    ? slideDir === "left"
      ? "opacity-0 -translate-x-8"
      : "opacity-0 translate-x-8"
    : "opacity-100 translate-x-0"

  return (
    <div className="w-4/5 min-w-120 max-w-230 mx-auto my-10 mt-32">
      <div className="card-accented shadow-xl space-y-6">

        <div className="flex items-center justify-between">
          {/* Back button — only on page 2 */}
          <button
            type="button"
            onClick={(page === 1) ? () => navigate(0) : () => router.back()}
            className="btn btn-ghost -ml-2 -mt-2 text-sm"
          >
            ← Tilbake
          </button>

          {/* Step indicator */}
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${page === 0 ? 'bg-primary' : 'bg-border-strong'}`} />
            <span className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${page === 1 ? 'bg-primary' : 'bg-border-strong'}`} />
          </div>
        </div>

        {/* Sliding content */}
        <div
          className={`transition-all duration-300 ease-in-out ${slideClass}`}
        >
          {page === 0 ? (
            <form onSubmit={handleNext} className="space-y-6">
              <div>
                <h2 className="heading-2">Bestill et prosjekt</h2>
                <p className="text-text-faint italic mt-1 text-sm">Steg 1 av 2 — Om deg</p>
              </div>
              <p className="text-text-faint italic -mt-2">
                Feltene merket med <span className="text-red-500">*</span> må fylles ut før du kan fortsette
              </p>

              {/* Identity type */}
              <div className="space-y-2" ref={identityRef}>
                <label className="label">Jeg er en *</label>
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

              {/* Name */}
              <div className="grid grid-cols-2 gap-4" ref={forenameRef}>
                <div className="space-y-1">
                  <label className="label">Fornavn *</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Ola"
                    value={forename}
                    onChange={(e) => setForename(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="label">Etternavn</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Nordmann"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </div>
              </div>

              {/* Contact */}
              <div className="grid grid-cols-2 gap-4" ref={emailRef}>
                <div className="space-y-1">
                  <label className="label">E-post *</label>
                  <input
                    type="email"
                    className="input"
                    placeholder="ola@eksempel.no"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="label">Telefon</label>
                  <input
                    type="tel"
                    className="input"
                    placeholder="+47 000 00 000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9+\s]/g, ""))}
                  />
                </div>
              </div>

              {/* Organization fields — only if org */}
              {identityType === "organization" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="label">Organisasjonsnavn</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Firma AS"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="label">Organisasjonsnummer</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="123 456 789"
                      value={orgNumber}
                      onChange={(e) => setOrgNumber(e.target.value.replace(/\D/g, "").slice(0, 9))}
                    />
                  </div>
                </div>
              )}

              {/* Address */}
              <div className="space-y-1">
                <label className="label">Adresse</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Gateveien 1, 0001 Oslo"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Neste →
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="heading-2">Bestill et prosjekt</h2>
                <p className="text-text-faint italic mt-1 text-sm">Steg 2 av 2 — Om prosjektet</p>
              </div>
              <p className="text-text-faint italic -mt-2">
                Feltene merket med <span className="text-red-500">*</span> må fylles ut før du kan fortsette
              </p>

              {/* Education field / category */}
              <div className="space-y-1" ref={educationFieldRef}>
                <label className="label">Kategori *</label>
                <select
                  className="input"
                  value={educationField}
                  onChange={(e) => setEducationField(e.target.value)}
                >
                  <option value="">Velg kategori</option>
                  <option value="BUILDING">Bygg</option>
                  <option value="CONSTRUCTION">Anlegg</option>
                </select>
              </div>

              {/* Title */}
              <div className="space-y-1" ref={titleRef}>
                <label className="label">Prosjekttittel *</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Kort beskrivende tittel"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="label">Budsjett fra (kr)</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    className="input"
                    placeholder="0.00"
                    value={minBudget}
                    onChange={(e) => {
                      const v = e.target.value.replace(/[^0-9.]/g, "").replace(/^(\d*\.?\d{0,2}).*/, "$1")
                      setMinBudget(v)
                    }}
                    onBlur={() => {
                      const v = parseFloat(minBudget)
                      if (!isNaN(v)) setMinBudget(v.toFixed(2))
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <label className="label">Budsjett til (kr)</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    className="input"
                    placeholder="0.00"
                    value={maxBudget}
                    onChange={(e) => {
                      const v = e.target.value.replace(/[^0-9.]/g, "").replace(/^(\d*\.?\d{0,2}).*/, "$1")
                      setMaxBudget(v)
                    }}
                    onBlur={() => {
                      const v = parseFloat(maxBudget)
                      if (!isNaN(v)) setMaxBudget(v.toFixed(2))
                    }}
                  />
                </div>
              </div>

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
