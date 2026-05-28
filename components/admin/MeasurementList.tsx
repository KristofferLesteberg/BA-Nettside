"use client"

import { useState } from 'react'
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

  const emit = (next: MeasureItem[]) => {
    onChange(next.filter(m => !m.removing).map(({ name, value, unit }) => ({ name, value, unit })))
  }

  const addMeasure = () => {
    setMeasures(prev => {
      const next = [...prev, { id: makeId(), name: "", value: "", unit: "", removing: false, born: true }]
      emit(next)
      return next
    })
  }

  const updateMeasure = (id: string, field: keyof Measure, val: string) => {
    setMeasures(prev => {
      const next = prev.map(m => m.id === id ? { ...m, [field]: val } : m)
      emit(next)
      return next
    })
  }

  const deleteRow = (id: string) => {
    setMeasures(prev => {
      const next = prev.map(m => m.id === id ? { ...m, removing: true } : m)
      emit(next)
      setTimeout(() => {
        setMeasures(curr => {
          const filtered = curr.filter(m => m.id !== id)
          emit(filtered)
          return filtered
        })
      }, 200)
      return next
    })
  }

  const revertRow = (id: string) => {
    setMeasures(prev => {
      const item = prev.find(m => m.id === id)
      if (!item) return prev
      if (item.originalIndex !== undefined && initialMeasures) {
        const orig = initialMeasures[item.originalIndex]
        const next = prev.map(m => m.id === id ? { ...m, name: orig.name, value: orig.value, unit: orig.unit } : m)
        emit(next)
        return next
      }
      // New row with no original: revert = delete
      deleteRow(id)
      return prev
    })
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
