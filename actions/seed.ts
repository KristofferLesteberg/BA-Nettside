'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { randomUUID } from 'crypto'
import { prisma } from '@/app/lib/prisma'
import { authOptions } from '@/app/lib/auth'
import { sendOrderEmail, sendProjectEmail } from '@/actions/email'
import {
  SEED_PRODUCT_TITLES,
  SEED_PRODUCT_DESCRIPTIONS,
  SEED_CONTACT_NAMES,
  SEED_CONTACT_TITLES,
  SEED_ORG_NAMES,
  SEED_REVIEW_MESSAGES,
  SEED_REVIEW_ROLES,
  SEED_PROJECT_TITLES,
  SEED_PROJECT_DESCRIPTIONS,
  SEED_ADDRESSES,
  SEED_CLIENT_FORENAMES,
  SEED_CLIENT_SURNAMES,
  pickRandom,
  randomInt,
  randomNorwegianPhone,
  randomOrgNumber,
  randomEmail,
} from '@/app/lib/seed-data'
import type { EducationField, OrderStatus } from '@/generated/prisma'

const EDUCATION_FIELDS: EducationField[] = ['PLUMBER', 'CONCRETE', 'CARPENTER', 'CONSTRUCTION']
const ORDER_STATUSES: OrderStatus[] = ['NEW', 'IN_CONTACT', 'COMPLETED']

async function requireSession() {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Ikke autorisert')
}

// ─── Products ─────────────────────────────────────────────────────────────────

export async function seedProducts({
  publishedCount,
  draftCount,
}: {
  publishedCount: number
  draftCount: number
}) {
  await requireSession()

  const toCreate = [
    ...Array.from({ length: publishedCount }, () => ({ draft: false })),
    ...Array.from({ length: draftCount }, () => ({ draft: true })),
  ]

  for (const { draft } of toCreate) {
    const field = pickRandom(EDUCATION_FIELDS)
    const titles = SEED_PRODUCT_TITLES[field]
    const descriptions = SEED_PRODUCT_DESCRIPTIONS[field]

    await prisma.product.create({
      data: {
        title: pickRandom(titles),
        description: pickRandom(descriptions),
        price: randomInt(200, 8000),
        amount: randomInt(1, 50),
        educationField: field,
        draft,
        isSeeded: true,
        publishedAt: new Date(),
      },
    })
  }

  revalidatePath('/admin')
  revalidatePath('/produkter')
}

// ─── Contact persons ──────────────────────────────────────────────────────────

export async function seedContactPersons({ count }: { count: number }) {
  await requireSession()

  for (let i = 0; i < count; i++) {
    const name = pickRandom(SEED_CONTACT_NAMES)
    const [forename, ...rest] = name.split(' ')
    const surname = rest.join(' ')

    await prisma.contactPerson.create({
      data: {
        name,
        email: randomEmail(forename, surname),
        phone: randomNorwegianPhone(),
        title: pickRandom(SEED_CONTACT_TITLES),
        isSeeded: true,
      },
    })
  }

  revalidatePath('/admin')
}

// ─── Reviews ──────────────────────────────────────────────────────────────────

export async function seedReviews({ count }: { count: number }) {
  await requireSession()

  for (let i = 0; i < count; i++) {
    const forename = pickRandom(SEED_CLIENT_FORENAMES)
    const surname = pickRandom(SEED_CLIENT_SURNAMES)

    await prisma.clientReview.create({
      data: {
        name: `${forename} ${surname}`,
        role: pickRandom(SEED_REVIEW_ROLES),
        orgName: pickRandom(SEED_ORG_NAMES),
        message: pickRandom(SEED_REVIEW_MESSAGES),
        isSeeded: true,
      },
    })
  }

  revalidatePath('/admin')
  revalidatePath('/')
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export async function seedProjects({
  count,
  sendEmails,
}: {
  count: number
  sendEmails: boolean
}) {
  await requireSession()

  for (let i = 0; i < count; i++) {
    const forename = pickRandom(SEED_CLIENT_FORENAMES)
    const surname = pickRandom(SEED_CLIENT_SURNAMES)
    const minPrice = randomInt(5000, 40000)
    const maxPrice = minPrice + randomInt(5000, 30000)
    const withOrg = Math.random() > 0.5
    const address = pickRandom(SEED_ADDRESSES)
    const id = randomUUID()

    await prisma.projectRequest.create({
      data: {
        id,
        title: pickRandom(SEED_PROJECT_TITLES),
        description: pickRandom(SEED_PROJECT_DESCRIPTIONS),
        educationField: pickRandom(EDUCATION_FIELDS),
        minPrice,
        maxPrice,
        clientForename: forename,
        clientSurname: surname,
        clientEmail: randomEmail(forename, surname),
        clientPhone: randomNorwegianPhone(),
        address,
        billingAddress: address,
        organizationName: withOrg ? pickRandom(SEED_ORG_NAMES) : null,
        organizationNumber: withOrg ? randomOrgNumber() : null,
        isSeeded: true,
      },
    })

    if (sendEmails) {
      await sendProjectEmail({
        projectId: id,
        clientForename: forename,
        clientSurname: surname,
        clientEmail: randomEmail(forename, surname),
        clientPhone: randomNorwegianPhone(),
        title: pickRandom(SEED_PROJECT_TITLES),
        description: pickRandom(SEED_PROJECT_DESCRIPTIONS),
        minPrice,
        maxPrice,
      })
    }
  }

  revalidatePath('/admin')
}

// ─── Orders ───────────────────────────────────────────────────────────────────

export async function seedOrders({
  count,
  sendEmails,
}: {
  count: number
  sendEmails: boolean
}) {
  await requireSession()

  const products = await prisma.product.findMany({ select: { id: true } })

  for (let i = 0; i < count; i++) {
    const forename = pickRandom(SEED_CLIENT_FORENAMES)
    const surname = pickRandom(SEED_CLIENT_SURNAMES)
    const amount = randomInt(1, 5)
    const product = products.length > 0 ? pickRandom(products) : null

    const order = await prisma.productOrder.create({
      data: {
        clientName: `${forename} ${surname}`,
        clientEmail: randomEmail(forename, surname),
        clientPhone: randomNorwegianPhone(),
        amount,
        status: pickRandom(ORDER_STATUSES),
        productId: product?.id ?? null,
        isSeeded: true,
      },
    })

    if (sendEmails && product) {
      await sendOrderEmail({
        orderId: order.id,
        productId: product.id,
        clientName: order.clientName,
        clientEmail: order.clientEmail,
        clientPhone: order.clientPhone,
        amount,
      })
    }
  }

  revalidatePath('/admin')
}
