import Link from 'next/link'
import { HiOutlinePlusSm } from 'react-icons/hi'
import { prisma } from '@/app/lib/prisma'
import DeleteReview from '@/app/components/admin/DeleteReview'

export default async function AdminReviewsView() {
  const reviews = await prisma.clientReview.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="heading-2">Anmeldelser — {reviews.length}</h2>
        <Link href="/admin/newReview" className="btn btn-primary gap-1.5">
          <HiOutlinePlusSm className="text-base" />
          Ny anmeldelse
        </Link>
      </div>

      {reviews.length === 0 && (
        <p className="text-text-faint italic">Ingen anmeldelser lagt til ennå.</p>
      )}

      <div className="flex flex-col gap-4">
        {reviews.map((review) => (
          <div key={review.id} className="card flex items-center gap-4">

            {/* Avatar */}
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-secondary flex-shrink-0 bg-surface-sunken">
              {review.imageId ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`/images/${review.imageId}.webp`}
                  alt={review.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-faint text-xl font-bold">
                  {review.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-text">{review.name}</p>
              {(review.role || review.orgName) && (
                <p className="text-sm text-text-faint">
                  {[review.role, review.orgName].filter(Boolean).join(' · ')}
                </p>
              )}
              <p className="text-sm text-text-muted line-clamp-2 mt-0.5">{review.message}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Link href={`/admin/updateReview/${review.id}`} className="btn btn-outline text-sm">
                Rediger
              </Link>
              <DeleteReview reviewId={review.id} />
            </div>

          </div>
        ))}
      </div>
    </>
  )
}
