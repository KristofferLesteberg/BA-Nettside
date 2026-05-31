"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa"

const MIN_ZOOM = 1
const MAX_ZOOM = 5

interface ImagesPreviewProps {
  imageIds: string[]
  initialIndex?: number
  onClose: () => void
}

export default function ImagesPreview({ imageIds, initialIndex = 0, onClose }: ImagesPreviewProps) {
  const [index, setIndex] = useState(initialIndex)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const lastPointer = useRef({ x: 0, y: 0 })
  const imgContainerRef = useRef<HTMLDivElement>(null)

  const resetView = useCallback(() => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }, [])

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

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)

    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose, prev, next])

  useEffect(() => {
    const el = imgContainerRef.current
    if (!el) return

    function onWheel(e: WheelEvent) {
      e.preventDefault()
      const factor = 1 - e.deltaY * 0.002
      setZoom(z => {
        const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z * factor))
        if (next <= MIN_ZOOM) setPan({ x: 0, y: 0 })
        return next
      })
    }

    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [])

  function onPointerDown(e: React.PointerEvent) {
    if (zoom <= 1) return
    setIsDragging(true)
    lastPointer.current = { x: e.clientX, y: e.clientY }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!isDragging) return
    const dx = e.clientX - lastPointer.current.x
    const dy = e.clientY - lastPointer.current.y
    lastPointer.current = { x: e.clientX, y: e.clientY }
    setPan(p => ({ x: p.x + dx, y: p.y + dy }))
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

  const showNav = imageIds.length > 1

  if (typeof document === "undefined") return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex flex-col bg-black/90" onClick={onClose}>

      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 shrink-0"
        onClick={e => e.stopPropagation()}
      >
        <span className="small-text" style={{ color: "rgba(255,255,255,0.4)" }}>
          {showNav ? `${index + 1} / ${imageIds.length}` : ""}
        </span>
        <button
          onClick={onClose}
          className="p-2 rounded-full transition-colors"
          style={{ color: "rgba(255,255,255,0.7)" }}
          aria-label="Lukk"
        >
          <FaTimes className="text-lg" />
        </button>
      </div>

      {/* Main image row */}
      <div
        className="flex-1 flex items-center justify-center min-h-0 px-2 gap-2"
        onClick={e => e.stopPropagation()}
      >
        {showNav && (
          <button
            onClick={prev}
            className="p-3 rounded-full shrink-0 transition-colors"
            style={{ color: "rgba(255,255,255,0.7)" }}
            aria-label="Forrige bilde"
          >
            <FaChevronLeft className="text-2xl" />
          </button>
        )}

        <div
          ref={imgContainerRef}
          className="relative flex-1 h-full overflow-hidden"
          style={{ cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in" }}
          onClick={e => e.stopPropagation()}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onDoubleClick={onDoubleClick}
        >
          <div
            className="absolute inset-0"
            style={{
              transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
              transition: isDragging ? "none" : "transform 0.2s ease",
            }}
          >
            <Image
              key={imageIds[index]}
              src={`/images/high-res/${imageIds[index]}.webp`}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 85vw"
              className="object-contain select-none"
              draggable={false}
              priority
            />
          </div>
        </div>

        {showNav && (
          <button
            onClick={next}
            className="p-3 rounded-full shrink-0 transition-colors"
            style={{ color: "rgba(255,255,255,0.7)" }}
            aria-label="Neste bilde"
          >
            <FaChevronRight className="text-2xl" />
          </button>
        )}
      </div>

      {/* Thumbnail strip */}
      {showNav && (
        <div
          className="flex gap-2 justify-center py-3 px-4 shrink-0 overflow-x-auto"
          onClick={e => e.stopPropagation()}
        >
          {imageIds.map((id, i) => (
            <button
              key={id}
              onClick={() => goTo(i)}
              className={`relative shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                i === index ? "border-white" : "border-transparent opacity-50 hover:opacity-80"
              }`}
              aria-label={`Gå til bilde ${i + 1}`}
            >
              <Image
                src={`/images/low-res/${id}.webp`}
                alt=""
                fill
                sizes="56px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

    </div>,
    document.body
  )
}
