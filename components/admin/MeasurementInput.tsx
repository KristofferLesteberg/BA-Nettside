"use client"

import { useRef, useState } from "react"
import { FaMinus, FaRotateLeft } from "react-icons/fa6"

const PRESET_UNITS = ["mm", "cm", "m", "g", "kg", "l", "ml", "stk", "%"]
const CUSTOM_SENTINEL = "__custom__"

type Props = {
  name: string
  value: string
  unit: string
  onChange: (field: "name" | "value" | "unit", val: string) => void
  onDelete: () => void
}

export default function MeasurementInput({ name, value, unit, onChange, onDelete }: Props) {
  const startsCustom = unit !== "" && !PRESET_UNITS.includes(unit)
  const [customMode, setCustomMode] = useState(startsCustom)
  const customInputRef = useRef<HTMLInputElement>(null)

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === CUSTOM_SENTINEL) {
      setCustomMode(true)
      onChange("unit", "")
      setTimeout(() => customInputRef.current?.focus(), 210)
    } else {
      onChange("unit", e.target.value)
    }
  }

  const exitCustomMode = () => {
    setCustomMode(false)
    onChange("unit", "")
  }

  return (
    <div className="flex flex-row gap-2 bg-surface border-2 border-default rounded-md p-1">
      <input
        type="text"
        placeholder="Navn"
        className="input min-w-0"
        value={name}
        onChange={e => onChange("name", e.target.value)}
      />
      <input
        type="text"
        placeholder="Verdi"
        className="input min-w-0"
        value={value}
        onChange={e => onChange("value", e.target.value)}
      />

      <div className="flex gap-1 items-center shrink-0">
        {/* Dropdown state — always in DOM, slides out when custom mode is active */}
        <div
          style={{
            maxWidth:     customMode ? "0"    : "6rem",
            opacity:      customMode ? 0      : 1,
            overflow:     "hidden",
            pointerEvents: customMode ? "none" : "auto",
            transition:   "max-width 200ms ease, opacity 150ms ease",
          }}
        >
          <select
            className="input w-24 cursor-pointer"
            value={unit}
            onChange={handleSelect}
          >
            <option value="" disabled>Enhet</option>
            {PRESET_UNITS.map(u => (
              <option key={u} value={u}>{u}</option>
            ))}
            <option value={CUSTOM_SENTINEL}>Annet…</option>
          </select>
        </div>

        {/* Custom input state — always in DOM, slides in when custom mode is active */}
        <div
          className="flex gap-1"
          style={{
            maxWidth:      customMode ? "calc(7rem + 2.5rem + 0.25rem)" : "0",
            opacity:       customMode ? 1      : 0,
            overflow:      "hidden",
            pointerEvents: customMode ? "auto" : "none",
            transition:    "max-width 200ms ease, opacity 150ms ease",
          }}
        >
          <input
            ref={customInputRef}
            type="text"
            placeholder="Egendefinert"
            className="input w-28"
            value={unit}
            onChange={e => onChange("unit", e.target.value)}
          />
          <button
            type="button"
            className="btn btn-outline btn-icon shrink-0 self-center "
            onClick={exitCustomMode}
            title="Tilbake til forhåndsdefinerte enheter"
          >
            <FaRotateLeft style={{ fontSize: "0.75rem" }} />
          </button>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-error btn-icon self-center shrink-0"
        onClick={onDelete}
      >
        <FaMinus />
      </button>
    </div>
  )
}
