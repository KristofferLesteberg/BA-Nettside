"use client"

import { useState } from 'react'
import OrderProjectForm from '@/components/projects/OrderProjectForm'
import ProjectOrderedSuccess from '@/components/projects/ProjectOrderedSuccess'

export default function RequestProjectPage() {
  const [ordered, setOrdered] = useState<{ id: string; email: string } | null>({id: '6d896681-6037-4b46-8d4b-6e9b14bfc41e', email: 'yehormaksiuchenko@gmail.com'})

  if (ordered) return <ProjectOrderedSuccess id={ordered.id} email={ordered.email} />
  return <OrderProjectForm onSuccess={setOrdered} />
}
