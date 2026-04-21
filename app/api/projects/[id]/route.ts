import { NextRequest } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { getToken } from 'next-auth/jwt'
import { EducationField } from '@/generated/prisma'
import { ProjectRequestUpdateSchema } from '@/app/lib/schemas'
import { ok, err, validationErr } from '@/app/lib/api-response'

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const token = await getToken({ req })
  if (!token) return err('Ikke autorisert', 401)

  try {
    const { id } = await context.params
    const projectId = parseInt(id)
    if (isNaN(projectId)) return err('Ugyldig prosjekt-ID', 400)

    const project = await prisma.projectRequest.findUnique({ where: { id: projectId } })
    if (!project) return err('Prosjekt ikke funnet', 404)

    return ok(project)
  } catch (error) {
    console.error('GET /api/projects/[id]:', error)
    return err('Noe gikk galt på serveren', 500)
  }
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const token = await getToken({ req })
  if (!token) return err('Ikke autorisert', 401)

  try {
    const { id } = await context.params
    const projectId = parseInt(id)
    if (isNaN(projectId)) return err('Ugyldig prosjekt-ID', 400)

    const body = await req.json()
    const parsed = ProjectRequestUpdateSchema.safeParse(body)
    if (!parsed.success) return validationErr(parsed.error)

    const { educationField, ...rest } = parsed.data

    const updated = await prisma.projectRequest.update({
      where: { id: projectId },
      data: { ...rest, educationField: (educationField as EducationField) ?? null }
    })

    return ok(updated, 'Prosjekt oppdatert')
  } catch (error) {
    console.error('PATCH /api/projects/[id]:', error)
    return err('Noe gikk galt på serveren', 500)
  }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const token = await getToken({ req })
  if (!token) return err('Ikke autorisert', 401)

  try {
    const { id } = await context.params
    const projectId = parseInt(id)
    if (isNaN(projectId)) return err('Ugyldig prosjekt-ID', 400)

    const deleted = await prisma.projectRequest.delete({ where: { id: projectId } })

    return ok(deleted, 'Prosjekt slettet')
  } catch (error) {
    console.error('DELETE /api/projects/[id]:', error)
    return err('Noe gikk galt på serveren', 500)
  }
}
