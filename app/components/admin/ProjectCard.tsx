"use client"
import { EducationField, ProjectRequest, Status } from "@/generated/prisma"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"


type ConvertedProjectRequest = Omit<ProjectRequest, 'minPrice' | 'maxPrice' | 'createdAt'> & {
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
  IN_PROGRESS: 'badge badge-info',
  COMPLETE: 'badge badge-error'
}

const EDUCATION_LABELS: Record<EducationField, string> = {
  BUILDING: "BYGG",
  CONSTRUCTION: "ANNLEGG"
}

const EDUCATION_STYLES: Record<EducationField, string> = {
  BUILDING:     'badge-secondary',
  CONSTRUCTION: 'badge-primary',
}

const ProjectCard = ({ project }: {project: ConvertedProjectRequest}) => {
  const router = useRouter()
  const formatted = new Date(project.createdAt)

  const deleteProject = async () => {
    try {
      const res = await fetch(`/api/projects/${project.id}`, { method: 'DELETE' })
      if(!res.ok) {
        toast.error("Kunne ikke slette prosjekt")
      }
      toast.success("Fjernet prosjekt!")
      router.refresh()
    } catch(error) {
      console.log(error)
    }
  }
  const updateStatus = async (status: Status) => {
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status })
      })
      if(!res.ok) {
        toast.error("Kunne ikke endre status")
        console.log(res)
      }
      toast.success("Oppdatert status")
      router.refresh()
    
    } catch(error) {
      console.log(error)
  }
}
  return (
    <div className="p-5 card card-subtle hover:shadow-md">
      <span className={`${STATUS_STYLES[project.status]} rounded p-1`}>{STATUS_LABELS[project.status]}</span>
      <span className={`${project.educationField ? `${EDUCATION_STYLES[project.educationField]}` : 'bg-amber-50'}`}>{project.educationField ? EDUCATION_LABELS[project.educationField] : <></>}</span>
      
      <div className="flex flex-row">
        <div className="flex flex-col">
          <h1 className="  heading-2">{project.clientForename} {project.clientSurname} - {project.organizationName ? <i className="heading-4 label"> {project.organizationName}</i> : <i className="heading-4 text-text-muted">Privat</i>}</h1>
          <span>sendt inn {formatted.toLocaleDateString()}</span>
        </div>
        <div className="flex flex-row gap-3 ml-auto mt-auto mb-auto ">
          <select className="cursor-pointerb btn btn-secondary" name="status" onChange={(e) => updateStatus(e.target.value as Status)}>
            <option value="">Endre Status</option>
            <option value="NEW">Nytt prosjekt</option>
            <option value="IN_PROGRESS">Under byggin</option>
            <option value="COMPLETE">Ferdig</option>
          </select>
          <button
            className="btn btn-primary"
            onClick={() => deleteProject()}
            >
              Fjern
          </button>
        </div>
      </div>
      <div className="flex flex-row max-w-4/5 justify-between mt-5">
        <div className="flex flex-col">
          <span className="heading-4 label">Kontakt</span>
          <p>Mail: {project.clientEmail}</p>
          <p>Tlf: {project.clientPhone}</p>
          <p>Adr. {project.address}</p>
        </div>
        <div className="">
          <span className="heading-4 label">Info</span>
          <p>{project.description.slice(0, 4)}...</p>
        </div>
        <div>
          <span className="heading-4 label">Pris</span>
          <p>{project.minPrice}kr - {project.maxPrice}kr</p>
        </div>
       
      </div>
      
    </div>
  )

  }

export default ProjectCard