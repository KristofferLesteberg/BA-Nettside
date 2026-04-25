"use client"

import { useState, useCallback } from "react"
import Cropper, { type Area } from "react-easy-crop"
import Slider from "rc-slider"
import { useDropzone } from "react-dropzone"

const OUTPUT_SIZE = 400

async function getCroppedBlob(imageSrc: string, pixels: Area): Promise<Blob> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.addEventListener("load", () => resolve(img))
    img.addEventListener("error", reject)
    img.src = imageSrc
  })

  const canvas = document.createElement("canvas")
  canvas.width = OUTPUT_SIZE
  canvas.height = OUTPUT_SIZE
  const ctx = canvas.getContext("2d")!

  ctx.drawImage(
    image,
    pixels.x, pixels.y, pixels.width, pixels.height,
    0, 0, OUTPUT_SIZE, OUTPUT_SIZE
  )

  return new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Canvas is empty"))),
      "image/webp",
      0.92
    )
  )
}

type Stage = "empty" | "cropping" | "confirmed"

export interface ReviewImageInputProps {
  initialUrl?: string
  onChange: (file: File | null) => void
}

export default function ReviewImageInput({ initialUrl, onChange }: ReviewImageInputProps) {
  const [stage, setStage]                       = useState<Stage>(initialUrl ? "confirmed" : "empty")
  const [imageSrc, setImageSrc]                 = useState<string | null>(null)
  const [previewUrl, setPreviewUrl]             = useState<string | null>(initialUrl ?? null)
  const [crop, setCrop]                         = useState({ x: 0, y: 0 })
  const [zoom, setZoom]                         = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const onCropComplete = useCallback((_: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels)
  }, [])

  const onDrop = useCallback((accepted: File[]) => {
    const file = accepted[0]
    if (!file) return
    const reader = new FileReader()
    reader.addEventListener("load", () => {
      setImageSrc(reader.result as string)
      setCrop({ x: 0, y: 0 })
      setZoom(1)
      setStage("cropping")
    })
    reader.readAsDataURL(file)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png":  [".png"],
      "image/webp": [".webp"],
      "image/avif": [".avif"],
    },
    maxFiles: 1,
  })

  const handleConfirm = async () => {
    if (!imageSrc || !croppedAreaPixels) return
    const blob = await getCroppedBlob(imageSrc, croppedAreaPixels)
    const file = new File([blob], `avatar-${Date.now()}.webp`, { type: "image/webp" })
    setPreviewUrl(URL.createObjectURL(blob))
    setStage("confirmed")
    onChange(file)
  }

  const handleCancel = () => {
    setImageSrc(null)
    setStage(previewUrl ? "confirmed" : "empty")
  }

  if (stage === "confirmed" && previewUrl) {
    return (
      <div className="flex flex-col items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={previewUrl}
          alt="Profilbilde"
          className="w-32 h-32 rounded-full object-cover border-4 border-secondary shadow-md"
        />
        <button
          type="button"
          onClick={() => setStage("empty")}
          className="btn btn-outline text-sm"
        >
          Bytt bilde
        </button>
      </div>
    )
  }

  if (stage === "cropping" && imageSrc) {
    return (
      <div className="flex flex-col gap-4">
        <div className="relative w-full h-72 rounded-lg overflow-hidden bg-[#111]">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="flex items-center gap-4 px-1">
          <span className="text-sm text-text-faint whitespace-nowrap">Zoom</span>
          <Slider
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={(v) => setZoom(v as number)}
          />
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={handleConfirm} className="btn btn-primary flex-1">
            Bekreft valg
          </button>
          <button type="button" onClick={handleCancel} className="btn btn-outline">
            Avbryt
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      {...getRootProps()}
      className="bg-surface hover:bg-surface-raised hover:border-secondary transition-colors duration-200 min-h-40 flex group items-center justify-center text-center border-3 border-dashed border-border rounded-lg cursor-pointer"
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-3 text-text-faint p-5 group-hover:text-secondary transition-colors duration-200">
        <p>Klikk eller dra et profilbilde hit</p>
        <em className="text-sm">(*.jpeg, *.png, *.webp, *.avif)</em>
      </div>
    </div>
  )
}
