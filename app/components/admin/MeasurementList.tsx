"use client"

import { FaPlus } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";

import { useState, useEffect } from 'react'
import MeasurementInput from './MeasurementInput'

export type Measure = { name: string; value: string }

export default function MeasurementList({ onChange }: { onChange: (measures: Measure[]) => void }) {
  const [showMeasures, setShowMeasures] = useState(false)
  const [measures, setMeasures] = useState<Measure[]>([])

  useEffect(() => onChange(measures), [measures])

  function addMeasure() {
    setMeasures(prev => [...prev, { name: "", value: "" }])
    setShowMeasures(true)
  }

  function updateMeasure(index: number, field: keyof Measure, val: string) {
    setMeasures(prev => prev.map((m, i) => i === index ? { ...m, [field]: val } : m))
  }

  function deleteMeasure(index: number) {
    setMeasures(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div>
      <div className="flex flex-row gap-4">
        <label className="label">Mål</label>
        <button type="button" className="btn btn-success btn-icon self-center" onClick={addMeasure}>
          <FaPlus />
        </button>
        <button type="button" className="btn btn-info btn-icon self-center" onClick={() => setShowMeasures(v => !v)}>
          {showMeasures ? <FaAngleDown /> : <FaAngleUp />}
        </button>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {showMeasures && (
          <div className="flex flex-col gap-4">
            {measures.map((measure, index) => (
              <MeasurementInput
                key={index}
                name={measure.name}
                value={measure.value}
                onChange={(field, val) => updateMeasure(index, field, val)}
                onDelete={() => deleteMeasure(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}