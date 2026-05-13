"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { FaRegTrashCan } from 'react-icons/fa6'
import { deleteReview } from '@/actions/reviews'
import { usePopUp } from '@/components/shared/PopUp'
import type { getAllReviews } from '@/actions/reviews'

type Review = Awaited<ReturnType<typeof getAllReviews>>[number]

export default function AdminReviewCard({ review }: { review: Review }) {
  const router = useRouter()
  const { open: openPopUp, element: popUpElement } = usePopUp()

  const handleDelete = async () => {
    try {
      await deleteReview(review.id)
      toast.success('Anmeldelse slettet')
      router.refresh()
    } catch {
      toast.error('Kunne ikke slette anmeldelsen')
    }
  }

  return (
    <div className="card flex items-center gap-4">
      {popUpElement}

      {/* Avatar */}
      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-secondary shrink-0 bg-surface-sunken">
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
          <p className="text-sm text-text-faint flex items-center gap-1 flex-wrap">
            {review.role && <span>{review.role}</span>}
            {review.role && review.orgName && <span>·</span>}
            {review.orgName && (
              review.orgURL ? (
                <a
                  href={review.orgURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="header-link inline-flex items-center gap-1"
                >
                  {review.orgName}
                  <FaExternalLinkAlt className="text-[10px] opacity-60" />
                </a>
              ) : (
                <span>{review.orgName}</span>
              )
            )}
          </p>
        )}
        <p className="text-sm text-text-muted line-clamp-2 mt-0.5">{review.message}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <Link href={`/admin/oppdater-anmeldelse/${review.id}`} className="btn btn-outline text-sm">
          Rediger
        </Link>
        <button
          onClick={() => openPopUp({
            title: 'Vil du slette anmeldelsen?',
            yesLabel: 'Slett',
            noLabel: 'Avbryt',
            onYes: handleDelete,
          })}
          className="btn btn-ghost text-error hover:bg-error-bg gap-2"
        >
          <FaRegTrashCan />
          Slett
        </button>
      </div>
    </div>
  )
}
