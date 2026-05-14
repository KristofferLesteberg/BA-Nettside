
import ProjectCard from "@/components/admin/Projects/ProjectCard"
import { getAllProjects } from "@/actions/projects"
import FilteredProjectGrid from "./FilteredProjectGrid"


export default async function AdminProjectsView() {

  const projects = await getAllProjects()

  const convertedProject = projects.map((project) => ({
    ...project, 
   minPrice: project.minPrice.toNumber(),
   maxPrice: project.maxPrice.toNumber(),
   createdAt: project.createdAt.toISOString() ?? null
  }))

  return (
    <>
      <h1 className="heading-2 mb-10">Prosjekter - {convertedProject.length}</h1>
      <div className="w-6xl ml-auto mr-auto grid grid-cols-1 gap-5">
        <FilteredProjectGrid projects={convertedProject} />
      </div>
    </>
  )
  
}