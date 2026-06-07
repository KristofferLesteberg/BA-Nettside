"use client"

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import ReviewForm, { type ReviewFormValues } from '@/components/admin/ReviewForm'
import { updateReview } from '@/actions/reviews'

export interface UpdateReviewClientProps {
  reviewId: number
  name: string
  role: string
  orgName: string
  orgURL: string
  message: string
  imageUrl: string | undefined
}

export default function UpdateReviewClient({
  reviewId,
  name,
  role,
  orgName,
  orgURL,
  message,
  imageUrl,
}: UpdateReviewClientProps) {
  const router = useRouter()

  const handleSubmit = async ({ name, role, orgName, orgURL, message, imageFile }: ReviewFormValues) => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('role', role)
    formData.append('orgName', orgName)
    formData.append('orgURL', orgURL)
    formData.append('message', message)
    if (imageFile) formData.append('image', imageFile)

    try {
      await updateReview(reviewId, formData)
      toast.success('Anmeldelse oppdatert')
      router.push('/admin?tab=anmeldelser')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Noe gikk galt')
    }
  }

  return (
    <ReviewForm
      heading={`Rediger anmeldelse — ${name}`}
      submitLabel="Oppdater anmeldelse"
      initialValues={{ name, role, orgName, orgURL, message, imageUrl }}
      onSubmit={handleSubmit}
    />
  )
}
