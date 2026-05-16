"use client"
import { useState, useRef, useEffect } from "react"
import { EducationField, ProjectRequest, Status } from "@/generated/prisma"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { deleteProject, updateProjectStatus } from "@/actions/projects"
import { usePopUp } from "@/components/shared/PopUp"
import { FaEye, FaTrash, FaHelmetSafety, FaRoad } from "react-icons/fa6"
import { RiProgress3Line } from "react-icons/ri"

export type SerializedProject = Omit<ProjectRequest, 'minPrice' | 'maxPrice' | 'createdAt'> & {
  minPrice: number
  maxPrice: number
  createdAt: string
}

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

const ALL_STATUSES: Status[] = ['NEW', 'IN_PROGRESS', 'COMPLETE']

function formatPrice(kr: number): string {
  if (kr < 5000) return kr.toLocaleString('nb-NO') + ' kr'
  const base      = Math.floor(kr / 1000)
  const remainder = kr % 1000
  if (remainder < 150) return `${base}k`
  if (remainder >= 850) return `${base + 1}k`
  return `${base}.5k`
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('nb-NO', {
    weekday: 'short',
    day:     'numeric',
    month:   'long',
    year:    'numeric',
  })
}

const ProjectCard = ({ project, onView }: { project: SerializedProject; onView: (p: SerializedProject) => void }) => {
  const router = useRouter()
  const { open: openPopUp, element: popUpElement } = usePopUp()

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

  const priceRange = `${formatPrice(project.minPrice)} – ${formatPrice(project.maxPrice)}`
  const shortId    = project.id.slice(0, 8)

  return (
    <div className="card card-subtle flex items-center gap-4 py-3 px-4">
      {popUpElement}

      {/* Left: title, client, id */}
      <div className="flex-1 min-w-0">
        <p className="heading-4 truncate">{project.title}</p>
        <p className="small-text text-muted truncate">
          {project.clientForename} {project.clientSurname}
          {project.organizationName && (
            <span className="label ml-2">{project.organizationName}</span>
          )}
        </p>
        <p className="small-text text-faint font-mono mt-0.5">#{shortId}</p>
      </div>

      {/* Middle: badges + date + price — hidden on small screens */}
      <div className="hidden md:flex items-center gap-3 shrink-0">
        <span className={STATUS_STYLES[project.status]}>
          {STATUS_LABELS[project.status]}
        </span>

        {project.educationField && (
          <span className="badge badge-neutral gap-1.5">
            {EDUCATION_ICONS[project.educationField]}
            {EDUCATION_LABELS[project.educationField]}
          </span>
        )}

        <span className="small-text text-muted whitespace-nowrap">
          {formatDate(project.createdAt)}
        </span>

        <span className="small-text text-muted whitespace-nowrap font-medium">
          {priceRange}
        </span>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => onView(project)}
          className="btn btn-ghost p-2"
          title="Se detaljer"
        >
          <FaEye />
        </button>

        <div ref={menuRef} className="relative">
          <button
            onClick={menuOpen ? closeMenu : openMenu}
            className="btn btn-ghost p-2"
            title="Endre status"
          >
            <RiProgress3Line />
          </button>

          {menuMounted && (
            <div className={`absolute top-full right-0 mt-1 z-10 card rounded-[var(--radius-md)] flex flex-col p-1 min-w-40 shadow-lg ${menuOpen ? 'animate-dropdown-in' : 'animate-dropdown-out'}`}>
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

        <button
          onClick={() => openPopUp({
            title:    "Slett prosjektet?",
            subtitle: "Er du sikker på at du vil slette dette prosjektet? Denne handlingen kan ikke angres.",
            yesLabel: "Ja, slett",
            noLabel:  "Nei, behold",
            onYes:    handleDelete,
          })}
          className="btn btn-ghost p-2 text-error hover:bg-error-bg"
          title="Slett prosjekt"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  )
}

export default ProjectCard
