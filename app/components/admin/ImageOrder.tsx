/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use state"
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

import { restrictToHorizontalAxis, restrictToParentElement, } from "@dnd-kit/modifiers"

import { CSS } from "@dnd-kit/utilities"

type ImageItem = {
  id: string
  file: File
  preview: string
}

function SortableItem({ img, onDelete }: { img: ImageItem, onDelete: (id: string) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: img.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: "transform 100ms cubic-bezier(0.25, 1, 0.5, 1)",
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="cursor-grab relative group"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onDelete(img.id)
        }} 
        className="
          absolute top-2 right-2 rounded-full cursor-pointer 
          bg-error-bg w-5 h-5 flex items-center justify-center 
          text-error opacity-0 group-hover:opacity-70
          hover:opacity-100 transition-opacity duration-200
      ">
        <IoClose />
      </button>
      <div {...listeners} className="w-[200px] h-[110px] 
        bg-gray-100 flex items-center 
        justify-center overflow-hidden rounded-md
        border-[1.5px] border-border">
        <img
          src={img.preview}
          className="max-w-full max-h-full object-contain"
          alt=""
        />
      </div>
    </div>
  )
}

export default function ImageOrder({ 
  onChange 
}: { 
  onChange?: (images: { id: string, file: File }[]) => void
}) {
  const [images, setImages] = useState<ImageItem[]>([])

  const handleDelete = (id: string) => {
    const updated = images.filter(img => img.id !== id)
    setImages(updated)
    onChange?.(updated.map(({ id, file }) => ({ id, file })))
  }

  const onDrop = (acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map(file => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }))

    const updated = [...images, ...newImages]
    setImages(updated)
    onChange?.(updated.map(({ id, file }) => ({ id, file })))
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  function handleDragEnd(event: any) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const updated = arrayMove(
      images,
      images.findIndex(i => i.id === active.id),
      images.findIndex(i => i.id === over.id)
    )

    setImages(updated)
  }

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})} className="
        bg-surface hover:bg-surface-raised hover:border-primary transition-colors duration-200
        min-h-20 flex
        items-center justify-center text-center
        border-3 border-dashed border-border 
        rounded-lg cursor-pointer mb-4">
        <input {...getInputProps()} />
        <p>Drag n drop some files here, or click to select files</p>
      </div>
      <aside>
        <DndContext 
          collisionDetection={closestCenter} 
          onDragEnd={handleDragEnd} 
          modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
        >
          <SortableContext
            items={images.map(i => i.id)}
            strategy={horizontalListSortingStrategy}
          >
            <div className="flex flex-row gap-2 overflow-x-auto pb-2 w-full max-w-full pb-5">
              {images.map(img => (
                <SortableItem key={img.id} img={img} onDelete={handleDelete} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </aside>
    </section>
  );
}