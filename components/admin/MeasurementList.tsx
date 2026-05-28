"use client"

import { useState, useEffect } from 'react'
import { FaPlus } from "react-icons/fa6"
import MeasurementInput from './MeasurementInput'

export type Measure = { name: string; value: string; unit: string }

type MeasureItem = Measure & {
  id: string
  removing: boolean
  born: boolean        // true = newly added by user (animate in)
  originalIndex?: number
}

function makeId() {
  return Math.random().toString(36).slice(2)
}

export default function MeasurementList({
  onChange,
  initialMeasures,
}: {
  onChange: (measures: Measure[]) => void
  initialMeasures?: Measure[]
}) {
  const [measures, setMeasures] = useState<MeasureItem[]>(
    () => (initialMeasures ?? []).map((m, i) => ({
      ...m,
      id: makeId(),
      removing: false,
      born: false,
      originalIndex: i,
    }))
  )

  useEffect(() => {
    onChange(measures.filter(m => !m.removing).map(({ name, value, unit }) => ({ name, value, unit })))
  }, [measures, onChange])

  const addMeasure = () => {
    setMeasures(prev => [...prev, { id: makeId(), name: "", value: "", unit: "", removing: false, born: true }])
  }

  const updateMeasure = (id: string, field: keyof Measure, val: string) => {
    setMeasures(prev => prev.map(m => m.id === id ? { ...m, [field]: val } : m))
  }

  const deleteRow = (id: string) => {
    setMeasures(prev => prev.map(m => m.id === id ? { ...m, removing: true } : m))
    setTimeout(() => setMeasures(prev => prev.filter(m => m.id !== id)), 200)
  }

  const revertRow = (id: string) => {
    const item = measures.find(m => m.id === id)
    if (!item) return
    if (item.originalIndex !== undefined && initialMeasures) {
      const orig = initialMeasures[item.originalIndex]
      setMeasures(prev => prev.map(m => m.id === id ? { ...m, name: orig.name, value: orig.value, unit: orig.unit } : m))
    } else {
      deleteRow(id)
    }
  }

  return (
    <div className="space-y-3">
      <label className="label">Mål</label>

      {measures.length === 0 && (
        <p className="text-sm text-text-faint italic">Ingen mål lagt til</p>
      )}

      <div className="flex flex-col gap-3">
        {measures.map(m => (
          <div
            key={m.id}
            className={`transition-opacity duration-200 ${m.removing ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <div className={m.born ? 'animate-fade-in' : ''}>
              <MeasurementInput
                name={m.name}
                value={m.value}
                unit={m.unit}
                onChange={(field, val) => updateMeasure(m.id, field, val)}
                onDelete={() => deleteRow(m.id)}
                onRevert={m.originalIndex !== undefined ? () => revertRow(m.id) : undefined}
                originalMeasure={m.originalIndex !== undefined ? initialMeasures?.[m.originalIndex] : undefined}
              />
            </div>
          </div>
        ))}
      </div>

      <button type="button" className="btn btn-ghost gap-2 text-sm" onClick={addMeasure}>
        <FaPlus size={12} />
        Legg til mål
      </button>
    </div>
  )
}
