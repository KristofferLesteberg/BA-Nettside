"use client"

import Slider from 'rc-slider'

interface PriceRangeProps {
  min: string
  max: string
  onChange: (min: string, max: string) => void
  maxValue?: number
  step?: number
}

export default function PriceRange({ min, max, onChange, maxValue = 500000, step = 1000 }: PriceRangeProps) {
  const minVal = parseInt(min || '0')
  const maxVal = parseInt(max || '0')

  return (
    <div className="space-y-2">
      <label className="label">Budsjettramme (NOK)</label>
      <div className="flex justify-between items-center gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            inputMode="decimal"
            className="input pr-8"
            placeholder="0.00"
            value={min}
            onChange={(e) => {
              // 1. Strip non-numeric chars, limit to 2 decimals, remove leading zeros before digits
              const v = e.target.value.replace(/[^0-9.]/g, "").replace(/^(\d*\.?\d{0,2}).*/, "$1").replace(/^0(\d)/, "$1")
              // 2. Snap to maxValue if the hard ceiling is exceeded; otherwise keep raw string
              const n = parseFloat(v)
              onChange(!isNaN(n) && n > maxValue ? String(maxValue) : v, max)
            }}
            onBlur={() => {
              // 1. Clamp min against the current max value, then format to 2 decimal places
              const v = Math.min(parseFloat(min) || 0, maxVal)
              onChange(isNaN(v) ? '0' : v.toFixed(2), max)
            }}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-text-faint pointer-events-none select-none">kr</span>
        </div>
        <span className="text-xs text-text-faint shrink-0">—</span>
        <div className="relative flex-1">
          <input
            type="text"
            inputMode="decimal"
            className="input pr-8"
            placeholder="0.00"
            value={max}
            onChange={(e) => {
              // 1. Strip non-numeric chars, limit to 2 decimals, remove leading zeros before digits
              const v = e.target.value.replace(/[^0-9.]/g, "").replace(/^(\d*\.?\d{0,2}).*/, "$1").replace(/^0(\d)/, "$1")
              // 2. Snap to maxValue if the hard ceiling is exceeded; otherwise keep raw string
              const n = parseFloat(v)
              onChange(min, !isNaN(n) && n > maxValue ? String(maxValue) : v)
            }}
            onBlur={() => {
              // 1. Clamp max to [current min, maxValue], then format to 2 decimal places
              const v = Math.max(parseFloat(max) || 0, minVal)
              const clamped = Math.min(v, maxValue)
              onChange(min, isNaN(clamped) ? '0' : clamped.toFixed(2))
            }}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-text-faint pointer-events-none select-none">kr</span>
        </div>
      </div>
      <div className="px-1 py-2">
        <Slider
          range
          min={0}
          max={maxValue}
          step={step}
          value={[minVal, maxVal]}
          onChange={(vals) => {
            const [lo, hi] = vals as number[]
            onChange(String(lo), String(hi))
          }}
          allowCross={false}
        />
      </div>
      <div className="flex justify-between text-xs text-text-faint">
        <span>0 kr</span>
        <span>{maxValue.toLocaleString('nb-NO')} kr</span>
      </div>
    </div>
  )
}
