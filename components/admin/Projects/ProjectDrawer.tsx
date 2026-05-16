"use client"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { FaXmark, FaHelmetSafety, FaRoad, FaFilePdf, FaTrash, FaQuestion, FaSpinner } from "react-icons/fa6"
import { RiProgress3Line } from "react-icons/ri"
import { EducationField, Status } from "@/generated/prisma"
import { deleteProject, updateProjectStatus } from "@/actions/projects"
import { generateProjectPdf } from "@/actions/pdf"
import { usePopUp } from "@/components/shared/PopUp"
import CopyButton from "@/components/shared/CopyButton"
import { type SerializedProject } from "./ProjectCard"

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
  BUILDING:     <FaHelmetSafety className="shrink-0" />,
  CONSTRUCTION: <FaRoad         className="shrink-0" />,
}

const ALL_STATUSES: Status[] = ['NEW', 'IN_PROGRESS', 'COMPLETE']

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('nb-NO', {
    weekday: 'short',
    day:     'numeric',
    month:   'long',
    year:    'numeric',
  })
}

function Field({ label, value, href, copyable }: {
  label: string
  value?: string | null
  href?: string
  copyable?: boolean
}) {
  if (!value) return null
  const isExternal = href?.startsWith('http')
  return (
    <div className="flex flex-col gap-0.5">
      <span className="label">{label}</span>
      <div className="flex items-center gap-1">
        {href ? (
          <a
            href={href}
            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="small-text text-secondary hover:underline"
          >
            {value}
          </a>
        ) : (
          <p className="small-text">{value}</p>
        )}
        {copyable && <CopyButton valueToCopy={value} />}
      </div>
    </div>
  )
}

interface Props {
  project: SerializedProject | null
  onClose: () => void
}

export default function ProjectDrawer({ project, onClose }: Props) {
  const router = useRouter()
  const { open: openPopUp, element: popUpElement } = usePopUp()

  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setIsOpen(!!project))
    return () => cancelAnimationFrame(id)
  }, [project])

  const [trackedId,     setTrackedId]     = useState(project?.id)
  const [currentStatus, setCurrentStatus] = useState<Status>(project?.status ?? 'NEW')
  if (project && project.id !== trackedId) {
    setTrackedId(project.id)
    setCurrentStatus(project.status)
  }

  const [isGenerating, setIsGenerating] = useState(false)

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

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  const handleDownloadPdf = async () => {
    if (!project) return
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
    if (!project) return
    try {
      await deleteProject(project.id)
      toast.success("Fjernet prosjekt!")
      onClose()
      router.refresh()
    } catch {
      toast.error("Kunne ikke slette prosjekt")
    }
  }

  const handleStatusChange = async (status: Status) => {
    if (!project) return
    closeMenu()
    if (status === currentStatus) return
    setCurrentStatus(status)
    try {
      await updateProjectStatus(project.id, status)
      toast.success("Oppdatert status")
      router.refresh()
    } catch {
      setCurrentStatus(project.status)
      toast.error("Kunne ikke endre status")
    }
  }

  return (
    <>
      {popUpElement}

      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-51 bg-black/40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Drawer */}
      <aside className={`fixed top-0 right-0 h-full w-full max-w-120 z-52 bg-bg border-l border-border shadow-xl flex flex-col overflow-y-auto transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {project && (
          <>
            {/* Header */}
            <div className="flex items-start justify-between h-20 gap-4 p-5 border-b border-border sticky top-0 bg-bg">
              <div className="min-w-0">
                <h2 className="heading-4 truncate">{project.title}</h2>
                <p className="small-text text-muted mt-0.5 truncate">
                  {project.clientForename} {project.clientSurname}
                </p>
              </div>

              <div className="flex items-center gap-0.5 shrink-0">
                <button
                  onClick={handleDownloadPdf}
                  disabled={isGenerating}
                  className="btn btn-ghost p-2 disabled:opacity-50"
                  title="Last ned PDF"
                >
                  {isGenerating
                    ? <FaSpinner className="w-5 h-5 animate-spin" />
                    : <FaFilePdf className="w-5 h-5" />
                  }
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
                    <div className={`absolute top-full right-0 mt-1 z-10 card rounded-md flex flex-col p-1 min-w-40 shadow-lg ${menuOpen ? 'animate-dropdown-in' : 'animate-dropdown-out'}`}>
                      {ALL_STATUSES.map(s => (
                        <button
                          key={s}
                          onClick={() => handleStatusChange(s)}
                          className={`relative text-left pl-4 pr-3 py-2 rounded-[calc(var(--radius-md)-2px)] small-text transition-colors hover:bg-surface-raised cursor-pointer ${currentStatus === s ? 'font-semibold text-text' : 'text-text-muted'}`}
                        >
                          {currentStatus === s && (
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

                <div className="w-px self-stretch bg-border mx-1" />

                <button onClick={onClose} className="btn btn-ghost p-2" title="Lukk">
                  <FaXmark className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col gap-6">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={STATUS_STYLES[currentStatus]}>
                  {STATUS_LABELS[currentStatus]}
                </span>
                <span className="badge badge-md badge-neutral gap-1.5">
                  {project.educationField ? EDUCATION_ICONS[project.educationField] : <FaQuestion className="shrink-0" />}
                  {project.educationField ? EDUCATION_LABELS[project.educationField] : 'Ingen linje'}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <span className="label">Detaljer</span>
                <div className="card-subtle rounded-md p-4 flex flex-col gap-3">
                  <Field label="ID"             value={project.id} copyable />
                  <Field label="Innsendt"        value={formatDate(project.createdAt)} />
                  <Field label="Prisforventning" value={`${Number(project.minPrice).toLocaleString('nb-NO')} – ${Number(project.maxPrice).toLocaleString('nb-NO')} kr`} />
                  <Field label="Fakturaadresse"  value={project.billingAddress} href={project.billingAddress ? `https://maps.google.com/maps?q=${encodeURIComponent(project.billingAddress)}` : undefined} copyable />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <span className="label">Beskrivelse</span>
                <div className="card-subtle rounded-md p-4">
                  <p className="small-text whitespace-pre-wrap">{project.description}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <span className="label">Kontakt</span>
                <div className="card-subtle rounded-md p-4 flex flex-col gap-3">
                  <Field label="E-post"  value={project.clientEmail} href={project.clientEmail ? `mailto:${project.clientEmail}` : undefined} copyable />
                  <Field label="Telefon" value={project.clientPhone} href={project.clientPhone ? `tel:${project.clientPhone}` : undefined} copyable />
                  <Field label="Bestillingsadresse" value={project.address} href={project.address ? `https://maps.google.com/maps?q=${encodeURIComponent(project.address)}` : undefined} copyable />
                  {project.organizationName && (
                    <Field label="Organisasjon" value={project.organizationName} />
                  )}
                  {project.organizationNumber && (
                    <Field label="Org.nr." value={project.organizationNumber} href={`https://virksomhet.brreg.no/nb/oppslag/enheter/${project.organizationNumber.replace(/\s/g, '')}`} />
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
