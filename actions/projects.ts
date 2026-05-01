'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { prisma } from '@/app/lib/prisma'
import { authOptions } from '@/app/lib/auth'
import type { EducationField } from '@/generated/prisma'

// ─── Schemas ─────────────────────────────────────────────────────────────────

const ProjectRequestCreateSchema = z.object({
  educationField: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z.enum(['BUILDING', 'CONSTRUCTION']).optional()
  ),
  title: z.string().min(1, 'Prosjekttittel er påkrevd'),
  description: z.string().default(''),
  minPrice: z.coerce.number().nonnegative('Minimumsbudsjett kan ikke være negativt').default(0),
  maxPrice: z.coerce.number().nonnegative('Maksimumsbudsjett kan ikke være negativt').default(0),
  clientForename: z.string().min(1, 'Fornavn er påkrevd'),
  clientSurname: z.string().default(''),
  clientEmail: z.email('Ugyldig e-postadresse'),
  clientPhone: z.string().default(''),
  organizationName: z.string().optional(),
  organizationNumber: z.string().regex(/^\d{9}$/, 'Organisasjonsnummer må bestå av nøyaktig 9 siffer').optional(),
  address: z.string().default(''),
  billingAddress: z.string().default(''),
})

const ProjectRequestStatusUpdateSchema = z.object({
  status: z.enum(['NEW', 'IN_PROGRESS', 'COMPLETE']),
})

// ─── Actions ─────────────────────────────────────────────────────────────────

export async function getAllProjects() {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Ikke autorisert')

  return prisma.projectRequest.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function createProject(data: unknown) {
  const { educationField, ...rest } = ProjectRequestCreateSchema.parse(data)
  const project = await prisma.projectRequest.create({
    data: { ...rest, educationField: (educationField as EducationField) ?? null },
  })
  revalidatePath('/admin')
  return { id: project.id }
}

export async function updateProjectStatus(id: number, status: string) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Ikke autorisert')

  const { status: validated } = ProjectRequestStatusUpdateSchema.parse({ status })
  await prisma.projectRequest.update({ where: { id }, data: { status: validated } })
  revalidatePath('/admin')
}

export async function deleteProject(id: number) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Ikke autorisert')

  await prisma.projectRequest.delete({ where: { id } })
  revalidatePath('/admin')
}
