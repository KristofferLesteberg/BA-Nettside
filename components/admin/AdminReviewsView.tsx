import Link from 'next/link'
import { IconPlus } from '@/app/lib/icons'
import { getAllReviews } from '@/actions/reviews'
import AdminReviewCard from '@/components/admin/AdminReviewCard'

export default async function AdminReviewsView() {
  const reviews = await getAllReviews(true)

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div></div>
        <Link href="/admin/ny-anmeldelse" className="btn btn-primary gap-1.5">
          <IconPlus className="text-base" />
          Ny anmeldelse
        </Link>
      </div>

      {reviews.length === 0 && (
        <p className="text-text-faint italic">Ingen anmeldelser lagt til ennå.</p>
      )}

      <div className="flex flex-col gap-3">
        {reviews.map((review) => (
          <AdminReviewCard key={review.id} review={review} />
        ))}
      </div>
    </>
  )
}
