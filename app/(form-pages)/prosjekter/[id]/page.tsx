import { notFound } from 'next/navigation'
import { prisma } from '@/app/lib/prisma'
import ClientVerificationGate from '@/components/projects/ClientVerificationGate'

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const exists = await prisma.projectRequest.findUnique({ where: { id }, select: { id: true } })
  if (!exists) notFound()
  return <ClientVerificationGate id={id} />
}
