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
      <FilteredProjectGrid projects={convertedProject} />
    </>
  )
  
}