"use client"

import { useRef, useState } from "react"
import { FaMinus } from "react-icons/fa6"
import { RotateCcw } from "lucide-react"
import type { Measure } from "./MeasurementList"

const PRESET_UNITS = ["mm", "cm", "m", "g", "kg", "l", "ml", "stk", "%"]
const CUSTOM_SENTINEL = "__custom__"

function UnitDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const customRef = useRef<HTMLInputElement>(null)
  const isCustom = value !== "" && !PRESET_UNITS.includes(value)
  const [customMode, setCustomMode] = useState(isCustom)

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === CUSTOM_SENTINEL) {
      setCustomMode(true)
      onChange("")
      setTimeout(() => customRef.current?.focus(), 10)
    } else {
      onChange(e.target.value)
    }
  }

  const exitCustomMode = () => {
    setCustomMode(false)
    onChange("")
  }

  return (
    <div className="flex gap-1 items-center">
      <select
        value={customMode ? "" : value}
        onChange={handleSelectChange}
        disabled={customMode}
        className={`input shrink-0 cursor-pointer overflow-hidden transition-all duration-150 ${customMode ? 'w-0 p-0 opacity-0 pointer-events-none' : 'w-24'}`}
      >
        <option value="" disabled>Enhet</option>
        {PRESET_UNITS.map(u => (
          <option key={u} value={u}>{u}</option>
        ))}
        <option value={CUSTOM_SENTINEL}>Annet…</option>
      </select>
      <input
        ref={customRef}
        type="text"
        placeholder="Enhet"
        className={`input shrink-0 overflow-hidden transition-all duration-150 ${customMode ? 'w-20' : 'w-0 p-0 opacity-0 pointer-events-none'}`}
        maxLength={20}
        value={customMode ? value : ""}
        readOnly={!customMode}
        onChange={e => onChange(e.target.value)}
      />
      <button
        type="button"
        onClick={exitCustomMode}
        title="Tilbake til forhåndsdefinerte enheter"
        className={`overflow-hidden transition-all duration-150 btn btn-outline btn-icon shrink-0 ${customMode ? 'opacity-100 cursor-pointer' : 'w-0 opacity-0 pointer-events-none'}`}
      >
        <RotateCcw size={12} />
      </button>
    </div>
  )
}

// ── MeasurementInput ─────────────────────────────────────────────────────────

type Props = {
  name: string
  value: string
  unit: string
  onChange: (field: "name" | "value" | "unit", val: string) => void
  onDelete: () => void
  onRevert?: () => void
  originalMeasure?: Measure
}

export default function MeasurementInput({ name, value, unit, onChange, onDelete, onRevert, originalMeasure }: Props) {
  const hasChanges = originalMeasure !== undefined && (
    name  !== originalMeasure.name  ||
    value !== originalMeasure.value ||
    unit  !== originalMeasure.unit
  )
  const canRevert = onRevert !== undefined && hasChanges

  return (
    <div className="flex flex-row gap-2 items-center bg-surface border border-border rounded-md p-2">
      <input
        type="text"
        placeholder="Navn"
        className="input min-w-0 flex-1"
        maxLength={50}
        value={name}
        onChange={e => onChange("name", e.target.value)}
      />
      <input
        type="text"
        placeholder="Verdi"
        className="input w-24 shrink-0"
        maxLength={30}
        value={value}
        onChange={e => onChange("value", e.target.value)}
      />

      <UnitDropdown value={unit} onChange={v => onChange("unit", v)} />

      <button
        type="button"
        onClick={onRevert}
        title="Tilbakestill mål"
        className={`overflow-hidden transition-all duration-150 text-text-faint hover:text-text rounded flex items-center justify-center shrink-0 ${canRevert ? 'w-6 h-6 opacity-100 cursor-pointer' : 'w-0 opacity-0 pointer-events-none'}`}
      >
        <RotateCcw size={14} className="shrink-0" />
      </button>

      <button
        type="button"
        className="btn btn-error btn-icon shrink-0"
        onClick={onDelete}
      >
        <FaMinus />
      </button>
    </div>
  )
}
