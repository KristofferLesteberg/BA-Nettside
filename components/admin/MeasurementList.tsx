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

  useEffect(() => {
    if (!measures.some(m => m.born)) return
    const raf = requestAnimationFrame(() => {
      setMeasures(prev => prev.map(m => m.born ? { ...m, born: false } : m))
    })
    return () => cancelAnimationFrame(raf)
  }, [measures])

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

  const visibleCount = measures.filter(m => !m.removing).length

  return (
    <div className="space-y-1">
      <label className="label">Mål</label>
 
      <div className={`grid transition-[grid-template-rows] duration-200 ${visibleCount === 0 ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <p className={`text-sm text-text-faint italic pb-1 transition-opacity duration-200 ${visibleCount === 0 ? 'opacity-100' : 'opacity-0'}`}>
            Ingen mål lagt til
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        {measures.map(m => (
          <div
            key={m.id}
            className={`grid ease-out ${m.removing ? 'transition-[grid-template-rows] duration-200 grid-rows-[0fr]' : m.born ? 'grid-rows-[0fr]' : 'transition-[grid-template-rows] duration-300 grid-rows-[1fr]'}`}
          >
            <div className="overflow-hidden">
              <div className={`pb-3 transition-opacity ${m.removing ? 'duration-200 opacity-0 pointer-events-none' : m.born ? 'opacity-0' : 'duration-300 opacity-100'}`}>
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
