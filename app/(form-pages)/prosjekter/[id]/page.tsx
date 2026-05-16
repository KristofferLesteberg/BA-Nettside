import ClientVerificationGate from '@/components/projects/ClientVerificationGate'

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <ClientVerificationGate id={id} />
}
