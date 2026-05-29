"use client"

import Slider from 'rc-slider'
import PriceInput from '@/components/shared/input/price-input'

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
        <div className="flex-1">
          <PriceInput
            value={min}
            placeholder="Minimumspris"
            onChange={(v) => {
              const n = parseFloat(v)
              onChange(!isNaN(n) && n > maxValue ? String(maxValue) : v, max)
            }}
            onBlur={() => {
              const v = Math.min(parseFloat(min) || 0, maxVal)
              onChange(isNaN(v) ? '0' : v.toFixed(2), max)
            }}
          />
        </div>
        <span className="text-xs text-text-faint shrink-0">—</span>
        <div className="flex-1">
          <PriceInput
            value={max}
            placeholder="Maximumspris"
            onChange={(v) => {
              const n = parseFloat(v)
              onChange(min, !isNaN(n) && n > maxValue ? String(maxValue) : v)
            }}
            onBlur={() => {
              const v = Math.max(parseFloat(max) || 0, minVal)
              const clamped = Math.min(v, maxValue)
              onChange(min, isNaN(clamped) ? '0' : clamped.toFixed(2))
            }}
          />
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
