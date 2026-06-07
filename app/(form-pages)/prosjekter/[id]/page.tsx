import { prisma } from '@/app/lib/prisma'
import ClientVerificationGate from '@/components/projects/ClientVerificationGate'
import ProjectNotFound from '@/components/projects/ProjectNotFound'

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const exists = await prisma.projectRequest.findUnique({ where: { id }, select: { id: true } })
  if (!exists) return <ProjectNotFound />
  return <ClientVerificationGate id={id} />
}
