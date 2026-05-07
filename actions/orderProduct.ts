'use server'

import { z } from 'zod'
import { ProductOrder } from '@/generated/prisma'
import { prisma } from '@/app/lib/prisma'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'

const OrderProductCreateSchema = z.object({
  clientName: z.string().min(1, "Navn er påkrev"),
  clientEmail: z.email("Ugyldig e-postadresse"),
  clientPhone: z.string().min(1, "Telefon nummer er påkrevd"),
  amount: z.coerce.number().min(1, "Du må minst bestille en av produktet"),
  extraDetails: z.string().optional()
})

export async function getAllOrders() {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Ikke autorisert')

  return await prisma.productOrder.findMany()
}

export async function getOrderById(id: number) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Ikke autorisert')
  const order = await prisma.productOrder.findUnique({
    where: {
      id: id
    }
  })
  if(!order) throw new Error("Kunne ikke funne bestilling")
  return order
}

export async function createProuctOrder(data: unknown) {
  const parsed = OrderProductCreateSchema.parse(data)
  const ProductOrder = await prisma.productOrder.create({ 
    data: parsed
  })
  revalidatePath("/admin")
  return ProductOrder
}

export async function deleteOrder(id: number) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Ikke autorisert')

  const order = await prisma.productOrder.findUnique({ where: { id: id } })
  if(!order) throw new Error("Fant ikke bestilling")

  const deleted = await prisma.productOrder.delete({ where: { id: id } })
  revalidatePath('/admin')
}


