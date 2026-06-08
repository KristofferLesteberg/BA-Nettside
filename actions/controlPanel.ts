'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { prisma } from '@/app/lib/prisma'
import { authOptions } from '@/app/lib/auth'
import {
  setAppConfig,
  getAllAppConfig,
  bumpSessionInvalidation,
} from '@/app/lib/app-config'
import { deleteProductImage } from '@/app/lib/images'

async function requireSession() {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Ikke autorisert')
}

// ─── Config ───────────────────────────────────────────────────────────────────

export { getAllAppConfig }

export async function saveAppConfig(
  values: Partial<Record<string, string>>,
  invalidateSessions: boolean
) {
  await requireSession()

  for (const [key, value] of Object.entries(values)) {
    if (value === undefined) continue
    if (value === '') {
      await prisma.appConfig.deleteMany({ where: { key } })
    } else {
      await setAppConfig(key as never, value)
    }
  }

  if (invalidateSessions) {
    await bumpSessionInvalidation()
  }
}

// ─── Bulk delete — seeded only ────────────────────────────────────────────────

export async function deleteSeededProducts() {
  await requireSession()
  const seeded = await prisma.product.findMany({
    where: { isSeeded: true },
    include: { images: true },
  })
  for (const p of seeded) {
    for (const img of p.images) {
      await deleteProductImage(img.id)
    }
    await prisma.product.delete({ where: { id: p.id } })
  }
  revalidatePath('/admin')
  revalidatePath('/produkter')
}

export async function deleteSeededOrders() {
  await requireSession()
  await prisma.productOrder.deleteMany({ where: { isSeeded: true } })
  revalidatePath('/admin')
}

export async function deleteSeededProjects() {
  await requireSession()
  await prisma.projectRequest.deleteMany({ where: { isSeeded: true } })
  revalidatePath('/admin')
}

export async function deleteSeededReviews() {
  await requireSession()
  await prisma.clientReview.deleteMany({ where: { isSeeded: true } })
  revalidatePath('/admin')
  revalidatePath('/')
}

export async function deleteSeededContactPersons() {
  await requireSession()
  await prisma.contactPerson.deleteMany({ where: { isSeeded: true } })
  revalidatePath('/admin')
}

export async function deleteAllSeeded() {
  await requireSession()
  await deleteSeededOrders()
  await deleteSeededProjects()
  await deleteSeededReviews()
  await deleteSeededContactPersons()
  await deleteSeededProducts()
}

// ─── Bulk delete — all ────────────────────────────────────────────────────────

export async function deleteAllProducts() {
  await requireSession()
  const all = await prisma.product.findMany({ include: { images: true } })
  for (const p of all) {
    for (const img of p.images) {
      await deleteProductImage(img.id)
    }
  }
  await prisma.productOrder.updateMany({ data: { productId: null } })
  await prisma.product.deleteMany()
  revalidatePath('/admin')
  revalidatePath('/produkter')
}

export async function deleteAllOrders() {
  await requireSession()
  await prisma.productOrder.deleteMany()
  revalidatePath('/admin')
}

export async function deleteAllProjects() {
  await requireSession()
  await prisma.projectRequest.deleteMany()
  revalidatePath('/admin')
}

export async function deleteAllReviews() {
  await requireSession()
  await prisma.clientReview.deleteMany()
  revalidatePath('/admin')
  revalidatePath('/')
}

export async function deleteAllContactPersons() {
  await requireSession()
  await prisma.product.updateMany({ data: { contactPersonId: null } })
  await prisma.contactPerson.deleteMany()
  revalidatePath('/admin')
}

export async function deleteEverything() {
  await requireSession()
  await prisma.productOrder.deleteMany()
  await prisma.projectRequest.deleteMany()
  await prisma.clientReview.deleteMany()
  await prisma.product.updateMany({ data: { contactPersonId: null } })
  await prisma.contactPerson.deleteMany()
  const all = await prisma.product.findMany({ include: { images: true } })
  for (const p of all) {
    for (const img of p.images) {
      await deleteProductImage(img.id)
    }
  }
  await prisma.product.deleteMany()
  revalidatePath('/admin')
  revalidatePath('/produkter')
  revalidatePath('/')
}
