/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState, useEffect } from 'react'
import { IoTrashOutline } from "react-icons/io5";
import { MdDragHandle } from "react-icons/md";
import { useDropzone } from 'react-dropzone'
import ImagesPreview from '@/components/shared/ImagesPreview'

import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core"

import {
  SortableContext,
  useSortable,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable"

import { restrictToHorizontalAxis, restrictToParentElement } from "@dnd-kit/modifiers"
import { CSS } from "@dnd-kit/utilities"

function AnimatedRow({ collapsed, children }: { collapsed: boolean; children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])
  return (
    <div className={`overflow-hidden transition-all duration-200 ease-in-out ${mounted && !collapsed ? "max-h-60" : "max-h-0"}`}>
      {children}
    </div>
  )
}

// An image is either:
// - existing: has an id and a url, no file
// - new: has an id, a file, and a preview url
export type ImageItem =
  | { id: string; type: "existing"; url: string }
  | { id: string; type: "new"; file: File; preview: string }

function SortableItem({ img, onDelete, onImageClick, isLeaving }: {
  img: ImageItem
  onDelete: (id: string) => void
  onImageClick?: () => void
  isLeaving?: boolean
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useSortable({ id: img.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: "transform 100ms cubic-bezier(0.25, 1, 0.5, 1)",
    zIndex: isDragging ? 50 : "auto" as any,
  }

  const src = img.type === "existing" ? img.url : img.preview

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className={`transition duration-200 ease-in ${isLeaving ? "opacity-0 scale-75" : "animate-fade-in"}`}>
        <div
          onClick={onImageClick}
          className="w-50 h-27.5 flex items-center
            justify-center overflow-hidden rounded-md bg-surface cursor-pointer
            border-2 border-secondary shadow-md shadow-secondary/35"
        >
          <img src={src} className="max-w-full max-h-full object-contain" alt="" />
        </div>
        <div
          className={`grid grid-cols-3 items-center px-1 py-0.5 mt-3
            rounded-md border border-border bg-surface transition-all duration-200
            ${isDragging ? "shadow-lg shadow-secondary/40" : ""}`}
        >
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium justify-self-start
            ${img.type === "existing" ? "bg-info-bg text-info" : "bg-success-bg text-success"}`}>
            {img.type === "existing" ? "Lagret" : "Ny"}
          </span>
          <div
            {...listeners}
            className="flex justify-center cursor-grab active:cursor-grabbing
              text-text-faint hover:text-secondary transition-colors duration-200"
          >
            <MdDragHandle className="text-lg" />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onDelete(img.id) }}
              className="btn btn-icon btn-error"
            >
              <IoTrashOutline />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ImageOrder({
  initialImages = [],
  onChange,
  onNewImage,
  resetKey
}: {
  initialImages?: { id: string; url: string }[]
  onChange?: (images: ImageItem[]) => void
  onNewImage?: (file: File) => Promise<{ id: string }>
  resetKey: number
}) {
  const [images, setImages] = useState<ImageItem[]>(
    initialImages.map(img => ({ id: img.id, type: "existing" as const, url: img.url }))
  )
  const [previewIndex, setPreviewIndex] = useState<number | null>(null)
  const [leavingIds, setLeavingIds] = useState<string[]>([])
  const [rowLeaving, setRowLeaving] = useState(false)

  const handleDelete = (id: string) => {
    const remainingCount = images.filter(img => img.id !== id && !leavingIds.includes(img.id)).length
    setLeavingIds(prev => [...prev, id])

    if (remainingCount === 0) {
      setTimeout(() => {
        setRowLeaving(true)
        setTimeout(() => {
          setImages([])
          onChange?.([])
          setLeavingIds([])
          setRowLeaving(false)
        }, 200)
      }, 100)
    } else {
      setTimeout(() => {
        const updated = images.filter(img => img.id !== id)
        setImages(updated)
        onChange?.(updated)
        setLeavingIds(prev => prev.filter(i => i !== id))
      }, 200)
    }
  }

  const onDrop = async (acceptedFiles: File[]) => {
    const newImages: ImageItem[] = await Promise.all(
      acceptedFiles.map(async (file) => {
        const id = onNewImage ? (await onNewImage(file)).id : crypto.randomUUID()
        return { id, type: "new" as const, file, preview: URL.createObjectURL(file) }
      })
    )
    const updated = [...images, ...newImages]
    setImages(updated)
    onChange?.(updated)
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "image/avif": [".avif"],
    }
  })

  function handleDragEnd(event: any) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const updated = arrayMove(
      images,
      images.findIndex(i => i.id === active.id),
      images.findIndex(i => i.id === over.id)
    )
    setImages(updated)
    onChange?.(updated)
  }

  return (
    <section className="container" suppressHydrationWarning>
      <div
        {...getRootProps()}
        
        className="bg-surface hover:bg-surface-raised hover:border-secondary transition-colors duration-200 min-h-20 flex group items-center justify-center text-center border-3 border-dashed border-border rounded-lg cursor-pointer mb-2">
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-5 text-text-faint p-5 group-hover:text-secondary transition-colors duration-200">
          <p>Dra og slipp filer her, eller klikk for å velge filer</p>
          <em>(Kun *.jpeg, *.png, .webp og .avif bilder godtas)</em>
        </div>
      </div>

      {(images.length > 0 || rowLeaving) && (
        <AnimatedRow collapsed={rowLeaving}>
        <aside className={`bg-surface rounded-lg px-2 pt-2 border-4 border-border transition duration-200 ease-in ${rowLeaving ? "opacity-0 -translate-y-2" : "animate-slide-down"}`}>
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
          >
            <SortableContext items={images.map(i => i.id)} strategy={horizontalListSortingStrategy}>
              <div
                className="flex flex-row gap-2 overflow-x-auto w-full max-w-full pb-5"
                onWheel={(e) => {
                  e.preventDefault()
                  e.currentTarget.scrollBy({ left: e.deltaY * 0.5, behavior: "smooth" })
                }}
              >
                {images.map((img, index) => (
                  <SortableItem
                    key={img.id}
                    img={img}
                    onDelete={handleDelete}
                    onImageClick={() => setPreviewIndex(index)}
                    isLeaving={leavingIds.includes(img.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </aside>
        </AnimatedRow>
      )}

      {previewIndex !== null && (
        <ImagesPreview
          imageIds={images.map(img => img.id)}
          initialIndex={previewIndex}
          onClose={() => setPreviewIndex(null)}
        />
      )}
    </section>
  )
}