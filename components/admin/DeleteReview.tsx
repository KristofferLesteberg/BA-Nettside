"use client"

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { FaRegTrashCan } from 'react-icons/fa6'
import type { ApiResponse } from '@/app/lib/api-response'

export default function DeleteReview({ reviewId }: { reviewId: number }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!window.confirm('Vil du slette anmeldelsen?')) return

    const res  = await fetch(`/api/reviews/${reviewId}`, { method: 'DELETE' })
    const body: ApiResponse<unknown> = await res.json()

    if (!body.success) {
      toast.error(body.error)
      return
    }

    toast.success(body.message ?? 'Anmeldelse slettet')
    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      className="btn btn-ghost text-error hover:bg-error-bg gap-2"
    >
      <FaRegTrashCan />
      Slett
    </button>
  )
}
