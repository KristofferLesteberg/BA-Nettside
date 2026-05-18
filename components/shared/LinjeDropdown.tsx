"use client"
import { useState, useRef, useEffect, forwardRef } from "react"
import { createPortal } from "react-dom"
import { FaWrench, FaHelmetSafety, FaRoad, FaChevronDown } from "react-icons/fa6"
import { GiBrickWall } from "react-icons/gi"
import type { EducationField } from "@/generated/prisma"
import { EDUCATION_FIELD_LABELS, EDUCATION_FIELD_OPTIONS } from "@/app/lib/education-fields"

const ICONS: Record<EducationField, React.ReactNode> = {
  PLUMBER:      <FaWrench       className="shrink-0" />,
  CONCRETE:     <GiBrickWall    className="shrink-0" />,
  CARPENTER:    <FaHelmetSafety className="shrink-0" />,
  CONSTRUCTION: <FaRoad         className="shrink-0" />,
}

interface Props {
  value: string
  onChange: (value: string) => void
  nullable?: boolean
  placeholder?: string
  className?: string
}

const LinjeDropdown = forwardRef<HTMLDivElement, Props>(
  ({ value, onChange, nullable = false, placeholder = 'Velg linje', className }, ref) => {
    const innerRef   = useRef<HTMLDivElement>(null)
    const buttonRef  = useRef<HTMLButtonElement>(null)
    const panelRef   = useRef<HTMLDivElement>(null)
    const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

    const [menuMounted, setMenuMounted] = useState(false)
    const [menuOpen,    setMenuOpen]    = useState(false)
    const [panelStyle,  setPanelStyle]  = useState<React.CSSProperties>({})

    const openMenu = () => {
      clearTimeout(closeTimer.current)
      if (buttonRef.current) {
        const r = buttonRef.current.getBoundingClientRect()
        setPanelStyle({ top: r.bottom + 4, left: r.left, width: r.width })
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
      const onDown = (e: MouseEvent) => {
        const target = e.target as Node
        const insideTrigger = innerRef.current?.contains(target)
        const insidePanel   = panelRef.current?.contains(target)
        if (!insideTrigger && !insidePanel) closeMenu()
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

    const handleSelect = (v: string) => {
      onChange(v)
      closeMenu()
    }

    const mergeRef = (node: HTMLDivElement | null) => {
      innerRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
    }

    const icon = value ? ICONS[value as EducationField] : null

    return (
      <div ref={mergeRef} className={className}>
        <button
          ref={buttonRef}
          type="button"
          onClick={menuOpen ? closeMenu : openMenu}
          className="input w-full flex items-center gap-2 cursor-pointer"
        >
          {icon}
          <span className={`flex-1 text-left${!value ? ' text-text-faint' : ''}`}>
            {value
              ? EDUCATION_FIELD_LABELS[value as EducationField]
              : (nullable ? 'Ikke spesifisert' : placeholder)
            }
          </span>
          <FaChevronDown className={`shrink-0 w-3 h-3 text-text-muted transition-transform duration-150${menuOpen ? ' rotate-180' : ''}`} />
        </button>

        {menuMounted && createPortal(
          <div
            ref={panelRef}
            style={panelStyle}
            className={`fixed z-50 card rounded-md flex flex-col p-1 shadow-lg ${menuOpen ? 'animate-dropdown-in' : 'animate-dropdown-out'}`}
          >
            {nullable && (
              <button
                type="button"
                onClick={() => handleSelect('')}
                className={`relative text-left pl-4 pr-3 py-2 rounded-[calc(var(--radius-md)-2px)] small-text transition-colors hover:bg-surface-raised cursor-pointer${!value ? ' font-semibold text-text' : ' text-text-muted'}`}
              >
                {!value && <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-3/5 rounded-full bg-secondary" />}
                Ikke spesifisert
              </button>
            )}
            {EDUCATION_FIELD_OPTIONS.map(opt => (
              <button
                type="button"
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`relative flex items-center gap-2 text-left pl-4 pr-3 py-2 rounded-[calc(var(--radius-md)-2px)] small-text transition-colors hover:bg-surface-raised cursor-pointer${value === opt.value ? ' font-semibold text-text' : ' text-text-muted'}`}
              >
                {value === opt.value && <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-3/5 rounded-full bg-secondary" />}
                {ICONS[opt.value]}
                {opt.label}
              </button>
            ))}
          </div>,
          document.body
        )}
      </div>
    )
  }
)

LinjeDropdown.displayName = 'LinjeDropdown'
export default LinjeDropdown
