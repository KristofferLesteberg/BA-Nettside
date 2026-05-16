"use client"
import { useEffect } from "react"
import { FaXmark, FaHelmetSafety, FaRoad } from "react-icons/fa6"
import { EducationField, Status } from "@/generated/prisma"
import { type SerializedProject } from "./ProjectCard"

const STATUS_LABELS: Record<Status, string> = {
  NEW:         'Nytt prosjekt',
  IN_PROGRESS: 'Pågående',
  COMPLETE:    'Ferdig',
}

const STATUS_STYLES: Record<Status, string> = {
  NEW:         'badge badge-status-new',
  IN_PROGRESS: 'badge badge-status-progress',
  COMPLETE:    'badge badge-success',
}

const EDUCATION_LABELS: Record<EducationField, string> = {
  BUILDING:     'Bygg',
  CONSTRUCTION: 'Anlegg',
}

const EDUCATION_ICONS: Record<EducationField, React.ReactNode> = {
  BUILDING:     <FaHelmetSafety className="shrink-0" />,
  CONSTRUCTION: <FaRoad         className="shrink-0" />,
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('nb-NO', {
    weekday: 'short',
    day:     'numeric',
    month:   'long',
    year:    'numeric',
  })
}

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <div className="flex flex-col gap-0.5">
      <span className="label">{label}</span>
      <p className="small-text">{value}</p>
    </div>
  )
}

interface Props {
  project: SerializedProject | null
  onClose: () => void
}

export default function ProjectDrawer({ project, onClose }: Props) {
  const open = project !== null

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Drawer */}
      <aside className={`fixed top-0 right-0 h-full w-full max-w-md z-50 bg-bg border-l border-border shadow-xl flex flex-col overflow-y-auto transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {project && (
          <>
            <div className="flex items-start justify-between gap-4 p-5 border-b border-border sticky top-0 bg-bg">
              <div>
                <h2 className="heading-4">{project.title}</h2>
                <p className="small-text text-muted mt-0.5">
                  {project.clientForename} {project.clientSurname}
                </p>
              </div>
              <button onClick={onClose} className="btn btn-ghost p-2 shrink-0">
                <FaXmark />
              </button>
            </div>

            <div className="p-5 flex flex-col gap-6">
              {/* Status and linje */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className={STATUS_STYLES[project.status]}>
                  {STATUS_LABELS[project.status]}
                </span>
                {project.educationField && (
                  <span className="badge badge-neutral gap-1.5">
                    {EDUCATION_ICONS[project.educationField]}
                    {EDUCATION_LABELS[project.educationField]}
                  </span>
                )}
              </div>

              {/* Core details */}
              <div className="flex flex-col gap-3">
                <span className="label">Detaljer</span>
                <div className="card-subtle rounded-md p-4 flex flex-col gap-3">
                  <Field label="ID"             value={project.id} />
                  <Field label="Innsendt"        value={formatDate(project.createdAt)} />
                  <Field label="Prisforventning" value={`${Number(project.minPrice).toLocaleString('nb-NO')} – ${Number(project.maxPrice).toLocaleString('nb-NO')} kr`} />
                  <Field label="Fakturaadresse"  value={project.billingAddress} />
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-3">
                <span className="label">Beskrivelse</span>
                <div className="card-subtle rounded-md p-4">
                  <p className="small-text whitespace-pre-wrap">{project.description}</p>
                </div>
              </div>

              {/* Contact */}
              <div className="flex flex-col gap-3">
                <span className="label">Kontakt</span>
                <div className="card-subtle rounded-md p-4 flex flex-col gap-3">
                  <Field label="E-post"       value={project.clientEmail} />
                  <Field label="Telefon"      value={project.clientPhone} />
                  <Field label="Adresse"      value={project.address} />
                  {project.organizationName && (
                    <Field label="Organisasjon" value={project.organizationName} />
                  )}
                  {project.organizationNumber && (
                    <Field label="Org.nr."      value={project.organizationNumber} />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
