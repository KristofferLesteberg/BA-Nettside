"use client"

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import ReviewForm, { type ReviewFormValues } from '@/components/admin/ReviewForm'
import { createReview } from '@/actions/reviews'

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

    try {
      await toast.promise(createReview(formData), {
        loading: 'Oppretter anmeldelse…',
        success: 'Anmeldelse opprettet',
        error: (e: unknown) => e instanceof Error ? e.message : 'Noe gikk galt',
      })
      router.push('/admin')
    } catch {}
  }

  return (
    <ReviewForm
      heading="Opprett anmeldelse"
      submitLabel="Opprett anmeldelse"
      onSubmit={handleSubmit}
    />
  )
}
