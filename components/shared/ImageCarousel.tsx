/* eslint-disable @next/next/no-img-element */
"use client"

import { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { FaChevronLeft, FaChevronRight, FaImage } from 'react-icons/fa'

const MAX_DOTS = 7

type DotSize = 'active' | 'normal' | 'small' | 'tiny'

const DOT_CLASSES: Record<DotSize, string> = {
  active: 'w-5 h-2 bg-primary',
  normal: 'w-2 h-2 bg-border hover:bg-border-strong',
  small:  'w-1.5 h-1.5 bg-border opacity-60',
  tiny:   'w-1 h-1 bg-border opacity-40',
}

function getDots(total: number, active: number): { index: number; size: DotSize }[] {
  if (total <= MAX_DOTS) {
    return Array.from({ length: total }, (_, i) => ({
      index: i,
      size: i === active ? 'active' : 'normal',
    }))
  }

  const windowStart = Math.max(0, Math.min(active - Math.floor(MAX_DOTS / 2), total - MAX_DOTS))
  const windowEnd   = windowStart + MAX_DOTS - 1
  const hasMoreBefore = windowStart > 0
  const hasMoreAfter  = windowEnd < total - 1

  return Array.from({ length: MAX_DOTS }, (_, p) => {
    const index = windowStart + p
    const isActive = index === active
    let size: DotSize = 'normal'
    if (isActive)                            size = 'active'
    else if (p === 0 && hasMoreBefore)       size = 'tiny'
    else if (p === 1 && hasMoreBefore)       size = 'small'
    else if (p === MAX_DOTS - 1 && hasMoreAfter) size = 'tiny'
    else if (p === MAX_DOTS - 2 && hasMoreAfter) size = 'small'
    return { index, size }
  })
}

export default function ImageCarousel({ images, className }: { images: string[], className?: string }) {
  const swiperRef = useRef<SwiperType | null>(null)
  const [realIndex, setRealIndex] = useState(0)
  const showNav = images.length > 1

  if (images.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center gap-3 card-subtle rounded-2xl border-default ${className ?? ''}`}>
        <FaImage className="text-5xl text-faint" />
        <p className="small-text text-faint">Ingen bilder tilgjengelig</p>
      </div>
    )
  }

  const dots = getDots(images.length, realIndex)

  return (
    <div className={`flex flex-col gap-2 ${className ?? ''}`}>

      {/* Image row */}
      <div className="flex items-stretch gap-2 flex-1 min-h-0">

        {showNav && (
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-10 h-1/3 my-auto flex items-center justify-center shrink-0 text-primary hover:text-primary-hover hover:bg-surface-sunken active:bg-surface-sunken rounded-md transition-colors duration-250 cursor-pointer"
            aria-label="Forrige bilde"
          >
            <FaChevronLeft className="text-xl" />
          </button>
        )}

        <div className="min-w-0 flex-1 relative">
          <Swiper
            onSwiper={(s) => { swiperRef.current = s }}
            onSlideChange={(s) => setRealIndex(s.realIndex)}
            slidesPerView={1}
            loop={images.length > 1}
            speed={500}
            className="image-swiper absolute inset-0 rounded-2xl overflow-hidden"
          >
            {images.map((imageId) => (
              <SwiperSlide key={imageId} className="flex items-center justify-center">
                <img
                  src={`/images/${imageId}.webp`}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {showNav && (
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="w-10 h-1/3 my-auto flex items-center justify-center shrink-0 text-primary hover:text-primary-hover hover:bg-surface-sunken active:bg-surface-sunken rounded-md transition-colors duration-250 cursor-pointer"
            aria-label="Neste bilde"
          >
            <FaChevronRight className="text-xl" />
          </button>
        )}

      </div>

      {/* Pagination dots — condensed window, outside the image frame */}
      {showNav && (
        <div className="flex justify-center items-center gap-2">
          {dots.map((dot, p) => (
            <button
              key={p}
              onClick={() => swiperRef.current?.slideToLoop(dot.index)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${DOT_CLASSES[dot.size]}`}
              aria-label={`Gå til bilde ${dot.index + 1}`}
            />
          ))}
        </div>
      )}

    </div>
  )
}
