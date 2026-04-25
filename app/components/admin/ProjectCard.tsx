"use client"
import { ProjectRequest, Status } from "@/generated/prisma"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"


type ConvertedProjectRequest = Omit<ProjectRequest, 'minPrice' | 'maxPrice' | 'createdAt'> & {
  minPrice: number
  maxPrice: number
  createdAt: string
} 

const STATUS_LABELS: Record<Status, string> = {
  NEW: "Nytt prosjekt",
  IN_PROGRESS: "Under bygging",
  COMPLETE: "Ferdig"
}

const STATUS_STYLES: Record<Status, string> = {
  NEW: 'bg-green-400',
  IN_PROGRESS: 'bg-amber-200',
  COMPLETE: 'bg-blue-400'
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
    <div className="border p-5 rounded-2xl">
      <span className={`${STATUS_STYLES[project.status]} rounded p-1`}>{STATUS_LABELS[project.status]}</span>
      
      <div className="flex flex-row">
        <div className="flex flex-col">
          <h1 className="  heading-2">{project.clientForename} {project.clientSurname} - {project.organizationName ? <i className="heading-4 text-text-muted"> {project.organizationName}</i> : <i className="heading-4 text-text-muted">Privat</i>}</h1>
          <span>sendt inn {formatted.toLocaleDateString()}</span>
        </div>
        <div className="flex flex-row gap-3 ml-auto mt-auto mb-auto ">

          <select className="cursor-pointer" name="status" onChange={(e) => updateStatus(e.target.value as Status)}>
            <option value="">Endre Status</option>
            <option value="NEW">Nytt prosjekt</option>
            <option value="IN_PROGRESS">Under byggin</option>
            <option value="COMPLETE">Ferdig</option>
          </select>
          <button
            className="btn btn-outline bg-red-500 text-white"
            onClick={() => deleteProject()}
            >
              Fjern
          </button>
        </div>
      </div>
      <div className="flex flex-row max-w-4/5 justify-between mt-5">
        <div className="flex flex-col">
          <span className="heading-4 text-text-muted">Kontakt</span>
          
          <p>Mail: {project.clientEmail}</p>
          <p>Tlf: {project.clientPhone}</p>
          <p>Adr. {project.address}</p>
        </div>
        <div className="">
          <span className="heading-4 text-text-muted">Info</span>
          <p>{project.description.slice(0, 4)}...</p>
        </div>
        <div>
          <span className="heading-4 text-text-muted">Pris</span>
          <p>{project.minPrice}kr - {project.maxPrice}kr</p>
        </div>
       
      </div>
      
    </div>
  )

  }

export default ProjectCard