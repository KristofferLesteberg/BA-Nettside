'use server'

import { z } from 'zod'
import { prisma } from '@/app/lib/prisma'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'
import { sendOrderEmail } from '@/actions/email'

const OrderProductCreateSchema = z.object({
  clientName: z.string().min(1, "Navn er påkrev"),
  clientEmail: z.email("Ugyldig e-postadresse"),
  clientPhone: z.string().min(1, "Telefon nummer er påkrevd"),
  amount: z.coerce.number().min(1, "Du må minst bestille en av produktet"),
  extraDetails: z.string().optional(),
  productId: z.number()
})

const OrderProductStatusUpdateCreate = z.object({
  status: z.enum(["NEW", "IN_CONTACT", "COMPLETED"])
})

export type OrderWithProduct = Awaited<ReturnType<typeof getAllOrders>>[number]

export async function getAllOrders() {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Ikke autorisert')

  const orders = await prisma.productOrder.findMany({
    include: { product: { include: { images: { take: 1, orderBy: { sortOrder: 'asc' } } } } }
  })

  return orders.map(order => ({
    ...order,
    product: order.product
      ? { ...order.product, price: order.product.price.toNumber() }
      : null,
  }))
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

export async function createProductOrder(data: unknown) {
  const parsed = OrderProductCreateSchema.parse(data)
  const ProductOrder = await prisma.productOrder.create({ 
    data: parsed
  })
  await sendOrderEmail(parsed)
  revalidatePath("/admin")
  return ProductOrder
}

export async function deleteOrder(id: number) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Ikke autorisert')

  const order = await prisma.productOrder.findUnique({ where: { id: id } })
  if(!order) throw new Error("Fant ikke bestilling")

  await prisma.productOrder.delete({ where: { id: id } })
  revalidatePath('/admin')
}

export async function UpdateOrder(id: number, status: string) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Ikke autorisert')
  const { status: parsed } = OrderProductStatusUpdateCreate.parse({ status })
  await prisma.productOrder.update({
    where: { id: id}, data: { status: parsed}
  })
  revalidatePath("/admin")
}


