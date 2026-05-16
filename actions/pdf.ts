'use server'

import path from 'path'
import { createElement } from 'react'
import { renderToBuffer } from '@react-pdf/renderer'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'
import { prisma } from '@/app/lib/prisma'
import ProjectPdfDocument from '@/components/admin/Projects/ProjectPdfDocument'

const LOGO_SRC = path.join(process.cwd(), 'public', 'icons', 'SamEyde_vgs_hvit.png')

export async function generateProjectPdf(id: string): Promise<Uint8Array> {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Unauthorized')

  const project = await prisma.projectRequest.findUniqueOrThrow({ where: { id } })

  const serialized = {
    ...project,
    minPrice:  Number(project.minPrice),
    maxPrice:  Number(project.maxPrice),
    createdAt: project.createdAt.toISOString(),
  }

  const buffer = await renderToBuffer(
    createElement(ProjectPdfDocument, { project: serialized, logoSrc: LOGO_SRC })
  )

  return new Uint8Array(buffer)
}
