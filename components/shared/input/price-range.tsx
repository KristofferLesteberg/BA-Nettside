"use client"

import { useEffect, useState } from 'react'
import Slider from 'rc-slider'
import PriceInput from '@/components/shared/input/price-input'

interface PriceRangeProps {
  value: [number, number]
  onCommit: (min: number, max: number) => void
  maxValue?: number
  step?: number
}

export default function PriceRange({ value, onCommit, maxValue = 500000, step = 1000 }: PriceRangeProps) {
  const [localMin, setLocalMin] = useState(String(value[0]))
  const [localMax, setLocalMax] = useState(String(value[1]))

  const [extMin, extMax] = value
  useEffect(() => {
    setLocalMin(String(extMin))
    setLocalMax(String(extMax))
  }, [extMin, extMax])

  const numMin = parseFloat(localMin) || 0
  const numMax = parseFloat(localMax) || 0
  const sliderMin = Math.max(0, Math.min(numMin, maxValue))
  const sliderMax = Math.max(0, Math.min(numMax, maxValue))

  function commit(lo: number, hi: number) {
    const min = Math.max(0, Math.min(lo, maxValue))
    const max = Math.max(min, Math.min(hi, maxValue))
    onCommit(min, max)
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="label">Budsjettramme (NOK)</span>
      <div className="flex flex-col gap-2">
        <PriceInput
          value={localMin}
          placeholder="0"
          onChange={(v) => setLocalMin(v)}
          onBlur={() => {
            const clamped = Math.min(numMin, numMax, maxValue)
            setLocalMin(String(clamped))
            commit(clamped, numMax)
          }}
        />
        <PriceInput
          value={localMax}
          placeholder={String(maxValue)}
          onChange={(v) => setLocalMax(v)}
          onBlur={() => {
            const clamped = Math.max(numMax, numMin)
            const final = Math.min(clamped, maxValue)
            setLocalMax(String(final))
            commit(numMin, final)
          }}
        />
      </div>
      <div className="px-1 py-2">
        <Slider
          range
          min={0}
          max={maxValue}
          step={step}
          value={[sliderMin, sliderMax]}
          onChange={(vals) => {
            const [lo, hi] = vals as number[]
            setLocalMin(String(lo))
            setLocalMax(String(hi))
          }}
          onChangeComplete={(vals) => {
            const [lo, hi] = vals as number[]
            commit(lo, hi)
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
