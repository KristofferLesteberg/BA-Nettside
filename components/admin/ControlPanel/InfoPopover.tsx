'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { IconInfo } from '@/app/lib/icons'

interface Props {
  content: string
  align?: 'left' | 'right'
}

export function InfoPopover({ content, align = 'left' }: Props) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  // Adjust position after render so the popover stays inside the viewport
  useLayoutEffect(() => {
    if (!open || !popoverRef.current) return
    const el = popoverRef.current
    const rect = el.getBoundingClientRect()
    const vw = window.innerWidth

    if (rect.right > vw - 8) {
      el.style.left = 'auto'
      el.style.right = '0'
    }
    if (rect.left < 8) {
      el.style.left = '0'
      el.style.right = 'auto'
    }
    if (rect.top < 8) {
      el.style.bottom = 'auto'
      el.style.top = '100%'
      el.style.marginBottom = '0'
      el.style.marginTop = '6px'
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onMouseDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={containerRef} className="relative inline-flex shrink-0">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="text-text-faint hover:text-text-muted transition-colors"
        aria-label="Mer informasjon"
        aria-expanded={open}
      >
        <IconInfo size={14} aria-hidden="true" />
      </button>
      {open && (
        <div
          ref={popoverRef}
          role="tooltip"
          className={`absolute bottom-full mb-1.5 z-20 w-64 p-3 card shadow-lg text-sm text-text animate-fade-in ${align === 'right' ? 'right-0' : 'left-0'}`}
        >
          {content}
        </div>
      )}
    </div>
  )
}
