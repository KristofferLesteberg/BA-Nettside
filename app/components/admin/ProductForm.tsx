"use client"

import { useRef, useState } from 'react'
import ImageOrder, { ImageItem } from '@/app/components/admin/ImageOrder'
import MeasurementList, { Measure } from '@/app/components/admin/MeasurementList'

export interface ProductFormValues {
  educationField: string
  title: string
  description: string
  price: string
  amount: string
  measures: Measure[]
  images: ImageItem[]
}

interface ProductFormProps {
  heading: string
  submitLabel: string
  initialValues?: {
    educationField?: string
    title?: string
    description?: string
    price?: string
    amount?: string
    measures?: Measure[]
    existingImages?: { id: string; url: string }[]
  }
  onSubmit: (values: ProductFormValues) => Promise<void>
}

export default function ProductForm({ heading, submitLabel, initialValues, onSubmit }: ProductFormProps) {
  const [educationField, setEducationField] = useState(initialValues?.educationField ?? "")
  const [title, setTitle] = useState(initialValues?.title ?? "")
  const [description, setDescription] = useState(initialValues?.description ?? "")
  const [price, setPrice] = useState(initialValues?.price ?? "")
  const [amount, setAmount] = useState(initialValues?.amount ?? "")
  const [measures, setMeasures] = useState<Measure[]>(initialValues?.measures ?? [])
  const [images, setImages] = useState<ImageItem[]>([])

  const educationFieldRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!educationField) {
      educationFieldRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
    }
    if (!title.trim()) {
      titleRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
    }
    if (!description.trim()) {
      descriptionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
    }

    await onSubmit({ educationField, title, description, price, amount, measures, images })
  }

  return (
    <div className="w-4/5 min-w-120 max-w-230 mx-auto my-10 mt-32">
      <form onSubmit={handleForm} className="card-accented space-y-6 shadow-mist-500 shadow-xl">

        <h2 className="heading-2">{heading}</h2>
        <p className="text-text-faint italic -mt-4">Feltene merket med <span className="text-red-500">*</span> må fylles ut før du kan fortsette</p>

        {/* Education Field */}
        <div className="space-y-1" ref={educationFieldRef}>
          <label className="label">Kategori *</label>
          <select className="input" value={educationField} onChange={(e) => setEducationField(e.target.value)}>
            <option value="">Velg kategori</option>
            <option value="BUILDING">Bygg</option>
            <option value="CONSTRUCTION">Anlegg</option>
          </select>
        </div>

        {/* Title */}
        <div className="space-y-1" ref={titleRef}>
          <label className="label">Tittel *</label>
          <input
            type="text"
            className="input"
            placeholder="Produkt navn"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="space-y-1" ref={descriptionRef}>
          <label className="label">Beskrivelse *</label>
          <textarea
            className="input min-h-[100px]"
            placeholder="Beskriv produkt"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Price + Amount */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="label">Pris</label>
            <input
              type="text"
              inputMode="decimal"
              className="input"
              placeholder="0.00"
              value={price}
              onChange={(e) => {
                const sanitized = e.target.value.replace(/[^0-9.]/g, "").replace(/^(\d*\.?\d{0,2}).*/, "$1")
                setPrice(sanitized)
              }}
              onBlur={() => {
                const val = parseFloat(price)
                if (!isNaN(val)) setPrice(val.toFixed(2))
              }}
            />
          </div>
          <div className="space-y-1">
            <label className="label">Antall</label>
            <input
              type="text"
              inputMode="numeric"
              className="input"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
            />
          </div>
        </div>

        {/* Measures */}
        <MeasurementList initialMeasures={initialValues?.measures} onChange={setMeasures} />

        {/* Images */}
        <label className="label">Bilder</label>
        <ImageOrder initialImages={initialValues?.existingImages} onChange={setImages} />

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full">
          {submitLabel}
        </button>

      </form>
    </div>
  )
}
