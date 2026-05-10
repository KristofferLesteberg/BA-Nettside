/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { useDropzone } from 'react-dropzone'

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

// An image is either:
// - existing: has an id and a url, no file
// - new: has an id, a file, and a preview url
export type ImageItem =
  | { id: string; type: "existing"; url: string }
  | { id: string; type: "new"; file: File; preview: string }

function SortableItem({ img, onDelete }: { img: ImageItem; onDelete: (id: string) => void }) {
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
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`cursor-grab relative group transition-all duration-200 ${isDragging ? "shadow-xl cursor-grabbing" : ""}`}
    >
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onDelete(img.id) }}
        className="
          absolute top-2 right-2 rounded-full cursor-pointer
          bg-error-bg w-5 h-5 flex items-center justify-center
          text-error opacity-0 group-hover:opacity-70
          hover:opacity-100 transition-opacity duration-200
        "
      >
        <IoClose />
      </button>
      <div
        {...listeners}
        className="w-[200px] h-[110px] bg-gray-100 flex items-center
          justify-center overflow-hidden rounded-md
          border-2 border-secondary shadow-md shadow-secondary/35"
      >
        <img src={src} className="max-w-full max-h-full object-contain" alt="" />
      </div>
      {/* Badge to distinguish existing vs new */}
      <span className={`absolute bottom-2 left-2 text-[10px] px-1.5 py-0.5 rounded-full font-medium
        ${img.type === "existing" ? "bg-info-bg text-info" : "bg-success-bg text-success"}`}>
        {img.type === "existing" ? "Lagret" : "Ny"}
      </span>
    </div>
  )
}

export default function ImageOrder({
  initialImages = [],
  onChange,
  onNewImage,
}: {
  initialImages?: { id: string; url: string }[]
  onChange?: (images: ImageItem[]) => void
  onNewImage?: (file: File) => Promise<{ id: string }>
}) {
  const [images, setImages] = useState<ImageItem[]>(
    initialImages.map(img => ({ id: img.id, type: "existing" as const, url: img.url }))
  )

  const handleDelete = (id: string) => {
    const updated = images.filter(img => img.id !== id)
    setImages(updated)
    onChange?.(updated)
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
        
        className="bg-surface hover:bg-surface-raised hover:border-secondary transition-colors duration-200 min-h-20 flex group items-center justify-center text-center border-3 border-dashed border-border rounded-lg cursor-pointer mb-4">
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-5 text-text-faint p-5 group-hover:text-secondary transition-colors duration-200">
          <p>Drag and drop some files here, or click to select files</p>
          <em>(Only *.jpeg, *.png, *.webp and *.avif images will be accepted)</em>
        </div>
      </div>

      {images.length > 0 && (
        <aside className="bg-surface rounded-lg px-2 pt-2 border-4 border-border">
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
                
                {images.map(img => (
                  <SortableItem key={img.id} img={img} onDelete={handleDelete} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </aside>
      )}
    </section>
  )
}