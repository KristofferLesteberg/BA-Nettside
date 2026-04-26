import { NextRequest, NextResponse } from "next/server"
import { getToken } from 'next-auth/jwt'
import { ok, err, validationErr } from '@/app/lib/api-response'
import { ContactPersonCreateSchema } from "@/app/lib/schemas"
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
    } catch(error) {
      console.error(error)
      return err("Noe gikk galt på serveren")
    }
}
