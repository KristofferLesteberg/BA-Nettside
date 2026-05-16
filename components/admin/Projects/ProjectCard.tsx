"use client"
import { useState, useRef, useEffect } from "react"
import { EducationField, ProjectRequest, Status } from "@/generated/prisma"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { deleteProject, updateProjectStatus } from "@/actions/projects"
import { usePopUp } from "@/components/shared/PopUp"
import { FaEye, FaTrash, FaHelmetSafety, FaRoad, FaCoins, FaCalendarDays, FaChevronDown } from "react-icons/fa6"
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
  if (kr < 5000) return kr.toLocaleString('nb-NO')
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

  const [menuMounted,  setMenuMounted]  = useState(false)
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [detailsOpen,  setDetailsOpen]  = useState(false)
  const [kontaktOpen,  setKontaktOpen]  = useState(false)
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

  const priceRange = `${formatPrice(project.minPrice)} – ${formatPrice(project.maxPrice)} kr`
  const shortId    = project.id.slice(0, 8)

  return (
    <div className="card card-subtle py-3 px-5">
      {popUpElement}

      {/* Main row */}
      <div className="flex items-center">
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
          <div className="md:hidden flex items-center gap-2 flex-wrap mt-1.5">
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
        </div>

        {/* Middle: badges + date + price — hidden on small screens */}
        <div className="hidden md:flex items-center shrink-0">
          <div className="w-px self-stretch bg-border mx-5" />

          <div className="flex items-center gap-2.5">
            <span className={STATUS_STYLES[project.status]}>
              {STATUS_LABELS[project.status]}
            </span>

            {project.educationField && (
              <span className="badge badge-neutral gap-1.5">
                {EDUCATION_ICONS[project.educationField]}
                {EDUCATION_LABELS[project.educationField]}
              </span>
            )}

            <div className="w-px self-stretch bg-border mx-1" />

            <div className="flex flex-col gap-0.5">
              <span className="flex items-center gap-1.5 small-text text-muted whitespace-nowrap">
                <FaCalendarDays className="text-text-faint shrink-0" />
                {formatDate(project.createdAt)}
              </span>
              <span className="flex items-center gap-1.5 small-text text-text whitespace-nowrap font-medium">
                <FaCoins className="text-text-faint shrink-0" />
                {priceRange}
              </span>
            </div>
          </div>

          <div className="w-px self-stretch bg-border mx-5" />
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-0.5 shrink-0">
          <button
            onClick={() => onView(project)}
            className="hidden md:flex btn btn-ghost p-2"
            title="Se detaljer"
          >
            <FaEye className="w-5 h-5" />
          </button>

          <div ref={menuRef} className="relative">
            <button
              onClick={menuOpen ? closeMenu : openMenu}
              className="btn btn-ghost p-2"
              title="Endre status"
            >
              <RiProgress3Line className="w-5 h-5" />
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
            <FaTrash className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile accordion — hidden on md+ */}
      <div className="md:hidden mt-2 flex flex-col">
        {/* Detaljer */}
        <div className="border-t border-border">
          <button
            onClick={() => setDetailsOpen(v => !v)}
            className="flex items-center justify-between w-full py-2 small-text font-medium text-text"
          >
            Detaljer
            <FaChevronDown className={`w-3 h-3 text-text-faint transition-transform duration-150 ${detailsOpen ? 'rotate-180' : ''}`} />
          </button>
          {detailsOpen && (
            <div className="flex flex-col gap-1.5 pb-2">
              <span className="flex items-center gap-1.5 small-text text-muted">
                <FaCalendarDays className="text-text-faint shrink-0" />
                {formatDate(project.createdAt)}
              </span>
              <span className="flex items-center gap-1.5 small-text text-text font-medium">
                <FaCoins className="text-text-faint shrink-0" />
                {priceRange}
              </span>
              {project.billingAddress && (
                <p className="small-text text-muted">{project.billingAddress}</p>
              )}
            </div>
          )}
        </div>

        {/* Kontakt */}
        <div className="border-t border-border">
          <button
            onClick={() => setKontaktOpen(v => !v)}
            className="flex items-center justify-between w-full py-2 small-text font-medium text-text"
          >
            Kontakt
            <FaChevronDown className={`w-3 h-3 text-text-faint transition-transform duration-150 ${kontaktOpen ? 'rotate-180' : ''}`} />
          </button>
          {kontaktOpen && (
            <div className="flex flex-col gap-1.5 pb-2">
              {project.clientEmail && (
                <p className="small-text text-muted">{project.clientEmail}</p>
              )}
              {project.clientPhone && (
                <p className="small-text text-muted">{project.clientPhone}</p>
              )}
              {project.address && (
                <p className="small-text text-muted">{project.address}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
