'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { prisma } from '@/app/lib/prisma'
import { authOptions } from '@/app/lib/auth'

async function requireSession() {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Ikke autorisert')
}

const RecipientSchema = z.object({
  name:  z.string().min(1, 'Navn er påkrevd'),
  email: z.email('Ugyldig e-postadresse'),
})

export async function getNotificationRecipients() {
  const session = await getServerSession(authOptions)
  if (!session) return []
  return prisma.notificationRecipient.findMany({ orderBy: { createdAt: 'asc' } })
}

export async function addNotificationRecipient(name: string, email: string) {
  await requireSession()

  const parsed = RecipientSchema.safeParse({ name, email })
  if (!parsed.success) throw new Error(parsed.error.issues[0].message)

  const existing = await prisma.notificationRecipient.findUnique({ where: { email: parsed.data.email } })
  if (existing) throw new Error('Denne e-postadressen er allerede lagt til')

  const recipient = await prisma.notificationRecipient.create({ data: parsed.data })
  revalidatePath('/admin')
  return recipient
}

export async function deleteNotificationRecipient(id: number) {
  await requireSession()
  await prisma.notificationRecipient.delete({ where: { id } })
  revalidatePath('/admin')
}
