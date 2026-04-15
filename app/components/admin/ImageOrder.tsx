/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use state"
import { useState } from 'react'
import React from 'react'
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

function SortableItem({ img }: { img: ImageItem }) {
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
      {...listeners}
      className="cursor-grab"
    >
      <div className="w-[200px] h-[110px] 
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

export default function ImageOrder(props: any) {
  const [images, setImages] = useState<ImageItem[]>([])

  const onDrop = (acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map(file => ({
      id: crypto.randomUUID(), // or randomUUID()
      file,
      preview: URL.createObjectURL(file),
    }))

    const updated = [...images, ...newImages]
    setImages(updated)
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
            <div className="flex flex-row gap-4 overflow-x-auto py-2 w-full max-w-full pb-5">
              {images.map(img => (
                <SortableItem key={img.id} img={img} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </aside>
    </section>
  );
}