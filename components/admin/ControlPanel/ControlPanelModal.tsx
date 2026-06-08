'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { IconClose } from '@/app/lib/icons'
import SeedSection from './SeedSection'
import ConfigSection from './ConfigSection'
import DeleteSection from './DeleteSection'

interface Props {
  open: boolean
  onClose: () => void
}

export default function ControlPanelModal({ open, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [shouldRender, setShouldRender] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const wasOpenRef = useRef(false)

  useEffect(() => {
    if (open) {
      wasOpenRef.current = true
      setShouldRender(true)
      setIsClosing(false)
    } else if (wasOpenRef.current) {
      setIsClosing(true)
      const t = setTimeout(() => {
        setShouldRender(false)
        setIsClosing(false)
      }, 200)
      return () => clearTimeout(t)
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    const previousFocus = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'

    const raf = requestAnimationFrame(() => {
      const firstFocusable = modalRef.current?.querySelector<HTMLElement>(
        'button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      )
      firstFocusable?.focus()
    })

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (e.key === 'Tab') {
        const focusable = Array.from(
          modalRef.current?.querySelectorAll<HTMLElement>(
            'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
          ) ?? []
        )
        if (focusable.length === 0) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      cancelAnimationFrame(raf)
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
      previousFocus?.focus()
    }
  }, [open, onClose])

  if (!shouldRender || typeof document === 'undefined') return null

  return createPortal(
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="control-panel-title"
      className={`fixed inset-0 z-50 bg-bg overflow-y-auto ${isClosing ? 'animate-popup-out' : 'animate-fade-in'}`}
    >
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-surface border-b border-default shadow-b-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between py-4">
          <h1 id="control-panel-title" className="heading-3">Kontrollpanel</h1>
          <button
            onClick={onClose}
            className="btn btn-outline btn-icon"
            aria-label="Lukk kontrollpanel"
          >
            <IconClose size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-10">
        <SeedSection />
        <hr className="border-default" aria-hidden="true" />
        <ConfigSection />
        <hr className="border-default" aria-hidden="true" />
        <DeleteSection />
      </div>
    </div>,
    document.body
  )
}
