"use client"
import { useState, useRef, useEffect } from "react"
import { EducationField, ProjectRequest, Status } from "@/generated/prisma"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { deleteProject, updateProjectStatus } from "@/actions/projects"
import { generateProjectPdf } from "@/actions/pdf"
import { usePopUp } from "@/components/shared/PopUp"
import { FaEllipsisVertical, FaFilePdf, FaTrash, FaHelmetSafety, FaRoad, FaCoins, FaCalendarDays, FaChevronDown, FaQuestion, FaEnvelope, FaPhone, FaLocationDot, FaFileInvoice, FaSpinner } from "react-icons/fa6"
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
  NEW:         'badge badge-md badge-status-new',
  IN_PROGRESS: 'badge badge-md badge-status-progress',
  COMPLETE:    'badge badge-md badge-success',
}

const EDUCATION_LABELS: Record<EducationField, string> = {
  BUILDING:     'Bygg',
  CONSTRUCTION: 'Anlegg',
}

const EDUCATION_ICONS: Record<EducationField, React.ReactNode> = {
  BUILDING:     <FaHelmetSafety className="shrink-0" aria-hidden="true" />,
  CONSTRUCTION: <FaRoad         className="shrink-0" aria-hidden="true" />,
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

  const [isGenerating, setIsGenerating] = useState(false)

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

  const handleDownloadPdf = async () => {
    setIsGenerating(true)
    try {
      const bytes = await generateProjectPdf(project.id)
      const blob  = new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' })
      const url   = URL.createObjectURL(blob)
      const a     = document.createElement('a')
      const surname = project.clientSurname.toLowerCase()
        .replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a')
        .replace(/[^a-z0-9]/g, '')
      a.href     = url
      a.download = `prosjekt-${project.id.slice(0, 8)}-${surname}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch {
      toast.error('Kunne ikke generere PDF')
    } finally {
      setIsGenerating(false)
    }
  }

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
    <div className="card card-subtle py-3 px-5" role="article" aria-label={project.title}>
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
            <span className="badge badge-neutral gap-1.5">
              {project.educationField ? EDUCATION_ICONS[project.educationField] : <FaQuestion className="shrink-0" aria-hidden="true" />}
              {project.educationField ? EDUCATION_LABELS[project.educationField] : 'Ingen linje'}
            </span>
          </div>
        </div>

        {/* Middle: badges + date + price — hidden on small screens */}
        <div className="hidden md:flex items-center shrink-0">
          <div className="w-px self-stretch bg-border" />

          <div className="flex items-center gap-2">
            <div className="w-28 flex justify-center -mr-1.5">
              <span className={STATUS_STYLES[project.status]}>
                {STATUS_LABELS[project.status]}
              </span>
            </div>

            <div className="w-28 flex justify-center -ml-1.5">
              <span className="badge badge-md badge-neutral gap-1.5">
                {project.educationField ? EDUCATION_ICONS[project.educationField] : <FaQuestion className="shrink-0" aria-hidden="true" />}
                {project.educationField ? EDUCATION_LABELS[project.educationField] : 'Ingen linje'}
              </span>
            </div>

            <div className="w-px self-stretch bg-border mx-1" />

            <div className="flex flex-col gap-0.5">
              <span className="flex items-center gap-1.5 small-text text-muted whitespace-nowrap">
                <FaCalendarDays className="text-text-faint shrink-0" aria-hidden="true" />
                {formatDate(project.createdAt)}
              </span>
              <span className="flex items-center gap-1.5 small-text text-text whitespace-nowrap font-medium">
                <FaCoins className="text-text-faint shrink-0" aria-hidden="true" />
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
            aria-label="Se detaljer"
          >
            <FaEllipsisVertical className="w-5 h-5" aria-hidden="true" />
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={isGenerating}
            className="md:hidden btn btn-ghost p-2 disabled:opacity-50"
            title="Last ned PDF"
            aria-label="Last ned PDF"
          >
            {isGenerating
              ? <FaSpinner className="w-5 h-5 animate-spin" aria-hidden="true" />
              : <FaFilePdf className="w-5 h-5" aria-hidden="true" />
            }
          </button>

          <div ref={menuRef} className="relative">
            <button
              onClick={menuOpen ? closeMenu : openMenu}
              className="btn btn-ghost p-2"
              title="Endre status"
              aria-label="Endre status"
              aria-expanded={menuOpen}
              aria-haspopup="true"
            >
              <RiProgress3Line className="w-5 h-5" aria-hidden="true" />
            </button>

            {menuMounted && (
              <div role="menu" className={`absolute top-full right-0 mt-1 z-10 card rounded-md flex flex-col p-1 min-w-40 shadow-lg ${menuOpen ? 'animate-dropdown-in' : 'animate-dropdown-out'}`}>
                {ALL_STATUSES.map(s => (
                  <button
                    key={s}
                    role="menuitem"
                    onClick={() => handleStatusChange(s)}
                    className={`relative text-left pl-4 pr-3 py-2 rounded-[calc(var(--radius-md)-2px)] small-text transition-colors hover:bg-surface-raised cursor-pointer ${project.status === s ? 'font-semibold text-text' : 'text-text-muted'}`}
                    aria-current={project.status === s ? 'true' : undefined}
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
            aria-label="Slett prosjekt"
          >
            <FaTrash className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile accordion — hidden on md+ */}
      <div className="md:hidden mt-2 flex flex-col">
        {/* Detaljer */}
        <div className="border-t border-border">
          <button
            onClick={() => setDetailsOpen(v => !v)}
            className="group flex items-center justify-between w-full py-2 small-text font-medium text-text"
            aria-expanded={detailsOpen}
            aria-controls={`project-details-${project.id}`}
          >
            Detaljer
            <FaChevronDown className={`w-3 h-3 text-text-faint transition-all duration-150 group-hover:scale-125 group-hover:text-text-muted ${detailsOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
          <div id={`project-details-${project.id}`} className={`grid transition-[grid-template-rows] duration-200 ${detailsOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
            <div className="overflow-hidden min-h-0">
              <div className="flex flex-col gap-1.5 pb-2">
                <span className="flex items-center gap-1.5 small-text text-muted">
                  <FaCalendarDays className="text-text-faint shrink-0" aria-hidden="true" />
                  {formatDate(project.createdAt)}
                </span>
                <span className="flex items-center gap-1.5 small-text text-text font-medium">
                  <FaCoins className="text-text-faint shrink-0" aria-hidden="true" />
                  {priceRange}
                </span>
                {project.billingAddress && (
                  <span className="flex items-center gap-1.5 small-text text-muted">
                    <FaFileInvoice className="text-text-faint shrink-0" aria-hidden="true" />
                    {project.billingAddress}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Kontakt */}
        <div className="border-t border-border">
          <button
            onClick={() => setKontaktOpen(v => !v)}
            className="group flex items-center justify-between w-full py-2 small-text font-medium text-text"
            aria-expanded={kontaktOpen}
            aria-controls={`project-kontakt-${project.id}`}
          >
            Kontakt
            <FaChevronDown className={`w-3 h-3 text-text-faint transition-all duration-150 group-hover:scale-125 group-hover:text-text-muted ${kontaktOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
          <div id={`project-kontakt-${project.id}`} className={`grid transition-[grid-template-rows] duration-200 ${kontaktOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
            <div className="overflow-hidden min-h-0">
              <div className="flex flex-col gap-1.5 pb-2">
                {project.clientEmail && (
                  <span className="flex items-center gap-1.5 small-text text-muted">
                    <FaEnvelope className="text-text-faint shrink-0" aria-hidden="true" />
                    {project.clientEmail}
                  </span>
                )}
                {project.clientPhone && (
                  <span className="flex items-center gap-1.5 small-text text-muted">
                    <FaPhone className="text-text-faint shrink-0" aria-hidden="true" />
                    {project.clientPhone}
                  </span>
                )}
                {project.address && (
                  <span className="flex items-center gap-1.5 small-text text-muted">
                    <FaLocationDot className="text-text-faint shrink-0" aria-hidden="true" />
                    {project.address}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
