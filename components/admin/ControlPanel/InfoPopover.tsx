'use client'

import { useEffect, useRef, useState } from 'react'
import { IconInfo } from '@/app/lib/icons'

interface Props {
  content: string
  align?: 'left' | 'right'
}

export function InfoPopover({ content, align = 'left' }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onMouseDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
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
    <div ref={ref} className="relative inline-flex shrink-0">
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
          role="tooltip"
          className={`absolute top-full mt-1.5 z-20 w-64 p-3 rounded-sm card shadow-md text-sm text-text animate-fade-in ${align === 'right' ? 'right-0' : 'left-0'}`}
        >
          {content}
        </div>
      )}
    </div>
  )
}
