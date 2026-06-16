"use client"

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { IconClose } from '@/app/lib/icons'
import { createOrderNote } from '@/actions/orderNotes'
import toast from 'react-hot-toast'
import type { OrderNote } from '@/generated/prisma'

interface Props {
  orderId: number
  open: boolean
  onClose: () => void
  onCreated: (note: OrderNote) => void
}

export default function AddNoteModal({ orderId, open, onClose, onCreated }: Props) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [text, setText] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [portalEl] = useState<HTMLDivElement | null>(() =>
    typeof document === 'undefined' ? null : document.createElement('div')
  )

  useEffect(() => {
    if (!portalEl) return
    document.body.appendChild(portalEl)
    return () => { document.body.removeChild(portalEl) }
  }, [portalEl])

  useEffect(() => {
    if (open) {
      setMounted(true)
      setVisible(true)
      setText('')
      setAuthorName('')
      Array.from(document.body.children).forEach(child => {
        if (child !== portalEl) child.setAttribute('inert', '')
      })
      return
    }
    setVisible(false)
    Array.from(document.body.children).forEach(child => child.removeAttribute('inert'))
    const t = setTimeout(() => setMounted(false), 200)
    return () => clearTimeout(t)
  }, [open, portalEl])

  useEffect(() => {
    if (!mounted) return
    cardRef.current?.focus()
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [mounted, onClose])

  const handleSubmit = async () => {
    if (!text.trim() || submitting) return
    setSubmitting(true)
    try {
      const note = await toast.promise(createOrderNote(orderId, { text, authorName }), {
        loading: 'Lagrer notat…',
        success: 'Notat lagt til',
        error: 'Kunne ikke lagre notat',
      })
      onCreated(note)
      onClose()
    } catch {
    } finally {
      setSubmitting(false)
    }
  }

  if (!mounted || !portalEl) return null

  return createPortal(
    <div
      onClick={(e) => { e.stopPropagation(); onClose() }}
      className={`fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-xs ${visible ? 'animate-popup-in' : 'animate-popup-out'}`}
    >
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-note-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="card relative bg-surface-overlay shadow-2xl flex flex-col gap-5 p-6 mx-4 w-full max-w-96 md:max-w-2/3 lg:max-w-1/3 animate-fade-in outline-none"
      >
        <button type="button" onClick={onClose} aria-label="Lukk" className="btn btn-outline btn-icon absolute top-3 right-3">
          <IconClose size={16} aria-hidden="true" />
        </button>

        <div className="flex flex-col items-center gap-2 pt-4">
          <p id="add-note-title" className="heading-3 text-text text-center">Legg til notat</p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="label">Notat</label>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Skriv et internt notat…"
              rows={4}
              autoFocus
              className="input resize-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="label">Signert av (valgfritt)</label>
            <input
              type="text"
              value={authorName}
              onChange={e => setAuthorName(e.target.value)}
              placeholder="Navn Etternavn"
              className="input"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="btn btn-outline p-2 flex-1">
            Avbryt
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!text.trim() || submitting}
            className="btn btn-primary p-2 flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Legg til notat
          </button>
        </div>
      </div>
    </div>,
    portalEl
  )
}
