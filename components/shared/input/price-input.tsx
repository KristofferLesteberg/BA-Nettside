"use client"

import { IconRevert } from '@/app/lib/icons'

interface PriceInputProps {
  value: string
  onChange: (value: string) => void
  /** When provided, fully controls blur behaviour (clamping, etc.). Otherwise blurs format to toFixed(2). */
  onBlur?: () => void
  /** When provided, renders a revert button that slides in to the left of the kr suffix. */
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
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
        <span className="text-sm text-text-faint pointer-events-none select-none">kr</span>
        
        <button
          type="button"
          onClick={onRevert}
          aria-label="Tilbakestill pris"
          className={`overflow-hidden transition-all duration-150 text-text-faint hover:text-text rounded flex items-center justify-center ${onRevert ? 'w-4 opacity-100 cursor-pointer' : 'w-0 opacity-0 pointer-events-none'}`}
        >
          <IconRevert size={14} className="shrink-0" />
        </button>
      </div>
    </div>
  )
}
