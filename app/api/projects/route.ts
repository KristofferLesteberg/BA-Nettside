import { NextRequest } from 'next/server'
import { prisma } from '../../lib/prisma'
import { EducationField } from '@/generated/prisma'
import { ProjectRequestCreateSchema } from '../../lib/schemas'
import { ok, err, validationErr } from '../../lib/api-response'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = ProjectRequestCreateSchema.safeParse(body)
    if (!parsed.success) return validationErr(parsed.error)

    const { educationField, ...rest } = parsed.data

    const project = await prisma.projectRequest.create({
      data: { ...rest, educationField: (educationField as EducationField) ?? null }
    })

    return ok(project, 'Prosjektforespørsel sendt', 201)
  } catch (error) {
    console.error('POST /api/projects:', error)
    return err('Noe gikk galt på serveren', 500)
  }
}
