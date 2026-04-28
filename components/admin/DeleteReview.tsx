"use client"

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { FaRegTrashCan } from 'react-icons/fa6'
import { deleteReview } from '@/actions/reviews'

export default function DeleteReview({ reviewId }: { reviewId: number }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!window.confirm('Vil du slette anmeldelsen?')) return

    try {
      await deleteReview(reviewId)
      toast.success('Anmeldelse slettet')
      router.refresh()
    } catch {
      toast.error('Kunne ikke slette anmeldelsen')
    }
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
