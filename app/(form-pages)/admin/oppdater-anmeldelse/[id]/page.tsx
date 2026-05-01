"use client"

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import ReviewForm, { type ReviewFormValues } from '@/components/admin/ReviewForm'
import { getReviewById, updateReview } from '@/actions/reviews'

interface LoadedReview {
  name:     string
  role:     string
  orgName:  string
  orgURL:   string
  message:  string
  imageUrl: string | undefined
}

export default function UpdateReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const reviewId = parseInt(use(params).id)
  const router   = useRouter()

  const [loaded, setLoaded] = useState<LoadedReview | null>(null)
  const [error,  setError]  = useState(false)

  useEffect(() => {
    if (Number.isNaN(reviewId)) { setError(true); return }

    const load = async () => {
      try {
        const review = await getReviewById(reviewId)
        setLoaded({
          name:     review.name,
          role:     review.role    ?? '',
          orgName:  review.orgName ?? '',
          orgURL:   review.orgURL  ?? '',
          message:  review.message,
          imageUrl: review.imageId ? `/images/${review.imageId}.webp` : undefined,
        })
      } catch (e) {
        console.error(e)
        toast.error(e instanceof Error ? e.message : 'Kunne ikke laste anmeldelse')
        setError(true)
      }
    }

    load()
  }, [reviewId])

  const handleSubmit = async ({ name, role, orgName, orgURL, message, imageFile }: ReviewFormValues) => {
    const formData = new FormData()
    formData.append('name',    name)
    formData.append('role',    role)
    formData.append('orgName', orgName)
    formData.append('orgURL',  orgURL)
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

  if (error)   return <p className="mt-10 text-center text-text-muted">Ingen anmeldelse funnet.</p>
  if (!loaded) return <p className="mt-10 text-center text-text-muted">Laster...</p>

  return (
    <ReviewForm
      heading={`Rediger anmeldelse — ${loaded.name}`}
      submitLabel="Oppdater anmeldelse"
      initialValues={loaded}
      onSubmit={handleSubmit}
    />
  )
}
