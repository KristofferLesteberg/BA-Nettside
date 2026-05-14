"use client"
import { EducationField, ProjectRequest, Status } from "@/generated/prisma"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { deleteProject, updateProjectStatus } from "@/actions/projects"

export type SerializedProject = Omit<ProjectRequest, 'minPrice' | 'maxPrice' | 'createdAt'> & {
  minPrice: number
  maxPrice: number
  createdAt: string
}


const STATUS_LABELS: Record<Status, string> = {
  NEW: 'Nytt prosjekt',
  IN_PROGRESS: "Under bygging",
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

const ProjectCard = ({ project }: { project: SerializedProject }) => {
  const router = useRouter()
  const formatted = new Date(project.createdAt)

  const handleDelete = async () => {
    try {
      await deleteProject(project.id)
      toast.success("Fjernet prosjekt!")
      router.refresh()
    } catch {
      toast.error("Kunne ikke slette prosjekt")
    }
  }

  const updateStatus = async (status: Status) => {
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
            <select className="input w-auto cursor-pointer" name="status" onChange={(e) => updateStatus(e.target.value as Status)}>
              <option value="">Endre Status</option>
              <option value="NEW">Nytt prosjekt</option>
              <option value="IN_PROGRESS">Under bygging</option>
              <option value="COMPLETE">Ferdig</option>
            </select>
            <button className="btn btn-error" onClick={handleDelete}>
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