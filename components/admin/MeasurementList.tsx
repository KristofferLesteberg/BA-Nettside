"use client"

import { useState, useEffect } from 'react'
import { FaPlus } from "react-icons/fa6"
import MeasurementInput from './MeasurementInput'
import { CSS } from "@dnd-kit/utilities"

import {
  DndContext,
  closestCenter,
  type DragEndEvent,
} from "@dnd-kit/core"

import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"

import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { MdDragIndicator } from "react-icons/md"

export type Measure = { name: string; value: string; unit: string }

type MeasureItem = Measure & {
  id: string
  removing: boolean
  born: boolean
  originalIndex?: number
}

function makeId() {
  return Math.random().toString(36).slice(2)
}

type SortableRowProps = {
  m: MeasureItem
  initialMeasures?: Measure[]
  onUpdate: (field: keyof Measure, val: string) => void
  onDelete: () => void
  onRevert: (() => void) | undefined
}

function SortableRow({ m, initialMeasures, onUpdate, onDelete, onRevert }: SortableRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: m.id })

  const gridTransition = m.removing
    ? 'grid-template-rows 200ms ease-out'
    : !m.born
      ? 'grid-template-rows 300ms ease-out'
      : null

  // When dnd-kit sets a transition (during drag settling) it would override the
  // CSS class transition-[grid-template-rows] because inline styles win. Merge
  // both so neither animation is lost.
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform) || undefined,
    ...(transition && { transition: [transition, gridTransition].filter(Boolean).join(', ') }),
  }

  const handle = (
    <button
      type="button"
      className="cursor-grab active:cursor-grabbing text-text-faint hover:text-text shrink-0 touch-none flex items-center"
      {...attributes}
      {...listeners}
    >
      <MdDragIndicator size={18} />
    </button>
  )

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`grid ease-out ${isDragging ? 'opacity-50 relative z-10' : ''} ${m.removing ? 'transition-[grid-template-rows] duration-200 grid-rows-[0fr]' : m.born ? 'grid-rows-[0fr]' : 'transition-[grid-template-rows] duration-300 grid-rows-[1fr]'}`}
    >
      <div className="overflow-hidden">
        <div className={`pb-3 transition-opacity ${m.removing ? 'duration-200 opacity-0 pointer-events-none' : m.born ? 'opacity-0' : 'duration-300 opacity-100'}`}>
          <MeasurementInput
            name={m.name}
            value={m.value}
            unit={m.unit}
            onChange={onUpdate}
            onDelete={onDelete}
            onRevert={onRevert}
            originalMeasure={m.originalIndex !== undefined ? initialMeasures?.[m.originalIndex] : undefined}
            dragHandle={handle}
          />
        </div>
      </div>
    </div>
  )
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    setMeasures(prev => {
      const oldIndex = prev.findIndex(m => m.id === active.id)
      const newIndex = prev.findIndex(m => m.id === over.id)
      if (oldIndex === -1 || newIndex === -1) return prev
      return arrayMove(prev, oldIndex, newIndex)
    })
  }

  const visibleCount = measures.filter(m => !m.removing).length
  const sortableIds = measures.map(m => m.id)

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

      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={sortableIds} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col">
            {measures.map(m => (
              <SortableRow
                key={m.id}
                m={m}
                initialMeasures={initialMeasures}
                onUpdate={(field, val) => updateMeasure(m.id, field, val)}
                onDelete={() => deleteRow(m.id)}
                onRevert={m.originalIndex !== undefined ? () => revertRow(m.id) : undefined}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <button type="button" className="btn btn-ghost gap-2 text-sm" onClick={addMeasure}>
        <FaPlus size={12} />
        Legg til mål
      </button>
    </div>
  )
}
