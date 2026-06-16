'use server'

import { prisma } from '@/app/lib/prisma'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'
import { OrderNoteCreateSchema } from '@/app/lib/schemas'

export async function createOrderNote(orderId: number, data: unknown) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Ikke autorisert')

  const parsed = OrderNoteCreateSchema.parse(data)
  const note = await prisma.orderNote.create({
    data: { ...parsed, orderId },
  })
  revalidatePath('/admin')
  return note
}

export async function deleteOrderNote(id: number) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Ikke autorisert')

  await prisma.orderNote.delete({ where: { id } })
  revalidatePath('/admin')
}
