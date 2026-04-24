import ProjectCard from "@/app/components/admin/ProjectCard"
import { prisma } from "@/app/lib/prisma"

export default async function ProjectTest() {

  const projects = await prisma.projectRequest.findMany()

  const convertedProject = projects.map((project) => ({
    ...project, 
   minPrice: project.minPrice.toNumber(),
   maxPrice: project.maxPrice.toNumber(),
   createdAt: project.createdAt.toISOString()
  }))

  



  return (
    <main className="mt-50 w-6xl ml-auto mr-auto">
      <h1 className="heading-1 mb-10">Prosjekter - {convertedProject.length}</h1>
      <div className="w-6xl ml-auto mr-auto grid grid-cols-1 gap-5">
        {convertedProject.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>
    </main>
  )
  
}