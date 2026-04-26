import { NextRequest } from "next/server"
import { getToken } from 'next-auth/jwt'
import { ok, err, validationErr } from '@/app/lib/api-response'
import { ContactPersonCreateSchema, ContactPersonUpdateSchema } from "@/app/lib/schemas"
import { prisma } from "@/app/lib/prisma"


export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const token = await getToken({ req })
  if (!token) return err('Ikke autorisert', 401)
    try {
      const { id } = await context.params
      const contactId = parseInt(id)
      if (isNaN(contactId)) return err('Ugyldig anmeldelse-ID', 400)

      const deleted = await prisma.contactPerson.delete({
        where: {
          id: contactId
        }
      })

      return ok(deleted, "Kontaktperson slettet")
    } catch(error) {
      console.error(error)
      return err("Noe gikk galt på serveren")
    }
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const token = await getToken({ req })
  if (!token) return err('Ikke autorisert', 401)

    try {
      const { id } = await context.params
      const contactId = parseInt(id)
      if (isNaN(contactId)) return err('Ugyldig anmeldelse-ID', 400)

      const body = await req.json()
      const parsed = ContactPersonUpdateSchema.safeParse(body)
      if(!parsed.success) return validationErr(parsed.error)

      const updated = await prisma.contactPerson.update({
        where: {
          id: contactId
        },
        data: parsed.data
      })

      return ok(updated, "Kontaktperson oppdatert")

    } catch(error) {
      console.error(error)
      return err("Noe gikk galt på serveren")
    }
}

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const token = await getToken({ req })
  if (!token) return err('Ikke autorisert', 401)

  try {
    const { id } = await context.params
    const contactId = parseInt(id)
    const contact = await prisma.contactPerson.findUnique({
      where: {
        id: contactId
      }
    })

    if(!contact) return err("Ingen person funnet", 500)
    return ok(contact)

  } catch(error) {
    console.error(error)
    return err("Noe gikk galt på serveren", 500)
  }

  
}