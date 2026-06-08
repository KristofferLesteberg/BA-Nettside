"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { IconEdit, IconDelete, IconPerson, IconOrg, IconQuote } from '@/app/lib/icons'
import { deleteReview } from '@/actions/reviews'
import { usePopUp } from '@/components/shared/PopUp'
import type { getAllReviews } from '@/actions/reviews'

type Review = Awaited<ReturnType<typeof getAllReviews>>[number]

export default function AdminReviewCard({ review }: { review: Review }) {
  const router = useRouter()
  const { open: openPopUp, element: popUpElement } = usePopUp()

  const handleDelete = async () => {
    try {
      await toast.promise(deleteReview(review.id), {
        loading: 'Sletter anmeldelse…',
        success: 'Anmeldelse slettet',
        error: 'Kunne ikke slette anmeldelsen',
      })
      router.refresh()
    } catch {}
  }

  return (
    <div className="card card-subtle py-4 px-5" role="article">
      {popUpElement}

      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-secondary shrink-0 bg-surface-sunken flex items-center justify-center">
          {review.imageId ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={`/images/${review.imageId}.webp`} alt={review.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm font-bold text-text-faint">{review.name.charAt(0).toUpperCase()}</span>
          )}
        </div>

        <div className="flex items-center gap-2 flex-1 min-w-0">
          <p className="heading-4 truncate">{review.name}</p>
          {review.isSeeded && <span className="badge badge-neutral shrink-0">Testdata</span>}
        </div>

        <div className="hidden sm:flex items-center self-stretch shrink-0">
          <div className="w-px self-stretch bg-border" />

          <div className="flex items-center px-4">
            <div className="flex flex-col gap-0.5 w-36">
              <span className="label flex items-center gap-1">
                <IconPerson className="text-text-faint w-3 h-3 shrink-0" aria-hidden="true" />
                Rolle
              </span>
              <span className="small-text text-muted truncate">{review.role ?? '—'}</span>
            </div>

            <div className="w-px self-stretch bg-border mx-3" />

            <div className="flex flex-col gap-0.5 w-40">
              <span className="label flex items-center gap-1">
                <IconOrg className="text-text-faint w-3 h-3 shrink-0" aria-hidden="true" />
                Organisasjon
              </span>
              <span className="small-text text-muted truncate">
                {review.orgURL ? (
                  <a href={review.orgURL} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {review.orgName ?? '—'}
                  </a>
                ) : (review.orgName ?? '—')}
              </span>
            </div>

            <div className="w-px self-stretch bg-border mx-3" />

            <div className="flex flex-col gap-0.5 w-64">
              <span className="label flex items-center gap-1">
                <IconQuote className="text-text-faint w-3 h-3 shrink-0" aria-hidden="true" />
                Melding
              </span>
              <span className="small-text text-muted truncate">{review.message}</span>
            </div>
          </div>

          <div className="w-px self-stretch bg-border mx-5" />
        </div>

        <div className="flex items-center gap-0.5 shrink-0">
          <Link href={`/admin/oppdater-anmeldelse/${review.id}`} className="btn btn-ghost p-2" aria-label="Rediger anmeldelse">
            <IconEdit className="w-5 h-5" aria-hidden="true" />
          </Link>
          <button
            className="btn btn-ghost p-2 text-error hover:bg-error-bg"
            aria-label="Slett anmeldelse"
            onClick={() => openPopUp({
              title: 'Vil du slette anmeldelsen?',
              subtitle: 'Er du sikker på at du vil slette denne anmeldelsen? Denne handlingen kan ikke angres.',
              yesLabel: 'Slett',
              noLabel: 'Avbryt',
              onYes: handleDelete,
            })}
          >
            <IconDelete className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="sm:hidden mt-3 pt-3 border-t border-border pl-3 flex flex-col gap-1.5">
        <div className="flex items-center flex-wrap gap-x-3 gap-y-1">
          <span className="small-text text-muted flex items-center gap-1">
            <IconPerson className="text-text-faint w-3 h-3 shrink-0" aria-hidden="true" />
            {review.role ?? '—'}
          </span>
          <span className="small-text text-muted flex items-center gap-1">
            <IconOrg className="text-text-faint w-3 h-3 shrink-0" aria-hidden="true" />
            {review.orgURL ? (
              <a href={review.orgURL} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {review.orgName ?? '—'}
              </a>
            ) : (review.orgName ?? '—')}
          </span>
        </div>
        <span className="small-text text-muted flex items-start gap-1">
          <IconQuote className="text-text-faint w-3 h-3 shrink-0 mt-0.5" aria-hidden="true" />
          <span className="line-clamp-3">{review.message}</span>
        </span>
      </div>
    </div>
  )
}
