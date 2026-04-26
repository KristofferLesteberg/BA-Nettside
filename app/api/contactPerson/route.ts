import { NextRequest, NextResponse } from "next/server"
import { getToken } from 'next-auth/jwt'
import { ok, err, validationErr } from '@/app/lib/api-response'
import { ContactPersonCreateSchema } from "@/app/lib/schemas"
import { prisma } from "@/app/lib/prisma"


export async function POST(req: NextRequest) {
  const token = await getToken({ req })
  if (!token) return err('Ikke autorisert', 401)
  try {
    const body = await req.json()
    const parsed = ContactPersonCreateSchema.safeParse(body)
    if(!parsed.success) return validationErr(parsed.error)
    
    const contact = await prisma.contactPerson.create({
      data: parsed.data
    })
    return ok(contact, "Kontakt person opprettet")
  } catch(error) {
    console.error(error)
    return err("Noe gikk galt på serveren")
  }
}