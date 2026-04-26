"use client"

import { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { FaQuoteLeft, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface Review {
  id:      number
  name:    string
  role:    string | null
  orgName: string | null
  orgURL:  string | null
  imageId: string | null
  message: string
}

export default function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const swiperRef    = useRef<SwiperType | null>(null)
  const swiperColRef = useRef<HTMLDivElement>(null)
  const [needsNav,  setNeedsNav]  = useState(false)
  const [btnHeight, setBtnHeight] = useState<number | undefined>()

  useEffect(() => {
    const el = swiperColRef.current
    if (!el) return
    const update = () => setBtnHeight(el.offsetHeight / 2)
    const ro = new ResizeObserver(update)
    ro.observe(el)
    update()
    return () => ro.disconnect()
  }, [])

  const updateNav = (swiper: SwiperType) => {
    const perView = typeof swiper.params.slidesPerView === 'number' ? swiper.params.slidesPerView : 1
    setNeedsNav(reviews.length > perView)
  }

  return (
    <div
      className="w-full"
      style={{ '--swiper-theme-color': 'var(--color-primary)' } as React.CSSProperties}
    >
      <div className="flex items-center gap-3">

        {needsNav && (
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-10 flex items-center justify-center shrink-0 text-primary hover:text-primary-hover hover:bg-surface-sunken active:bg-surface-sunken rounded-md transition-colors duration-250 cursor-pointer"
            style={{ height: btnHeight }}
            aria-label="Forrige"
          >
            <FaChevronLeft className="text-xl" />
          </button>
        )}

        <div className="min-w-0 flex-1" ref={swiperColRef}>
          <Swiper
            onSwiper={(s) => { swiperRef.current = s; updateNav(s) }}
            onBreakpoint={updateNav}
            modules={[Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={24}
            loop={reviews.length > 2}
            autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: false, el: '#reviews-pagination' }}
            breakpoints={{
              768:  { slidesPerView: 2, spaceBetween: 24 },
              1280: { slidesPerView: 3, spaceBetween: 32 },
            }}
            className="reviews-swiper"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id} className="h-auto!">
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {needsNav && (
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="w-10 flex items-center justify-center shrink-0 text-primary hover:text-primary-hover hover:bg-surface-sunken active:bg-surface-sunken rounded-md transition-colors duration-250 cursor-pointer"
            style={{ height: btnHeight }}
            aria-label="Neste"
          >
            <FaChevronRight className="text-xl" />
          </button>
        )}

      </div>

      <div id="reviews-pagination" className="flex justify-center mt-5" />
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  const initials = review.name.charAt(0).toUpperCase()

  return (
    <article className="card-subtle flex flex-col gap-4 h-full">

      <div className="flex-1 flex flex-col gap-3">
        <FaQuoteLeft className="text-2xl shrink-0 text-primary" />
        <p className="body-text leading-relaxed">{review.message}</p>
      </div>

      <hr className="border-border" />

      <div className="flex items-center gap-3">

        <div className="w-12 h-12 rounded-full overflow-hidden border-2 shrink-0 bg-surface-sunken flex items-center justify-center border-secondary">
          {review.imageId ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`/images/${review.imageId}.webp`}
              alt={review.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-base font-bold text-text-faint">
              {initials}
            </span>
          )}
        </div>

        <div className="min-w-0">
          <p className="font-semibold text-base truncate text-text">{review.name}</p>
          {(review.role || review.orgName) && (
            <p className="text-sm flex items-center gap-1 flex-wrap text-text-faint">
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
        </div>

      </div>
    </article>
  )
}
