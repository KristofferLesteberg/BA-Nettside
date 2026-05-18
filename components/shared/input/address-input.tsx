"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  value: string,
  onChange: (value: string) => void,
  placeholder?: string,
}

type Suggestion = {
  address: string,
  city: string,
  postalCode: string,
}

export default function AddressInput({ value, onChange, placeholder }: Props) {
  const inputRef   = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isFocused,   setIsFocused]   = useState(false)
  const [address,     setAddress]     = useState(value)
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [mounted,     setMounted]     = useState(false)
  const [popupStyle,  setPopupStyle]  = useState<React.CSSProperties | null>(null)

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => { setAddress(value) }, [value])

  const showPopup = isFocused && suggestions.length > 0

  const updatePosition = useCallback(() => {
    if (!wrapperRef.current) return
    const rect = wrapperRef.current.getBoundingClientRect()
    setPopupStyle({
      position: 'fixed',
      bottom: window.innerHeight - rect.top + 2,
      left: rect.left,
      width: rect.width,
      zIndex: 9999,
    })
  }, [])

  useEffect(() => {
    if (!showPopup) { setPopupStyle(null); return }
    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [showPopup, updatePosition])

  useEffect(() => {
    async function fetchSuggestions(query: string) {
      if (query.length < 3) { setSuggestions([]); return }
      try {
        const response = await fetch(`https://ws.geonorge.no/adresser/v1/sok?sok=${encodeURIComponent(query + '*')}&fuzzy=false&treffPerSide=5&side=0&asciiKompatibel=true`)
        if (response.ok) {
          const data = await response.json()
          setSuggestions(data.adresser.slice(0, 5).map((a: { adressetekst: string; poststed: string; postnummer: string }) => ({
            address: a.adressetekst,
            city: a.poststed,
            postalCode: a.postnummer,
          })))
        } else {
          setSuggestions([])
        }
      } catch {
        setSuggestions([])
      }
    }
    const id = setTimeout(() => fetchSuggestions(address), 400)
    return () => clearTimeout(id)
  }, [address])

  return (
    <div ref={wrapperRef} className="relative">

      {mounted && showPopup && popupStyle && createPortal(
        <div
          style={popupStyle}
          className="flex flex-col-reverse bg-bg outline-border outline-2 shadow-y-md rounded-md overflow-y-auto overscroll-none max-h-60"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onMouseDown={(e) => {
                e.preventDefault()
                const formatted = `${suggestion.address}, ${suggestion.postalCode} ${suggestion.city}`
                setAddress(formatted)
                setSuggestions([])
                onChange(formatted)
                inputRef.current?.blur()
              }}
              className="text-left pl-4 py-1 hover:bg-surface cursor-pointer"
            >
              <p className="font-medium">{suggestion.address}</p>
              <p className="small-text">{suggestion.postalCode} {suggestion.city}</p>
            </button>
          ))}
        </div>,
        document.body
      )}

      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder || "Gateveien 1, 0001 Oslo"}
        value={address}
        onChange={(e) => { setAddress(e.target.value); onChange(e.target.value) }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoComplete="off"
        className="input"
      />

    </div>
  )
}
