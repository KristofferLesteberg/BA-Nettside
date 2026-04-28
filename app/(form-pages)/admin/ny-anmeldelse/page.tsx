"use client"

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import type { ApiResponse } from '@/app/lib/api-response'
import ReviewForm, { type ReviewFormValues } from '@/components/admin/ReviewForm'

export default function NewReviewPage() {
  const router = useRouter()

  const handleSubmit = async ({ name, role, orgName, orgURL, message, imageFile }: ReviewFormValues) => {
    const formData = new FormData()
    formData.append('name',    name)
    formData.append('role',    role)
    formData.append('orgName', orgName)
    formData.append('orgURL',  orgURL)
    formData.append('message', message)
    if (imageFile) formData.append('image', imageFile)

    const res  = await fetch('/api/reviews', { method: 'POST', body: formData })
    const body: ApiResponse<unknown> = await res.json()

    if (!body.success) {
      if (body.fields) {
        Object.values(body.fields).flat().forEach(msg => toast.error(msg))
      } else {
        toast.error(body.error)
      }
      return
    }

    toast.success(body.message ?? 'Anmeldelse opprettet')
    router.push('/admin')
  }

  return (
    <ReviewForm
      heading="Opprett anmeldelse"
      submitLabel="Opprett anmeldelse"
      onSubmit={handleSubmit}
    />
  )
}