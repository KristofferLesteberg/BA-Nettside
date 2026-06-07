import { notFound, redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'
import { getReviewById } from '@/actions/reviews'
import UpdateReviewClient from './UpdateReviewClient'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const reviewId = parseInt((await params).id)
  if (Number.isNaN(reviewId)) notFound()

  const review = await getReviewById(reviewId)
  if (!review) notFound()

  return (
    <UpdateReviewClient
      reviewId={reviewId}
      name={review.name}
      role={review.role ?? ''}
      orgName={review.orgName ?? ''}
      orgURL={review.orgURL ?? ''}
      message={review.message}
      imageUrl={review.imageId ? `/images/${review.imageId}.webp` : undefined}
    />
  )
}
