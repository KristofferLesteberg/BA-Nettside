"use client"

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import type { ApiResponse } from '@/app/lib/api-response'
import ReviewForm, { type ReviewFormValues } from '@/components/admin/ReviewForm'

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
        const res  = await fetch(`/api/reviews/${reviewId}`)
        const body: ApiResponse<{
          id: number; name: string; role: string | null; orgName: string | null
          orgURL: string | null; message: string; imageId: string | null
        }> = await res.json()

        if (!body.success) {
          toast.error(body.error)
          setError(true)
          return
        }

        const r = body.data
        setLoaded({
          name:     r.name,
          role:     r.role    ?? '',
          orgName:  r.orgName ?? '',
          orgURL:   r.orgURL  ?? '',
          message:  r.message,
          imageUrl: r.imageId ? `/images/${r.imageId}.webp` : undefined,
        })
      } catch (e) {
        console.error(e)
        toast.error('Kunne ikke laste anmeldelse')
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

    const res  = await fetch(`/api/reviews/${reviewId}`, { method: 'PATCH', body: formData })
    const body: ApiResponse<unknown> = await res.json()

    if (!body.success) {
      if (body.fields) {
        Object.values(body.fields).flat().forEach(msg => toast.error(msg))
      } else {
        toast.error(body.error)
      }
      return
    }

    toast.success(body.message ?? 'Anmeldelse oppdatert')
    router.push('/admin')
  }

  if (error)   return <p className="mt-32 text-center text-text-muted">Ingen anmeldelse funnet.</p>
  if (!loaded) return <p className="mt-32 text-center text-text-muted">Laster...</p>

  return (
    <ReviewForm
      heading={`Rediger anmeldelse — ${loaded.name}`}
      submitLabel="Oppdater anmeldelse"
      initialValues={loaded}
      onSubmit={handleSubmit}
    />
  )
}
