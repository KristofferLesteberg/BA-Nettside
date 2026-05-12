"use client"
import { ContactPerson } from "@/generated/prisma"
import { useState } from "react"
import RegretBtn from "../shared/BackBtn"
import PhoneInputWithCountrySelect from 'react-phone-number-input'
import { parsePhoneNumberWithError } from 'libphonenumber-js'
import type { E164Number, CountryCode } from 'libphonenumber-js'

type ContactFormData = Omit<ContactPerson, 'id' | 'products'>

interface Props {
  exsitingContact? : ContactFormData,
  onSubmit: (data: ContactFormData) => Promise<void>
  heading: string
}

export default function ContactForm({ exsitingContact, onSubmit, heading}: Props) {
  const [name, setName] = useState(exsitingContact?.name || "")
  const [email, setEmail] = useState(exsitingContact?.email || "")
  const [phone, setPhone] = useState<E164Number | undefined>()
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>("NO")
  const [title, setTitle] = useState(exsitingContact?.title || "")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit({ name, email, phone: String(phone ?? ''), title })
  }

  return (
    <div className="w-4/5 min-w-120 max-w-230 mx-auto py-10">
          <form onSubmit={handleSubmit} className="card-accented space-y-6 shadow-mist-500 shadow-xl">
            <RegretBtn />
            <h2 className="heading-2">{heading}</h2>
            <p className="text-text-faint italic -mt-4">
              Feltene merket med <span className="text-red-500">*</span> må fylles ut før du kan fortsette
            </p>
            <div className="space-y-1">
              <label className="label">Navn<span className="text-red-500">*</span></label>
              <input
                type="text"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
               />
            </div>
            <div className="space-y-1">
              <label className="label">Mail<span className="text-red-500">*</span></label>
              <input
                type="text"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
               />
              
            </div>
            <div className="space-y-1">
              <label className="label">Telefon</label>
              <PhoneInputWithCountrySelect
                className="input"
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
                }}
              />
             
            </div>
            <div className="space-y-1">
              <label className="label">Tittel<span className="text-red-500">*</span></label>
              <input
                type="text"
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
               />
            </div>
            <button 
              className="btn btn-primary w-full"
              type="submit"
            >
              Legg til Kontakt person
            </button>
          </form>
        </div>
  )
}