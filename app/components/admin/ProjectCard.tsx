"use client"

import { ProjectRequest, Status } from "@/generated/prisma"
import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

type ConvertedProjectRequest = Omit<ProjectRequest, 'minPrice' | 'maxPrice' | 'createdAt'> & {
  minPrice: number
  maxPrice: number
  createdAt: string
}

type Props = {
  project: ConvertedProjectRequest
}

const STATUS_LABELS: Record<Status, string> = {
  NEW: "Ny",
  IN_PROGRESS: "Under behandling",
  COMPLETE: "Fullført",
}

const STATUS_BADGE: Record<Status, string> = {
  NEW: "badge badge-info",
  IN_PROGRESS: "badge badge-warning",
  COMPLETE: "badge badge-success",
}

const EDUCATION_LABELS: Record<string, string> = {
  BUILDING: "Bygg",
  CONSTRUCTION: "Anlegg",
}

export default function ProjectCard({ project }: Props) {
  const router = useRouter()
  const [status, setStatus] = useState<Status>(project.status)
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const createdAt = new Date(project.createdAt).toLocaleDateString("nb-NO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })

  async function handleStatusChange(newStatus: Status) {
    setLoading(true)
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error()
      setStatus(newStatus)
      toast.success("Status oppdatert")
    } catch {
      toast.error("Kunne ikke oppdatere status")
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!confirm(`Slett forespørsel fra ${project.clientForename} ${project.clientSurname}?`)) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/projects/${project.id}`, { method: "DELETE" })
      if (!res.ok) throw new Error()
      toast.success("Forespørsel slettet")
      router.refresh()
    } catch {
      toast.error("Kunne ikke slette forespørsel")
      setDeleting(false)
    }
  }

  return (
    <div className="card flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="heading-4">
              {project.clientForename} {project.clientSurname}
            </span>
            {project.organizationName && (
              <span className="small-text text-text-faint">— {project.organizationName}</span>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={STATUS_BADGE[status]}>{STATUS_LABELS[status]}</span>
            {project.educationField && (
              <span className="badge badge-neutral">
                {EDUCATION_LABELS[project.educationField] ?? project.educationField}
              </span>
            )}
            <span className="small-text text-text-faint">{createdAt}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="btn btn-outline text-xs px-2 py-1" onClick={() => setExpanded(v => !v)}>
            {expanded ? "Skjul" : "Detaljer"}
          </button>
          <button className="btn btn-error text-xs px-2 py-1" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Sletter..." : "Slett"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
        <div>
          <span className="text-text-faint">E-post: </span>
          <a href={`mailto:${project.clientEmail}`} className="text-link underline-offset-2 hover:underline">
            {project.clientEmail}
          </a>
        </div>
        <div>
          <span className="text-text-faint">Telefon: </span>
          <span>{project.clientPhone}</span>
        </div>
        <div>
          <span className="text-text-faint">Budsjett: </span>
          <span>{project.minPrice.toLocaleString("nb-NO")} – {project.maxPrice.toLocaleString("nb-NO")} kr</span>
        </div>
        <div>
          <span className="text-text-faint">Adresse: </span>
          <span>{project.address}</span>
        </div>
      </div>

      {expanded && (
        <div className="flex flex-col gap-3 border-t border-default pt-4">
          <div>
            <p className="label mb-1">Prosjekttittel</p>
            <p>{project.title}</p>
          </div>
          {project.description && (
            <div>
              <p className="label mb-1">Beskrivelse</p>
              <p className="body-text whitespace-pre-wrap">{project.description}</p>
            </div>
          )}
          {project.billingAddress && (
            <div>
              <p className="label mb-1">Fakturaadresse</p>
              <p>{project.billingAddress}</p>
            </div>
          )}
          {project.organizationNumber && (
            <div>
              <p className="label mb-1">Organisasjonsnummer</p>
              <p>{project.organizationNumber}</p>
            </div>
          )}
        </div>
      )}

      
    </div>
  )
}