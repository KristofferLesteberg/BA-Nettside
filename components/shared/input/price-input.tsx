"use client"

import { RotateCcw } from 'lucide-react'

interface PriceInputProps {
  value: string
  onChange: (value: string) => void
  /** When provided, fully controls blur behaviour (clamping, etc.). Otherwise blurs format to toFixed(2). */
  onBlur?: () => void
  /** When provided, renders a revert button in the right slot instead of the kr suffix. */
  onRevert?: () => void
  placeholder?: string
  disabled?: boolean
  id?: string
}

export default function PriceInput({
  value,
  onChange,
  onBlur,
  onRevert,
  placeholder = "0",
  disabled,
  id,
}: PriceInputProps) {
  return (
    <div className="relative">
      <input
        id={id}
        type="text"
        inputMode="decimal"
        className="input pr-8"
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => {
          const v = e.target.value
            .replace(/[^0-9.]/g, "")
            .replace(/^(\d*\.?\d{0,2}).*/, "$1")
            .replace(/^0(\d)/, "$1")
          onChange(v)
        }}
        onBlur={() => {
          if (onBlur) {
            onBlur()
          } else {
            const n = parseFloat(value)
            if (!isNaN(n)) onChange(n.toFixed(2))
          }
        }}
      />
      {onRevert ? (
        <button
          type="button"
          onClick={onRevert}
          aria-label="Tilbakestill pris"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-text-faint hover:text-text transition-colors p-0.5 rounded cursor-pointer animate-fade-in"
        >
          <RotateCcw size={14} />
        </button>
      ) : (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-text-faint pointer-events-none select-none">
          kr
        </span>
      )}
    </div>
  )
}
