"use client"

import { useState } from 'react'
import { IconFilter, IconClose, IconChevronDown, IconCheck, IconReset } from '@/app/lib/icons'

export type FilterCategory = {
  label: string
  controls: React.ReactNode
  activeCount?: number
}

interface Props {
  categories: FilterCategory[]
  activeFilterCount: number
  onReset?: () => void
  children: React.ReactNode
}

function AccordionSection({ label, controls, activeCount }: FilterCategory) {
  const [open, setOpen] = useState(true)

  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-between w-full py-2 group cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <span className="label group-hover:text-primary transition-colors duration-150">{label}</span>
          {!!activeCount && (
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary text-text-on-primary text-[10px] font-bold leading-none">
              {activeCount}
            </span>
          )}
        </div>
        <IconChevronDown
          className={`text-text-faint text-xs transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        style={{
          maxHeight: open ? '600px' : '0',
          opacity: open ? 1 : 0,
          transition: 'max-height 0.28s ease-in-out, opacity 0.2s ease-in-out',
        }}
        className="overflow-hidden"
      >
        <div className="pb-2 flex flex-col gap-0.5">
          {controls}
        </div>
      </div>
    </div>
  )
}

export function FilterOption({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 w-full px-2.5 py-1.5 rounded-md text-sm font-medium text-left transition-all duration-150 cursor-pointer ${
        active
          ? 'bg-primary text-text-on-primary'
          : 'text-text hover:bg-surface-raised'
      }`}
    >
      <span className="w-3 h-3 shrink-0 flex items-center justify-center">
        {active && <IconCheck className="text-[10px]" />}
      </span>
      <span>{children}</span>
    </button>
  )
}

export default function FilterPanel({ categories, activeFilterCount, onReset, children }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const resetButton = onReset ? (
    <button
      onClick={onReset}
      className="flex items-center gap-1.5 text-xs text-text-faint hover:text-primary transition-colors font-medium cursor-pointer"
    >
      <IconReset className="text-[9px]" />
      Nullstill
    </button>
  ) : null

  const panelContent = (
    <div className="flex flex-col">
      {categories.map((cat, i) => (
        <div key={cat.label} className={i > 0 ? 'border-t border-border' : ''}>
          <AccordionSection {...cat} />
        </div>
      ))}
    </div>
  )

  return (
    <div className="flex gap-8 items-start">

      {/* Content area */}
      <div className="flex-1 min-w-0 flex flex-col gap-4">
        <div className="flex justify-end lg:hidden">
          <button
            onClick={() => setDrawerOpen(true)}
            className="btn btn-outline gap-2"
          >
            <IconFilter className="text-sm" />
            Filtre{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
          </button>
        </div>
        {children}
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-56 shrink-0 sticky top-28">
        <div className="card p-2">
          <div className="flex items-center justify-between px-4 pt-4 pb-1">
            <h2 className="heading-4">Filtre</h2>
            {resetButton}
          </div>
          <div className="px-1.5 pb-2">
            {panelContent}
          </div>
        </div>
      </aside>

      {/* Mobile backdrop */}
      <div
        onClick={() => setDrawerOpen(false)}
        className={`fixed inset-0 z-59 bg-black/40 lg:hidden transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Mobile drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 z-60 bg-bg border-l border-border shadow-xl flex flex-col overflow-y-auto lg:hidden transition-transform duration-300 ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-border sticky top-0 bg-bg">
          <div className="flex items-center gap-3">
            <h2 className="heading-4">Filtre</h2>
            {resetButton}
          </div>
          <button onClick={() => setDrawerOpen(false)} className="btn btn-ghost w-8 h-8 p-0" aria-label="Lukk filter">
            <IconClose />
          </button>
        </div>
        <div className="p-4 flex-1">
          {panelContent}
        </div>
      </aside>

    </div>
  )
}
