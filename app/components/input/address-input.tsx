import { useState, useEffect } from 'react'

type Props = {
  value: string,
  onChange: (value: string) => void,
  placeholder?: string,
}

// TODO: Introduce a fields for number and letter 
// to widen the range of the possible stylistic options on the suggestion card
type Suggestion = {
  address: string,
  city: string,
  postalCode: string,
}

export default function AddressInput({ value, onChange, placeholder }: Props) {
  const [isFocused, setIsFocused] = useState(false)
  const [address, setAddress] = useState(value)
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])

  useEffect(() => {
    async function fetchSuggestions(query: string) {
      if (query.length < 3) {
        setSuggestions([])
        return
      }
      try {
        const response = await fetch(`https://ws.geonorge.no/adresser/v1/sok?sok=${encodeURIComponent(query + '*')}&fuzzy=false&treffPerSide=5&side=0&asciiKompatibel=true`)
        if (response.ok) {
          const data = await response.json()
          // The suggestions are capped at 5 on several levels
          // to avoid overwhelming the user and to ensure we stay within API limits
          // CURRENT SUGGESTIONS' AMOUNT: 5 (both API and slice() in UI)
          setSuggestions(data.adresser.slice(0, 5).map((a: { adressetekst: string; poststed: string; postnummer: string }) => ({
            address: a.adressetekst,
            city: a.poststed,
            postalCode: a.postnummer,
          })))
        } else {
          console.error('Failed to fetch suggestions')
          setSuggestions([])
        }
      }
      catch (error) {
        console.error('Error fetching suggestions:', error)
        setSuggestions([])
      }
    }
    const timeoutId = setTimeout(() => fetchSuggestions(address), 400)
    return () => clearTimeout(timeoutId)
  }, [address])

  return (
    <div className="flex flex-col-reverse relative overflow-visible">

      <div className={`${ isFocused && suggestions.length > 0 ? 'block' : 'hidden' } flex flex-col-reverse bg-bg outline-border outline-2 shadow-y-md rounded-md mb-0.5 overflow-y-auto overflow-visible overscroll-none absolute bottom-full z-10 w-full max-h-60`}>
        {suggestions.map((suggestion, index) => (
          <button key={index} onMouseDown={(e) => {
            e.preventDefault()
            const formattedAddress = `${suggestion.address}, ${suggestion.postalCode} ${suggestion.city}`
            setAddress(formattedAddress)
            setSuggestions([])
            onChange(formattedAddress)
          }}
          className="text-left pl-4 py-1 hover:bg-surface">

            <p className="font-medium">{suggestion.address}</p>
            <p className="small-text">{suggestion.postalCode} {suggestion.city}</p>
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder={placeholder || "Gateveien 1, 0001 Oslo"}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        onFocus={() => {setIsFocused(true)}}
        onBlur={() => {setIsFocused(false)}}
        className="input"
      />
    </div>
  )
}