'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { prisma } from '@/app/lib/prisma'
import { authOptions } from '@/app/lib/auth'

// ─── Schemas ─────────────────────────────────────────────────────────────────

const ContactPersonCreateSchema = z.object({
  name:  z.string().min(1, 'Navn er påkrevd'),
  email: z.email('Ugyldig e-postadresse'),
  phone: z.string(),
  title: z.string().min(1, 'Tittel er påkrevd'),
})

const ContactPersonUpdateSchema = ContactPersonCreateSchema.partial()



// ─── Actions ─────────────────────────────────────────────────────────────────


export async function getContactById(id: number) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Ikke autorisert')
  const contact = await prisma.contactPerson.findUnique({
    where: {id: id}
  })
  if(!contact) throw new Error("Kontakt person ikke funnet")
  return contact
}

export async function createContactPerson(formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Ikke autorisert')

  const data = ContactPersonCreateSchema.parse({
    name:  formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    title: formData.get('title'),
  })

  const contact = await prisma.contactPerson.create({ data })

  revalidatePath('/admin')
  return { id: contact.id }
}

export async function updateContactPerson(id: number, formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Ikke autorisert')

  const existing = await prisma.contactPerson.findUnique({ where: { id } })
  if (!existing) throw new Error('Kontaktperson ikke funnet')

  const data = ContactPersonUpdateSchema.parse({
    name:  formData.get('name')  || undefined,
    email: formData.get('email') || undefined,
    phone: formData.get('phone') || undefined,
    title: formData.get('title') || undefined,
  })

  await prisma.contactPerson.update({ where: { id }, data })

  revalidatePath('/admin')
}

export async function deleteContactPerson(id: number) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Ikke autorisert')

  const contact = await prisma.contactPerson.findUnique({ where: { id } })
  if (!contact) throw new Error('Kontaktperson ikke funnet')

  await prisma.contactPerson.delete({ where: { id } })

  revalidatePath('/admin')
}
