"use client"

import { useRef, useLayoutEffect } from "react"
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

const formatOrgNumber = (digits: string) => {
  const d = digits.replace(/\D/g, '').slice(0, 9)
  return [d.slice(0, 3), d.slice(3, 6), d.slice(6, 9)].filter(s => s.length > 0).join(' ')
}

// Maps a raw digit index to its position in the formatted string.
const rawToFormattedPos = (rawPos: number, rawLength: number): number => {
  let pos = rawPos
  if (rawLength > 3 && rawPos > 3) pos++
  if (rawLength > 6 && rawPos > 6) pos++
  return pos
}

export default function OrgNumberInput({inputClassName, value, onChange, setEmail, setPhoneCountry, setPhone, setOrgName, setAddress, onSuccess} : Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const cursorRef = useRef<number | null>(null)

  // Restore cursor after React re-renders the controlled formatted value.
  useLayoutEffect(() => {
    if (cursorRef.current !== null && inputRef.current) {
      inputRef.current.setSelectionRange(cursorRef.current, cursorRef.current)
      cursorRef.current = null
    }
  })

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cursorPos = e.currentTarget.selectionStart ?? 0
    const typedValue = e.target.value
    const newRaw = typedValue.replace(/\D/g, '').slice(0, 9)
    const digitsBeforeCursor = typedValue.slice(0, cursorPos).replace(/\D/g, '').length
    cursorRef.current = rawToFormattedPos(Math.min(digitsBeforeCursor, newRaw.length), newRaw.length)
    onChange({ target: { value: newRaw } })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    const pos = input.selectionStart
    const selEnd = input.selectionEnd
    if (pos === null || selEnd === null || pos !== selEnd) return

    const formatted = formatOrgNumber(value)

    if (e.key === 'ArrowRight' && formatted[pos] === ' ') {
      e.preventDefault()
      input.setSelectionRange(pos + 2, pos + 2)
    } else if (e.key === 'ArrowLeft' && pos > 0 && formatted[pos - 1] === ' ') {
      // Skip from after-space position directly past the space.
      e.preventDefault()
      input.setSelectionRange(pos - 2, pos - 2)
    } else if (e.key === 'Backspace' && pos > 0 && formatted[pos - 1] === ' ') {
      // Cursor is right after a space — delete the digit before the space.
      e.preventDefault()
      const rawPos = formatted.slice(0, pos - 1).replace(/\D/g, '').length
      const newRaw = value.slice(0, rawPos - 1) + value.slice(rawPos)
      cursorRef.current = rawToFormattedPos(rawPos - 1, newRaw.length)
      onChange({ target: { value: newRaw } })
    } else if (e.key === 'Delete' && pos < formatted.length && formatted[pos] === ' ') {
      // Cursor is right before a space — delete the digit after the space.
      e.preventDefault()
      const rawPos = formatted.slice(0, pos + 1).replace(/\D/g, '').length
      const newRaw = value.slice(0, rawPos) + value.slice(rawPos + 1)
      cursorRef.current = rawToFormattedPos(rawPos, newRaw.length)
      onChange({ target: { value: newRaw } })
    }
  }

  return (
    <div className='relative flex-1 justify-center align-middle'>
      <input
        ref={inputRef}
        type="text"
        className={inputClassName}
        placeholder="123 456 789"
        value={formatOrgNumber(value)}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
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
