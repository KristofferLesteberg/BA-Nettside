/* eslint-disable @next/next/no-img-element */
"use client"

import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { FaChevronLeft, FaChevronRight, FaImage } from 'react-icons/fa'

export default function ImageCarousel({ images, className }: { images: string[], className?: string }) {
  const swiperRef = useRef<SwiperType | null>(null)
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
    <div className={`flex items-stretch gap-2 ${className ?? ''}`}>

      {showNav && (
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="w-10 h-1/3 my-auto flex items-center justify-center shrink-0 text-primary hover:text-primary-hover hover:bg-surface-sunken active:bg-surface-sunken rounded-md transition-colors duration-250 cursor-pointer"
          aria-label="Forrige bilde"
        >
          <FaChevronLeft className="text-xl" />
        </button>
      )}

      <div className="min-w-0 flex-1 h-full rounded-2xl overflow-hidden">
        <Swiper
          onSwiper={(s) => { swiperRef.current = s }}
          modules={[Pagination]}
          slidesPerView={1}
          loop={images.length > 1}
          pagination={{ clickable: true }}
          className="w-full h-full"
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
  )
}
