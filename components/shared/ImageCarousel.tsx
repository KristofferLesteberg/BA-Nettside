/* eslint-disable @next/next/no-img-element */
"use client"

import { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { FaChevronLeft, FaChevronRight, FaImage } from 'react-icons/fa'

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

      {/* Pagination dots — outside the image frame */}
      {showNav && (
        <div className="flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => swiperRef.current?.slideToLoop(i)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                i === realIndex
                  ? 'w-5 h-2 bg-primary'
                  : 'w-2 h-2 bg-border hover:bg-border-strong'
              }`}
              aria-label={`Gå til bilde ${i + 1}`}
            />
          ))}
        </div>
      )}

    </div>
  )
}
