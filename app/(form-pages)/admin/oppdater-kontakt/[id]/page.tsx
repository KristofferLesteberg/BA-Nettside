import { notFound, redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'
import { prisma } from '@/app/lib/prisma'
import UpdateContactClient from './UpdateContactClient'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const contactId = parseInt((await params).id)
  if (Number.isNaN(contactId)) notFound()

  const contact = await prisma.contactPerson.findUnique({ where: { id: contactId } })
  if (!contact) notFound()

  return (
    <UpdateContactClient
      contactId={contactId}
      name={contact.name}
      email={contact.email}
      phone={contact.phone}
      title={contact.title}
    />
  )
}
