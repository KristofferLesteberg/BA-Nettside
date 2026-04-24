import ProjectCard from "@/app/components/admin/ProjectCard"
import { prisma } from "@/app/lib/prisma"
import { Status } from "@/generated/prisma"

const STATUS_ORDER: Record<Status, number> = {
  NEW: 0,
  IN_PROGRESS: 1,
  COMPLETE: 2,
}

export default async function ProjectsAdminPage() {
  const projects = await prisma.projectRequest.findMany({
    orderBy: { createdAt: "desc" },
  })

  const convertedProjects = projects.map((project) => ({
    ...project,
    minPrice: project.minPrice.toNumber(),
    maxPrice: project.maxPrice.toNumber(),
    createdAt: project.createdAt.toISOString(),
  }))

  const grouped = convertedProjects.reduce(
    (acc, project) => {
      const key = project.status as Status
      if (!acc[key]) acc[key] = []
      acc[key].push(project)
      return acc
    },
    {} as Record<Status, typeof convertedProjects>
  )

  const totalCount = projects.length
  const newCount = grouped["NEW"]?.length ?? 0
  const inProgressCount = grouped["IN_PROGRESS"]?.length ?? 0
  const doneCount = grouped["COMPLETE"]?.length ?? 0

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="heading-2">Prosjektforespørsler</h1>
        <p className="small-text text-text-faint mt-1">Administrer innkommende forespørsler fra kunder</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Totalt", value: totalCount, cls: "badge-neutral" },
          { label: "Nye", value: newCount, cls: "badge-info" },
          { label: "Under behandling", value: inProgressCount, cls: "badge-warning" },
          { label: "Fullført", value: doneCount, cls: "badge-success" },
        ].map(({ label, value, cls }) => (
          <div key={label} className="card-subtle flex flex-col gap-1 items-start">
            <span className={`badge ${cls}`}>{label}</span>
            <span className="heading-3">{value}</span>
          </div>
        ))}
      </div>

      {totalCount === 0 && (
        <div className="card text-center py-16">
          <p className="heading-4 text-text-muted">Ingen forespørsler ennå</p>
          <p className="small-text text-text-faint mt-2">Forespørsler fra kunder vil dukke opp her</p>
        </div>
      )}

      {(Object.entries(grouped) as [Status, typeof convertedProjects][])
        .sort(([a], [b]) => STATUS_ORDER[a] - STATUS_ORDER[b])
        .map(([status, items]) => (
          <section key={status} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="heading-4">
                {status === "NEW" && "Nye forespørsler"}
                {status === "IN_PROGRESS" && "Under behandling"}
                {status === "COMPLETE" && "Fullførte"}
              </h2>
              <span className="badge badge-neutral">{items.length}</span>
            </div>
            <div className="flex flex-col gap-4">
              {items.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        ))}
    </div>
  )
}