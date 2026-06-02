"use client"

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { FaChevronLeft, FaChevronRight, FaImage } from 'react-icons/fa'

const MAX_VISIBLE = 7
const SLOT_PX     = 18                                                        // reserved width per dot slot
const GAP_PX      = 4                                                         // 4px
const STEP_PX     = SLOT_PX + GAP_PX                                          // 22px per step
const CLIP_PX     = MAX_VISIBLE * SLOT_PX + (MAX_VISIBLE - 1) * GAP_PX       // 150px visible window

type DotSize = 'active' | 'normal' | 'small' | 'tiny'

const DOT_CLASSES: Record<DotSize, string> = {
  active: 'w-5 h-2 bg-primary',
  normal: 'w-2 h-2 bg-border',
  small:  'w-2 h-2 bg-border opacity-60',
  tiny:   'w-1.5 h-1.5 bg-border opacity-30',
}

// Computes the clip-path inset that rounds just the visible image content corners,
// not the full element box (which is larger due to object-contain letterboxing).
function ContainedImage({ src, sizes }: { src: string; sizes: string }) {
  const outerRef    = useRef<HTMLDivElement>(null)
  const naturalRef  = useRef<{ w: number; h: number } | null>(null)
  const [clipPath, setClipPath] = useState('')

  function recalcClip() {
    const outer = outerRef.current
    const nat   = naturalRef.current
    if (!outer || !nat || !nat.w || !nat.h) return
    const cw = outer.clientWidth
    const ch = outer.clientHeight
    if (!cw || !ch) return
    let rw: number, rh: number
    if (nat.w / nat.h > cw / ch) {
      rw = cw;  rh = cw * nat.h / nat.w
    } else {
      rh = ch;  rw = ch * nat.w / nat.h
    }
    const t = (ch - rh) / 2
    const l = (cw - rw) / 2
    setClipPath(`inset(${t}px ${cw - l - rw}px ${ch - t - rh}px ${l}px round 12px)`)
  }

  function handleLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    naturalRef.current = { w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight }
    recalcClip()
  }

  useEffect(() => {
    const outer = outerRef.current
    if (!outer) return
    const ro = new ResizeObserver(recalcClip)
    ro.observe(outer)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={outerRef} className="absolute inset-3">
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        className="object-contain"
        style={clipPath ? { clipPath } : undefined}
        onLoad={handleLoad}
      />
    </div>
  )
}

function getWindowStart(total: number, active: number): number {
  return Math.max(0, Math.min(active - Math.floor(MAX_VISIBLE / 2), total - MAX_VISIBLE))
}

function getDotSize(i: number, active: number, windowStart: number, total: number): DotSize {
  if (i === active) return 'active'
  if (total <= MAX_VISIBLE) return 'normal'
  const vp = i - windowStart
  const hasMoreBefore = windowStart > 0
  const hasMoreAfter  = windowStart + MAX_VISIBLE < total
  if (vp < 0 || vp >= MAX_VISIBLE)                  return 'tiny'
  if (vp === 0 && hasMoreBefore)                    return 'tiny'
  if (vp === 1 && hasMoreBefore)                    return 'small'
  if (vp === MAX_VISIBLE - 1 && hasMoreAfter)       return 'tiny'
  if (vp === MAX_VISIBLE - 2 && hasMoreAfter)       return 'small'
  return 'normal'
}

export default function ImageCarousel({
  images,
  className,
  sizes = '(max-width: 1024px) 100vw, 50vw',
  onImageClick,
}: {
  images: string[]
  className?: string
  sizes?: string
  onImageClick?: (index: number) => void
}) {
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

  const usesWindow  = images.length > MAX_VISIBLE
  const windowStart = usesWindow ? getWindowStart(images.length, realIndex) : 0
  const translateX  = usesWindow ? -windowStart * STEP_PX : 0

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
            onClick={(s) => onImageClick?.(s.realIndex)}
            slidesPerView={1}
            loop={images.length > 1}
            speed={500}
            className={`image-swiper absolute inset-0 rounded-2xl overflow-hidden bg-surface-sunken${onImageClick ? ' cursor-zoom-in' : ''}`}
          >
            {images.map((imageId) => (
              <SwiperSlide key={imageId}>
                <ContainedImage
                  src={`/images/med-res/${imageId}.webp`}
                  sizes={sizes}
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

      {/* Pagination dots — sliding window with clipped overflow */}
      {showNav && (
        <div className="flex justify-center">
          <div style={{ overflow: 'hidden', width: usesWindow ? CLIP_PX : undefined }}>
            <div
              className="flex items-center"
              style={{
                gap: GAP_PX,
                transform: `translateX(${translateX}px)`,
                transition: 'transform 300ms ease',
              }}
            >
              {images.map((_, i) => {
                const size = getDotSize(i, realIndex, windowStart, images.length)
                return (
                  <button
                    key={i}
                    onClick={() => swiperRef.current?.slideToLoop(i)}
                    style={{ width: SLOT_PX, height: SLOT_PX, flexShrink: 0 }}
                    className="flex items-center justify-center cursor-pointer group"
                    aria-label={`Gå til bilde ${i + 1}`}
                  >
                    <div
                      className={`rounded-full transition-all duration-300 ${DOT_CLASSES[size]} ${size !== 'active' ? 'group-hover:bg-border-strong' : ''}`}
                    />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
