import toast from "react-hot-toast";
import type { E164Number, CountryCode } from 'libphonenumber-js'

import { IoSearch } from "react-icons/io5";

interface Props {
  inputClassName?: string
  value: string
  onChange: (e: any) => void
  setEmail: (value: string) => void
  setPhoneCountry: (value: CountryCode) => void
  setPhone: (value: E164Number) => void
  setOrgName: (value: string) => void
  setAddress: (value: string) => void
  onSuccess?: () => void
}

export default function OrgNumberInput({inputClassName, value, onChange, setEmail, setPhoneCountry, setPhone, setOrgName, setAddress, onSuccess} : Props) {

  const getOrgInfo = async (orgNumber: number) => {
    try {
      const res = await fetch(`https://data.brreg.no/enhetsregisteret/api/enheter/${orgNumber}`)
      if (!res.ok) {
        toast.error("Fant ikke organisasjonen")
        return
      }
      const data = await res.json()
      if (!data.navn) {
        toast.error("Fant ikke organisasjonen")
        return
      }
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
      toast.success('Organisasjon funnet!')
      onSuccess?.()

    } catch(error) {
      toast.error("Fant ikke organisasjonen")
      console.error(error)
    }
  }

  return (
    <div className='relative flex-1 justify-center align-middle'>
      <input
        type="text"
        className={inputClassName}
        placeholder="123 456 789"
        value={value}
        onChange={onChange}
      />
      <button
        type='button'
        onClick={() => getOrgInfo(Number(value))}
        className="absolute right-1 mt-auto mb-auto mr-3 h-full"
      >
        <IoSearch className='cursor-pointer' title="Søk etter organisasjon" />
      </button>
    </div>
  )
}