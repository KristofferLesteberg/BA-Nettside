"use client"

import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { IconChevronLeft, IconChevronRight, IconClose } from "@/app/lib/icons"

const MIN_ZOOM = 1
const MAX_ZOOM = 5
const THUMB_SIZE = 56
const THUMB_GAP = 8
const THUMB_STEP = THUMB_SIZE + THUMB_GAP
const MAX_THUMB = 5
const THUMB_CLIP = MAX_THUMB * THUMB_SIZE + (MAX_THUMB - 1) * THUMB_GAP

interface ImagesPreviewProps {
  imageIds: string[]
  initialIndex?: number
  onClose: () => void
}

function getThumbWindowStart(total: number, active: number): number {
  return Math.max(0, Math.min(active - Math.floor(MAX_THUMB / 2), total - MAX_THUMB))
}

export default function ImagesPreview({ imageIds, initialIndex = 0, onClose }: ImagesPreviewProps) {
  const [index, setIndex] = useState(initialIndex)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [imageHotspot, setImageHotspot] = useState<{ imageId: string; top: number; left: number; w: number; h: number } | null>(null)

  const lastPointer = useRef({ x: 0, y: 0 })
  const imgContainerRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const canCloseRef = useRef(false)
  const containerSizeRef = useRef({ w: 0, h: 0 })
  const naturalDimsRef = useRef<{ w: number; h: number } | null>(null)
  const renderedDimsRef = useRef<{ rw: number; rh: number } | null>(null)
  const currentImageIdRef = useRef(imageIds[index])

  const loadedIndices = useMemo(() => {
    const s = new Set<number>()
    ;[index - 1, index, index + 1].forEach(i => {
      if (i >= 0 && i < imageIds.length) s.add(i)
    })
    return s
  }, [index, imageIds.length])

  const resetView = useCallback(() => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }, [])

  const handleClose = useCallback(() => {
    setIsVisible(false)
    setTimeout(() => onClose(), 200)
  }, [onClose])

  const prev = useCallback(() => {
    setIndex(i => (i - 1 + imageIds.length) % imageIds.length)
    resetView()
  }, [imageIds.length, resetView])

  const next = useCallback(() => {
    setIndex(i => (i + 1) % imageIds.length)
    resetView()
  }, [imageIds.length, resetView])

  const goTo = useCallback((i: number) => {
    setIndex(i)
    resetView()
  }, [resetView])

  const clampPan = useCallback((px: number, py: number, z: number) => {
    const { w: cw, h: ch } = containerSizeRef.current
    const rd = renderedDimsRef.current
    if (!rd || !cw || !ch) return { x: px, y: py }
    const maxX = Math.max(0, (rd.rw * z - cw) / 2)
    const maxY = Math.max(0, (rd.rh * z - ch) / 2)
    return {
      x: Math.min(maxX, Math.max(-maxX, px)),
      y: Math.min(maxY, Math.max(-maxY, py)),
    }
  }, [])

  const recalcHotspot = useCallback((imageId: string) => {
    const nat = naturalDimsRef.current
    const { w: cw, h: ch } = containerSizeRef.current
    if (!nat || !cw || !ch) return
    let rw: number, rh: number
    if (nat.w / nat.h > cw / ch) {
      rw = cw; rh = cw * nat.h / nat.w
    } else {
      rh = ch; rw = ch * nat.w / nat.h
    }
    renderedDimsRef.current = { rw, rh }
    setImageHotspot({ imageId, top: (ch - rh) / 2, left: (cw - rw) / 2, w: rw, h: rh })
  }, [])

  useEffect(() => {
    returnFocusRef.current = document.activeElement as HTMLElement
    requestAnimationFrame(() => setIsVisible(true))
    closeButtonRef.current?.focus()
    const id = setTimeout(() => { canCloseRef.current = true }, 300)
    return () => {
      clearTimeout(id)
      returnFocusRef.current?.focus()
    }
  }, [])

  // Reset natural dims ref when image changes — only ref mutations, no setState
  useEffect(() => {
    naturalDimsRef.current = null
    currentImageIdRef.current = imageIds[index]
  }, [index, imageIds])

  // Track container dimensions for hotspot recalculation on resize
  useEffect(() => {
    const el = imgContainerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      containerSizeRef.current = { w: entry.contentRect.width, h: entry.contentRect.height }
      recalcHotspot(currentImageIdRef.current)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [recalcHotspot])

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
      if (e.key === "Tab") {
        const focusable = Array.from(
          dialogRef.current?.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          ) ?? []
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus() }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus() }
        }
      }
    }
    window.addEventListener("keydown", onKey)

    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [handleClose, prev, next])

  useEffect(() => {
    const el = imgContainerRef.current
    if (!el) return

    function onWheel(e: WheelEvent) {
      e.preventDefault()
      const factor = 1 - e.deltaY * 0.002
      setZoom(z => {
        const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z * factor))
        if (next <= MIN_ZOOM) {
          setPan({ x: 0, y: 0 })
        } else {
          setPan(p => clampPan(p.x, p.y, next))
        }
        return next
      })
    }

    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [clampPan])

  function onPointerDown(e: React.PointerEvent) {
    setIsDragging(true)
    lastPointer.current = { x: e.clientX, y: e.clientY }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!isDragging) return
    const dx = e.clientX - lastPointer.current.x
    const dy = e.clientY - lastPointer.current.y
    lastPointer.current = { x: e.clientX, y: e.clientY }
    setPan(p => clampPan(p.x + dx, p.y + dy, zoom))
  }

  function onPointerUp() {
    setIsDragging(false)
  }

  function onDoubleClick() {
    if (zoom > 1) {
      resetView()
    } else {
      setZoom(2.5)
    }
  }

  const hotspot = imageHotspot?.imageId === imageIds[index] ? imageHotspot : null

  const showNav = imageIds.length > 1
  const usesThumbWindow = imageIds.length > MAX_THUMB
  const thumbWindowStart = usesThumbWindow ? getThumbWindowStart(imageIds.length, index) : 0
  const thumbTranslateX = usesThumbWindow ? -thumbWindowStart * THUMB_STEP : 0

  if (typeof document === "undefined") return null

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Bildeforhåndsvisning"
      tabIndex={-1}
      className={`fixed inset-0 z-50 flex flex-col bg-black/90 transition-all duration-200 origin-center outline-none ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]"
      }`}
      onClick={() => { if (canCloseRef.current) handleClose() }}
    >

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 shrink-0">
        <span className="small-text text-white/40" aria-live="polite">
          {showNav ? `${index + 1} / ${imageIds.length}` : ""}
        </span>
        <button
          ref={closeButtonRef}
          onClick={e => { e.stopPropagation(); handleClose() }}
          className="p-2 rounded-md transition-colors duration-150 text-primary hover:text-primary-hover hover:bg-white/10 active:bg-white/15 cursor-pointer"
          aria-label="Lukk bildeforhåndsvisning"
        >
          <IconClose className="text-lg" />
        </button>
      </div>

      {/* Main image row */}
      <div className="flex-1 flex items-center justify-center min-h-0 px-2 gap-2">
        {showNav && (
          <button
            onClick={e => { e.stopPropagation(); prev() }}
            className="w-10 h-24 my-auto flex items-center justify-center shrink-0 transition-colors duration-150 text-primary hover:text-primary-hover hover:bg-white/10 active:bg-white/15 rounded-md cursor-pointer"
            aria-label="Forrige bilde"
          >
            <IconChevronLeft className="text-xl" />
          </button>
        )}

        <div
          ref={imgContainerRef}
          className="relative flex-1 h-full overflow-hidden"
        >
          {/* All loaded images stacked — opacity transition provides cross-fade */}
          {imageIds.map((id, i) =>
            loadedIndices.has(i) ? (
              <div
                key={id}
                className="absolute inset-0"
                style={{
                  opacity: i === index ? 1 : 0,
                  zIndex: i === index ? 1 : 0,
                  pointerEvents: "none",
                  transform: i === index
                    ? `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`
                    : "none",
                  transition: isDragging && i === index
                    ? "opacity 200ms ease"
                    : "opacity 200ms ease, transform 0.2s ease",
                }}
              >
                <Image
                  src={`/images/high-res/${id}.webp`}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 85vw"
                  className="object-contain select-none"
                  draggable={false}
                  {...(i === index
                    ? {
                        priority: true,
                        onLoad: (e) => {
                          naturalDimsRef.current = { w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight }
                          recalcHotspot(id)
                        },
                      }
                    : { loading: "eager" as const })}
                />
              </div>
            ) : null
          )}

          {/* Drag overlay when zoomed — covers full container so pan works past original bounds */}
          {zoom > 1 && (
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ cursor: isDragging ? "grabbing" : "grab", zIndex: 2 }}
              onClick={e => e.stopPropagation()}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
              onDoubleClick={onDoubleClick}
            />
          )}

          {/* Cursor hotspot at zoom=1 — restricted to actual rendered image bounds */}
          {zoom <= 1 && hotspot && (
            <div
              aria-hidden="true"
              className="absolute"
              style={{
                top: hotspot.top,
                left: hotspot.left,
                width: hotspot.w,
                height: hotspot.h,
                cursor: "zoom-in",
                zIndex: 2,
              }}
              onClick={e => e.stopPropagation()}
              onDoubleClick={onDoubleClick}
            />
          )}
        </div>

        {showNav && (
          <button
            onClick={e => { e.stopPropagation(); next() }}
            className="w-10 h-24 my-auto flex items-center justify-center shrink-0 transition-colors duration-150 text-primary hover:text-primary-hover hover:bg-white/10 active:bg-white/15 rounded-md cursor-pointer"
            aria-label="Neste bilde"
          >
            <IconChevronRight className="text-xl" />
          </button>
        )}
      </div>

      {/* Thumbnail strip with sliding window */}
      {showNav && (
        <div className="flex justify-center py-3 px-4 shrink-0">
          <div style={{ overflow: "hidden", width: usesThumbWindow ? THUMB_CLIP : undefined }}>
            <div
              className="flex"
              style={{
                gap: THUMB_GAP,
                transform: `translateX(${thumbTranslateX}px)`,
                transition: "transform 300ms ease",
              }}
            >
              {imageIds.map((id, i) => (
                <button
                  key={id}
                  onClick={e => { e.stopPropagation(); goTo(i) }}
                  style={{ width: THUMB_SIZE, height: THUMB_SIZE, flexShrink: 0 }}
                  className={`relative rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                    i === index
                      ? "border-white opacity-100"
                      : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                  aria-label={`Gå til bilde ${i + 1}`}
                >
                  <Image
                    src={`/images/low-res/${id}.webp`}
                    alt=""
                    fill
                    sizes={`${THUMB_SIZE}px`}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>,
    document.body
  )
}
