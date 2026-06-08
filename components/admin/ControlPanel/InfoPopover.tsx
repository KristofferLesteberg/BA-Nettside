'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { IconClose, IconInfo } from '@/app/lib/icons'

interface Props {
  content: string
}

export function InfoPopover({ content }: Props) {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => {
    setVisible(false)
    setTimeout(() => {
      setOpen(false)
      triggerRef.current?.focus()
    }, 200)
  }, [])

  const handleOpen = () => {
    setOpen(true)
    setVisible(true)
  }

  useEffect(() => {
    if (!open) return

    const raf = requestAnimationFrame(() => closeBtnRef.current?.focus())

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
        return
      }
      if (e.key === 'Tab') {
        const focusable = Array.from(
          dialogRef.current?.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          ) ?? []
        )
        if (focusable.length === 0) { e.preventDefault(); return }
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, close])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={handleOpen}
        className="text-text-faint hover:text-text-muted transition-colors"
        aria-label="Mer informasjon"
        aria-haspopup="dialog"
      >
        <IconInfo size={14} aria-hidden="true" />
      </button>

      {open && typeof document !== 'undefined' && createPortal(
        <div
          className={`fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-xs ${visible ? 'animate-popup-in' : 'animate-popup-out'}`}
          onClick={close}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="info-popover-title"
            className="card relative bg-surface-overlay shadow-2xl p-6 mx-4 w-full max-w-80 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <span id="info-popover-title" className="sr-only">Informasjon</span>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={close}
              className="btn btn-outline btn-icon absolute top-3 right-3"
              aria-label="Lukk"
            >
              <IconClose size={16} aria-hidden="true" />
            </button>
            <p className="text-sm text-text pr-8">{content}</p>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
