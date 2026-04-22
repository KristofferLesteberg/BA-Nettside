import { useState } from 'react'

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
  const [isFocused, setIsFocused] = useState(false)
  const [address, setAddress] = useState(value)
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
 // TODO: Implement real suggestions based on input
  return (
    <div className="flex flex-col-reverse relative overflow-visible">

      <button onClick={() => setSuggestions([
        { address: "Gateveien 1", city: "Oslo", postalCode: "0001" },
        { address: "Gateveien 2", city: "Oslo", postalCode: "0002" },
        { address: "Gateveien 3", city: "Oslo", postalCode: "0003" },
        { address: "Gateveien 4", city: "Oslo", postalCode: "0004" },
        { address: "Gateveien 5", city: "Oslo", postalCode: "0005" },
        { address: "Gateveien 6", city: "Oslo", postalCode: "0006" },
        { address: "Gateveien 7", city: "Oslo", postalCode: "0007" },
        { address: "Gateveien 8", city: "Oslo", postalCode: "0008" },
        { address: "Gateveien 9", city: "Oslo", postalCode: "0009" },
        { address: "Gateveien 10", city: "Oslo", postalCode: "0010" },
      ])}>Click me</button>

      <div className={`${ isFocused && suggestions.length > 0 ? 'block' : 'hidden' } flex flex-col-reverse bg-bg outline-border outline-2 shadow-y-md rounded-md mb-0.5 overflow-y-auto overflow-visible overscroll-none absolute bottom-full z-10 w-full max-h-60`}>
        {suggestions.map((suggestion, index) => (
          <button key={index} onClick={() => {
            setAddress(suggestion.address)
            setSuggestions([])
            onChange(suggestion.address)
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