import { notFound } from 'next/navigation'
import { getProjectById } from '@/actions/projects'
import UpdateProjectForm from '@/components/projects/updateProject'

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await getProjectById(id)
  if (!project) notFound()

  return (
    <UpdateProjectForm
      id={id}
      initialValues={{
        educationField:     project.educationField ?? '',
        title:              project.title,
        description:        project.description,
        minPrice:           Number(project.minPrice).toString(),
        maxPrice:           Number(project.maxPrice).toString(),
        clientForename:     project.clientForename,
        clientSurname:      project.clientSurname,
        clientEmail:        project.clientEmail,
        clientPhone:        project.clientPhone,
        organizationName:   project.organizationName  ?? '',
        organizationNumber: project.organizationNumber ?? '',
        address:            project.address,
        billingAddress:     project.billingAddress,
      }}
    />
  )
}
