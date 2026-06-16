"use client"

import { useEffect, useRef, useState } from 'react'
import { IconDelete, IconPlus, IconPerson } from "@/app/lib/icons"
import { usePopUp } from "@/components/shared/PopUp"
import { deleteOrderNote } from "@/actions/orderNotes"
import AddNoteModal from "./AddNoteModal"
import toast from "react-hot-toast"
import type { OrderNote } from "@/generated/prisma"

type NoteItem = OrderNote & { removing?: boolean; born?: boolean }

function formatTimestamp(date: Date) {
  return new Intl.DateTimeFormat('nb-NO', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  }).format(date)
}

interface Props {
  orderId: number
  initialNotes: OrderNote[]
  open: boolean
}

export default function OrderNotesTimeline({ orderId, initialNotes, open }: Props) {
  const [notes, setNotes] = useState<NoteItem[]>(initialNotes)
  const [modalOpen, setModalOpen] = useState(false)
  const { open: openPopUp, element: popUpElement } = usePopUp()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open && scrollRef.current) scrollRef.current.scrollTop = 0
  }, [open])

  const handleCreated = (note: OrderNote) => {
    setNotes(prev => [...prev, { ...note, born: true }])
    requestAnimationFrame(() => {
      setNotes(prev => prev.map(n => n.id === note.id ? { ...n, born: false } : n))
    })
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    }, 320)
  }

  const handleDelete = async (id: number) => {
    try {
      await toast.promise(deleteOrderNote(id), {
        loading: 'Sletter notat…',
        success: 'Notat slettet',
        error: 'Kunne ikke slette notat',
      })
      setNotes(prev => prev.map(n => n.id === id ? { ...n, removing: true } : n))
      setTimeout(() => setNotes(prev => prev.filter(n => n.id !== id)), 200)
    } catch {}
  }

  return (
    <div className="flex flex-col gap-2">
      {popUpElement}
      <AddNoteModal
        orderId={orderId}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={handleCreated}
      />

      {notes.length === 0 ? (
        <p className="small-text text-faint italic">Ingen notater lagt til</p>
      ) : (
        <div ref={scrollRef} className="flex flex-col max-h-72 overflow-y-auto pr-1.5">
          {notes.map((note, i) => (
            <div
              key={note.id}
              className={`grid ease-out ${note.removing ? 'transition-[grid-template-rows] duration-200 grid-rows-[0fr]' : note.born ? 'grid-rows-[0fr]' : 'transition-[grid-template-rows] duration-300 grid-rows-[1fr]'}`}
            >
              <div className="overflow-hidden pl-3">
                <div className={`flex items-start gap-2 transition-opacity ${note.removing ? 'duration-200 opacity-0 pointer-events-none' : note.born ? 'opacity-0' : 'duration-300 opacity-100'}`}>
                  <div className="flex flex-col items-center self-stretch shrink-0">
                    <span className={`flex-1 w-0.5 rounded-full mb-1.5 ${i > 0 ? 'bg-secondary/25' : ''}`} />
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary ring-3 ring-secondary/15 shrink-0" />
                    <span className={`flex-1 w-0.5 rounded-full mt-1.5 ${i < notes.length - 1 ? 'bg-secondary/25' : ''}`} />
                  </div>

                  <div className="card-subtle flex-1 min-w-0 flex flex-col gap-1.5 p-3 mb-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0 flex-wrap">
                        <span className="small-text text-faint whitespace-nowrap">{formatTimestamp(new Date(note.createdAt))}</span>
                        {note.authorName && (
                          <span className="small-text text-muted flex items-center gap-1">
                            <IconPerson className="text-text-faint w-3 h-3 shrink-0" aria-hidden="true" />
                            {note.authorName}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => openPopUp({
                          title: "Slett notatet?",
                          subtitle: "Er du sikker på at du vil slette dette notatet? Denne handlingen kan ikke angres.",
                          yesLabel: "Ja, slett",
                          noLabel: "Nei, behold",
                          onYes: () => handleDelete(note.id),
                        })}
                        className="btn btn-ghost p-1.5 text-error hover:bg-error-bg shrink-0"
                        title="Slett notat"
                        aria-label="Slett notat"
                      >
                        <IconDelete className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                    <p className="small-text text-text whitespace-pre-wrap">{note.text}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button type="button" className="btn btn-ghost gap-2 text-sm self-start" onClick={() => setModalOpen(true)}>
        <IconPlus size={12} />
        Legg til notat
      </button>
    </div>
  )
}
