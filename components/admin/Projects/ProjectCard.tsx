"use client"
import { useState, useRef, useEffect } from "react"
import { EducationField, ProjectRequest, Status } from "@/generated/prisma"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { deleteProject, updateProjectStatus } from "@/actions/projects"
import { usePopUp } from "@/components/shared/PopUp"

export type SerializedProject = Omit<ProjectRequest, 'minPrice' | 'maxPrice' | 'createdAt'> & {
  minPrice: number
  maxPrice: number
  createdAt: string
}

const STATUS_LABELS: Record<Status, string> = {
  NEW: 'Nytt prosjekt',
  IN_PROGRESS: "Pågående",
  COMPLETE: "Ferdig"
}

const STATUS_STYLES: Record<Status, string> = {
  NEW: 'badge badge-success',
  IN_PROGRESS: 'badge badge-warning',
  COMPLETE: 'badge badge-info'
}

const EDUCATION_LABELS: Record<EducationField, string> = {
  BUILDING: "BYGG",
  CONSTRUCTION: "ANNLEGG"
}

const EDUCATION_STYLES: Record<EducationField, string> = {
  BUILDING:     'badge-secondary',
  CONSTRUCTION: 'badge-primary',
}

const ALL_STATUSES: Status[] = ['NEW', 'IN_PROGRESS', 'COMPLETE']

const ProjectCard = ({ project }: { project: SerializedProject }) => {
  const router = useRouter()
  const { open: openPopUp, element: popUpElement } = usePopUp()
  const formatted = new Date(project.createdAt)

  const [menuMounted, setMenuMounted] = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const menuRef    = useRef<HTMLDivElement>(null)

  const openMenu = () => {
    clearTimeout(closeTimer.current)
    setMenuMounted(true)
    setMenuOpen(true)
  }

  const closeMenu = () => {
    setMenuOpen(false)
    closeTimer.current = setTimeout(() => setMenuMounted(false), 150)
  }

  useEffect(() => {
    if (!menuMounted) return
    const onDown   = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) closeMenu()
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

  const handleDelete = async () => {
    try {
      await deleteProject(project.id)
      toast.success("Fjernet prosjekt!")
      router.refresh()
    } catch {
      toast.error("Kunne ikke slette prosjekt")
    }
  }

  const handleStatusChange = async (status: Status) => {
    closeMenu()
    if (status === project.status) return
    try {
      await updateProjectStatus(project.id, status)
      toast.success("Oppdatert status")
      router.refresh()
    } catch {
      toast.error("Kunne ikke endre status")
    }
  }

  return (
    <div className="card card-subtle flex flex-col gap-4">
      {popUpElement}

      {/* Badges + title + actions */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className={STATUS_STYLES[project.status]}>{STATUS_LABELS[project.status]}</span>
          {project.educationField && (
            <span className={`badge ${EDUCATION_STYLES[project.educationField]}`}>
              {EDUCATION_LABELS[project.educationField]}
            </span>
          )}
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="heading-3">
              {project.clientForename} {project.clientSurname}
              {project.organizationName
                ? <span className="label ml-2">{project.organizationName}</span>
                : <span className="small-text text-muted ml-2">Privat</span>
              }
            </h2>
            <p className="small-text mt-0.5">Sendt inn {formatted.toLocaleDateString()}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div ref={menuRef} className="relative">
              <button
                className="btn btn-outline"
                onClick={menuOpen ? closeMenu : openMenu}
              >
                Endre status
              </button>

              {menuMounted && (
                <div className={`absolute bottom-0 right-[-4px] z-10 card rounded-[var(--radius-md)] flex flex-col p-1 min-w-[calc(100%+8px)] shadow-lg ${menuOpen ? 'animate-dropdown-in' : 'animate-dropdown-out'}`}>
                  {ALL_STATUSES.map(s => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(s)}
                      className={`relative text-left pl-4 pr-3 py-2 rounded-[calc(var(--radius-md)-2px)] small-text transition-colors hover:bg-surface-raised cursor-pointer ${project.status === s ? 'font-semibold text-text' : 'text-text-muted'}`}
                    >
                      {project.status === s && (
                        <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-3/5 rounded-full bg-secondary" />
                      )}
                      {STATUS_LABELS[s]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="btn btn-error" onClick={() => openPopUp({
              title: "Slett prosjektet?",
              subtitle: "Er du sikker på at du vil slette dette prosjektet? Denne handlingen kan ikke angres.",
              yesLabel: "Ja, slett",
              noLabel: "Nei, behold",
              onYes: handleDelete
            })}>
              Fjern
            </button>
          </div>
        </div>
      </div>

      <hr />

      {/* Info grid */}
      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col gap-1">
          <span className="label">Kontakt</span>
          <p className="small-text">Mail: {project.clientEmail}</p>
          <p className="small-text">Tlf: {project.clientPhone}</p>
          <p className="small-text">Adr. {project.address}</p>
        </div>
        <div className="flex flex-col gap-1">
          <span className="label">Info</span>
          <p className="small-text">{project.description.slice(0, 4)}...</p>
        </div>
        <div className="flex flex-col gap-1">
          <span className="label">Pris</span>
          <p className="small-text">{Number(project.minPrice)}kr – {Number(project.maxPrice)}kr</p>
        </div>
      </div>

    </div>
  )
}

export default ProjectCard
