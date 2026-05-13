import Link from 'next/link'
import { HiOutlinePlusSm } from 'react-icons/hi'
import { getAllReviews } from '@/actions/reviews'
import AdminReviewCard from '@/components/admin/AdminReviewCard'

export default async function AdminReviewsView() {
  const reviews = await getAllReviews()

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="heading-2">Anmeldelser — {reviews.length}</h2>
        <Link href="/admin/ny-anmeldelse" className="btn btn-primary gap-1.5">
          <HiOutlinePlusSm className="text-base" />
          Ny anmeldelse
        </Link>
      </div>

      {reviews.length === 0 && (
        <p className="text-text-faint italic">Ingen anmeldelser lagt til ennå.</p>
      )}

      <div className="flex flex-col gap-4">
        {reviews.map((review) => (
          <AdminReviewCard key={review.id} review={review} />
        ))}
      </div>
    </>
  )
}
