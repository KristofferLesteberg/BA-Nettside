"use client"

import { useRef, useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { FaMinus, FaChevronDown } from "react-icons/fa6"
import { RotateCcw } from "lucide-react"
import type { Measure } from "./MeasurementList"

const PRESET_UNITS = ["mm", "cm", "m", "g", "kg", "l", "ml", "stk", "%"]
const CUSTOM_SENTINEL = "__custom__"

// ── Unit dropdown ────────────────────────────────────────────────────────────

function UnitDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const buttonRef  = useRef<HTMLButtonElement>(null)
  const panelRef   = useRef<HTMLDivElement>(null)
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([])
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const customRef  = useRef<HTMLInputElement>(null)

  const isCustom = value !== "" && !PRESET_UNITS.includes(value)
  const [customMode,  setCustomMode]  = useState(isCustom)
  const [menuMounted, setMenuMounted] = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [panelStyle,  setPanelStyle]  = useState<React.CSSProperties>({})

  const openMenu = () => {
    clearTimeout(closeTimer.current)
    if (buttonRef.current) {
      const r = buttonRef.current.getBoundingClientRect()
      setPanelStyle({ top: r.bottom + 4, left: r.left, width: Math.max(r.width, 120) })
    }
    setMenuMounted(true)
    setMenuOpen(true)
  }

  const closeMenu = () => {
    setMenuOpen(false)
    closeTimer.current = setTimeout(() => setMenuMounted(false), 150)
  }

  useEffect(() => {
    if (!menuMounted) return
    const onDown   = (e: MouseEvent) => {
      if (!panelRef.current?.contains(e.target as Node) && !buttonRef.current?.contains(e.target as Node))
        closeMenu()
    }
    const onScroll = () => closeMenu()
    document.addEventListener('mousedown', onDown)
    window.addEventListener('scroll', onScroll, true)
    return () => {
      document.removeEventListener('mousedown', onDown)
      window.removeEventListener('scroll', onScroll, true)
    }
  }, [menuMounted])

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  const handlePanelKeyDown = (e: React.KeyboardEvent) => {
    const refs    = optionRefs.current
    const current = refs.indexOf(document.activeElement as HTMLButtonElement)
    if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
      e.preventDefault()
      refs[current === -1 ? 0 : (current + 1) % refs.length]?.focus()
    } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
      e.preventDefault()
      refs[current === -1 ? refs.length - 1 : (current - 1 + refs.length) % refs.length]?.focus()
    } else if (e.key === 'Escape') {
      closeMenu()
      buttonRef.current?.focus()
    }
  }

  const handleSelect = (v: string) => {
    if (v === CUSTOM_SENTINEL) {
      setCustomMode(true)
      onChange("")
      closeMenu()
      setTimeout(() => customRef.current?.focus(), 10)
    } else {
      onChange(v)
      closeMenu()
      buttonRef.current?.focus()
    }
  }

  const exitCustomMode = () => {
    setCustomMode(false)
    onChange("")
    buttonRef.current?.focus()
  }

  const allOptions = [
    ...PRESET_UNITS.map(u => ({ value: u, label: u })),
    { value: CUSTOM_SENTINEL, label: 'Annet…' },
  ]

  if (customMode) {
    return (
      <div className="flex gap-1 items-center">
        <input
          ref={customRef}
          type="text"
          placeholder="Enhet"
          className="input w-20"
          maxLength={20}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-outline btn-icon shrink-0"
          onClick={exitCustomMode}
          title="Tilbake til forhåndsdefinerte enheter"
        >
          <RotateCcw size={12} />
        </button>
      </div>
    )
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={menuOpen ? closeMenu : openMenu}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); openMenu() }
        }}
        className="input w-24 flex items-center gap-1 cursor-pointer shrink-0"
      >
        <span className={`flex-1 text-left text-sm${!value ? ' text-text-faint' : ''}`}>
          {value || 'Enhet'}
        </span>
        <FaChevronDown className={`shrink-0 w-3 h-3 text-text-muted transition-transform duration-150${menuOpen ? ' rotate-180' : ''}`} />
      </button>

      {menuMounted && createPortal(
        <div
          ref={panelRef}
          style={panelStyle}
          onKeyDown={handlePanelKeyDown}
          tabIndex={-1}
          className={`fixed z-50 card rounded-md flex flex-col p-1 shadow-lg outline-none ${menuOpen ? 'animate-dropdown-in' : 'animate-dropdown-out'}`}
        >
          {allOptions.map((opt, i) => (
            <button
              key={opt.value}
              ref={(el) => { optionRefs.current[i] = el }}
              type="button"
              tabIndex={-1}
              onClick={() => handleSelect(opt.value)}
              className={`relative flex items-center text-left pl-4 pr-3 py-1.5 rounded-[calc(var(--radius-md)-2px)] small-text transition-colors hover:bg-surface-raised cursor-pointer${
                opt.value !== CUSTOM_SENTINEL && value === opt.value
                  ? ' font-semibold text-text'
                  : ' text-text-muted'
              }${opt.value === CUSTOM_SENTINEL ? ' border-t border-border mt-1 pt-2' : ''}`}
            >
              {opt.value !== CUSTOM_SENTINEL && value === opt.value && (
                <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-3/5 rounded-full bg-secondary" />
              )}
              {opt.label}
            </button>
          ))}
        </div>,
        document.body
      )}
    </>
  )
}

// ── MeasurementInput ─────────────────────────────────────────────────────────

type Props = {
  name: string
  value: string
  unit: string
  onChange: (field: "name" | "value" | "unit", val: string) => void
  onDelete: () => void
  onRevert?: () => void
  originalMeasure?: Measure
}

export default function MeasurementInput({ name, value, unit, onChange, onDelete, onRevert, originalMeasure }: Props) {
  const hasChanges = originalMeasure !== undefined && (
    name  !== originalMeasure.name  ||
    value !== originalMeasure.value ||
    unit  !== originalMeasure.unit
  )
  const canRevert = onRevert !== undefined && hasChanges

  return (
    <div className="flex flex-row gap-2 items-center bg-surface border border-border rounded-md p-2">
      <input
        type="text"
        placeholder="Navn"
        className="input min-w-0 flex-1"
        maxLength={50}
        value={name}
        onChange={e => onChange("name", e.target.value)}
      />
      <input
        type="text"
        placeholder="Verdi"
        className="input w-24 shrink-0"
        maxLength={30}
        value={value}
        onChange={e => onChange("value", e.target.value)}
      />

      <UnitDropdown value={unit} onChange={v => onChange("unit", v)} />

      <button
        type="button"
        onClick={onRevert}
        title="Tilbakestill mål"
        className={`overflow-hidden transition-all duration-150 text-text-faint hover:text-text rounded flex items-center justify-center shrink-0 ${canRevert ? 'w-6 h-6 opacity-100 cursor-pointer' : 'w-0 opacity-0 pointer-events-none'}`}
      >
        <RotateCcw size={14} className="shrink-0" />
      </button>

      <button
        type="button"
        className="btn btn-error btn-icon shrink-0"
        onClick={onDelete}
      >
        <FaMinus />
      </button>
    </div>
  )
}
