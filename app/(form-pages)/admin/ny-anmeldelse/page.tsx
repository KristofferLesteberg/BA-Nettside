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

    const result = await createReview(formData)
    if (!result.success) {
      toast.error(result.error)
      return
    }
    toast.success('Anmeldelse opprettet')
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
