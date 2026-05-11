"use client"

import { useState } from 'react'
import OrderProjectForm from '@/components/projects/OrderProjectForm'
import ProjectOrderedSuccess from '@/components/projects/ProjectOrderedSuccess'

export default function RequestProjectPage() {
  const [ordered, setOrdered] = useState<{ id: string; email: string } | null>(null)

  if (ordered) return <ProjectOrderedSuccess id={ordered.id} email={ordered.email} />
  return <OrderProjectForm onSuccess={setOrdered} />
}
