"use client"
import { ProjectRequest } from "@/generated/prisma"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

type ConvertedProjectRequest = Omit<ProjectRequest, 'minPrice' | 'maxPrice' | 'createdAt'> & {
  minPrice: number
  maxPrice: number
  createdAt: string
}

const ProjectCard = ({ project }: {project: ConvertedProjectRequest}) => {
  const router = useRouter()

  const formatted = new Date(project.createdAt)


  const deleteProject = async (id: number) => {
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
      if(!res.ok) {
        toast.error("Kunne ikke slette prosjekt")
      }
      toast.success("Fjernet prosjekt!")
      router.refresh()
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className="border p-5 rounded-2xl">
      {project.status === 'NEW' && (
        <span className="bg-green-400 rounded p-1">Nytt prosjekt</span>
      )}
      {project.status === 'IN_PROGRESS' && (
        <span className="bg-amber-200">Under bygging</span>
      )}
      {project.status === 'COMPLETE' && (
        <span className="bg-blue-400">Ferdig</span>
      )}
      <div className="flex flex-row">
        <div className="flex flex-col">
          <h1 className="  heading-2">{project.clientForename} {project.clientSurname} - {project.organizationName ? <i className="heading-4 text-text-muted"> {project.organizationName}</i> : <i className="heading-4 text-text-muted">Privat</i>}</h1>
          <span>sendt inn {formatted.toLocaleDateString()}</span>
        </div>
        <div className="flex flex-row gap-3 ml-auto mt-auto mb-auto ">
          <button className="btn btn-outline">Endre status</button>
          <button
            className="btn btn-outline bg-red-500 text-white"
            onClick={() => deleteProject(project.id)}
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