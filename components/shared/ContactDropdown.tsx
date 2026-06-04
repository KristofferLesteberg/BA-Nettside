"use client"
import { useState, useRef, useEffect, forwardRef } from "react"
import { createPortal } from "react-dom"
import { IconChevronDown } from "@/app/lib/icons"
import type { ContactPerson } from "@/generated/prisma"

interface Props {
  contacts: ContactPerson[]
  value: string
  onChange: (id: string) => void
  placeholder?: string
  className?: string
}

const ContactDropdown = forwardRef<HTMLDivElement, Props>(
  ({ contacts, value, onChange, placeholder = 'Velg kontakt person', className }, ref) => {
    const innerRef   = useRef<HTMLDivElement>(null)
    const buttonRef  = useRef<HTMLButtonElement>(null)
    const panelRef   = useRef<HTMLDivElement>(null)
    const optionRefs = useRef<(HTMLButtonElement | null)[]>([])
    const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

    const [menuMounted, setMenuMounted] = useState(false)
    const [menuOpen,    setMenuOpen]    = useState(false)
    const [panelStyle,  setPanelStyle]  = useState<React.CSSProperties>({})

    const allOptions = [
      { id: '', name: 'Ingen kontakt person', title: '' },
      ...contacts.map(c => ({ id: String(c.id), name: c.name, title: c.title ?? '' })),
    ]

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
      if (!menuOpen) return
      requestAnimationFrame(() => panelRef.current?.focus())
    }, [menuOpen])

    useEffect(() => {
      if (!menuMounted) return
      const onDown = (e: MouseEvent) => {
        const target = e.target as Node
        if (!innerRef.current?.contains(target) && !panelRef.current?.contains(target))
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

    const handleSelect = (id: string) => {
      onChange(id)
      closeMenu()
      buttonRef.current?.focus()
    }

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
        e.preventDefault()
        closeMenu()
        buttonRef.current?.focus()
      }
    }

    const mergeRef = (node: HTMLDivElement | null) => {
      innerRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) (ref as { current: HTMLDivElement | null }).current = node
    }

    const selected = contacts.find(c => String(c.id) === value)

    return (
      <div ref={mergeRef} className={className}>
        <button
          ref={buttonRef}
          type="button"
          onClick={menuOpen ? closeMenu : openMenu}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
              e.preventDefault()
              openMenu()
            }
          }}
          className="input w-full flex items-center gap-2 cursor-pointer"
        >
          <span className={`flex-1 text-left${!value ? ' text-text-faint' : ''}`}>
            {selected ? selected.name : placeholder}
          </span>
          <IconChevronDown className={`shrink-0 w-3 h-3 text-text-muted transition-transform duration-150${menuOpen ? ' rotate-180' : ''}`} />
        </button>

        {menuMounted && createPortal(
          <div
            ref={panelRef}
            style={panelStyle}
            onKeyDown={handlePanelKeyDown}
            tabIndex={-1}
            className={`fixed z-50 card p-2 rounded-md shadow-lg outline-none ${menuOpen ? 'animate-dropdown-in' : 'animate-dropdown-out'}`}
          >
            <div className="flex flex-col p-1 overflow-y-auto max-h-64">
              {allOptions.map((opt, i) => (
                <button
                  key={opt.id || '__none__'}
                  ref={(el) => { optionRefs.current[i] = el }}
                  type="button"
                  tabIndex={-1}
                  onClick={() => handleSelect(opt.id)}
                  className={`relative flex flex-col items-start text-left pl-4 pr-3 py-2 rounded-[calc(var(--radius-md)-2px)] transition-colors hover:bg-surface-raised cursor-pointer${value === opt.id ? ' text-text' : ' text-text-muted'}`}
                >
                  {value === opt.id && (
                    <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-3/5 rounded-full bg-secondary" />
                  )}
                  <span className={`small-text${value === opt.id ? ' font-semibold' : ''}`}>{opt.name}</span>
                  {opt.title && <span className="text-xs text-text-faint">{opt.title}</span>}
                </button>
              ))}
            </div>
          </div>,
          document.body
        )}
      </div>
    )
  }
)

ContactDropdown.displayName = 'ContactDropdown'
export default ContactDropdown
