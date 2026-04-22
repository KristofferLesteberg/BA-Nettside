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
      <div className="flex justify-between items-baseline">
        <span className="text-sm font-semibold">{minVal.toLocaleString('nb-NO')} kr</span>
        <span className="text-sm font-semibold">{maxVal.toLocaleString('nb-NO')} kr</span>
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
