"use client"

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import { FaQuoteLeft, FaExternalLinkAlt } from 'react-icons/fa'

interface Review {
  id:      number
  name:    string
  role:    string | null
  orgName: string | null
  orgURL:  string | null
  imageId: string | null
  message: string
}

export default function ReviewsCarouselClient({ reviews }: { reviews: Review[] }) {
  return (
    <div
      className="relative w-full"
      style={{ '--swiper-theme-color': 'var(--color-primary)' } as React.CSSProperties}
    >
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        slidesPerView={1}
        spaceBetween={24}
        loop={reviews.length > 2}
        autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          768:  { slidesPerView: 2, spaceBetween: 24 },
          1280: { slidesPerView: 3, spaceBetween: 32 },
        }}
        className="pb-12!"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id} className="h-auto">
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  const initials = review.name.charAt(0).toUpperCase()

  return (
    <article className="card-subtle flex flex-col gap-4 h-full min-h-52">

      {/* Quote + message */}
      <div className="flex-1 flex flex-col gap-3">
        <FaQuoteLeft className="text-xl shrink-0 text-primary" />
        <p className="body-text text-sm leading-relaxed">{review.message}</p>
      </div>

      {/* Divider */}
      <hr className="border-border" />

      {/* Author */}
      <div className="flex items-center gap-3">

        {/* Avatar */}
        <div className="w-11 h-11 rounded-full overflow-hidden border-2 shrink-0 bg-surface-sunken flex items-center justify-center border-secondary">
          {review.imageId ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`/images/${review.imageId}.webp`}
              alt={review.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm font-bold text-text-faint">
              {initials}
            </span>
          )}
        </div>

        {/* Name + meta */}
        <div className="min-w-0">
          <p className="font-semibold text-sm truncate text-text">
            {review.name}
          </p>
          {(review.role || review.orgName) && (
            <p className="text-xs flex items-center gap-1 flex-wrap text-text-faint">
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
                    <FaExternalLinkAlt className="text-[9px] opacity-60" />
                  </a>
                ) : (
                  <span>{review.orgName}</span>
                )
              )}
            </p>
          )}
        </div>

      </div>
    </article>
  )
}
