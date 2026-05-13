"use client"

import { useEffect, useRef, useState } from 'react'
import ImageOrder, { ImageItem } from './ImageOrder'
import MeasurementList, { Measure } from './MeasurementList'
import BackBtn from '@/components/shared/BackBtn'
import { ContactPerson } from '@/generated/prisma'
import { usePopUp } from '../shared/PopUp'
import { deleteProduct, updateProduct } from '@/actions/products'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export interface ProductFormValues {
  educationField: string
  title: string
  description: string
  price: string
  amount: string
  measures: Measure[]
  images: ImageItem[]
  contactId: string
}

interface ProductFormProps {
  heading: string
  submitLabel: string
  contactPersons?: ContactPerson[]
  productId: number
  initialValues?: {
    educationField?: string
    title?: string
    description?: string
    price?: string
    amount?: string
    measures?: Measure[]
    existingImages?: { id: string; url: string }[]
    contactId?: string
  }
  onNewImage?: (file: File) => Promise<{ id: string }>
  onSubmit: (values: ProductFormValues) => Promise<void>
}

export default function ProductForm({ heading, submitLabel, contactPersons, productId, initialValues, onNewImage, onSubmit }: ProductFormProps) {
  const router = useRouter()

  const [educationField, setEducationField] = useState(initialValues?.educationField ?? "")
  const [title, setTitle] = useState(initialValues?.title ?? "")
  const [description, setDescription] = useState(initialValues?.description ?? "")
  const [price, setPrice] = useState(initialValues?.price ?? "")
  const [amount, setAmount] = useState(initialValues?.amount ?? "")
  const [measures, setMeasures] = useState<Measure[]>(initialValues?.measures ?? [])
  const [images, setImages] = useState<ImageItem[]>([])
  const [contactId, setContactId] = useState(initialValues?.contactId ?? "")

  const educationFieldRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
 
  const { open: openPopUp, close: closePopUp, element: popUpElement } = usePopUp()
 

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

    await onSubmit({ educationField, title, description, price, amount, measures, images, contactId })
  }

  const handleSaveDraft = async () => {
    const formData = new FormData
    formData.append("educationField", educationField)
    formData.append("title", title)
    formData.append("description", description)
    formData.append("price", price || "0")
    formData.append("amount", amount || "0")
    formData.append("measures", JSON.stringify(measures))
    formData.append("contactId", contactId)
    formData.append("imageIds", JSON.stringify(images.map(img => img.id)))
    try {
      console.log("test")
      await updateProduct(productId, formData, false)
      console.log("produkt Id" + productId)
      toast("Utkast lagret")
      closePopUp()
      router.back()
    } catch(error) {
      toast.error("Kunne ikke lagre produktet som utkast")
    }
  }
  const handleDeleteDraft = async () => {
    try {
      await deleteProduct(productId)
      closePopUp()
      toast("Utkastet ble slettet")
      router.back()
    } catch(error) {
      toast.error("Kunne ikke slette utkast")
    }
  }

  return (

    
    <div className="w-4/5 min-w-120 max-w-230 mx-auto py-10">
      {popUpElement}
      <form onSubmit={handleForm} className="card-accented space-y-6 shadow-mist-500 shadow-xl">

        <div className="flex items-start">
          <BackBtn handleOnClick={() => openPopUp({
            title:    'Lagre endringen som et utkast?',
            subtitle: 'Du vil kunne fortsette å redigere utkastet senere, og det vil ikke være synlig for kunder før du publiserer det.',
            yesLabel: 'Ja, lagre som utkast',
            noLabel:  'Nei, slett endringene',
            onYes:    handleSaveDraft,
            onNo:     handleDeleteDraft,
          })}/>
        </div>
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
        <div className='space-y-1'>
          <label className='label'>Kontakt person</label>
          <select className='input' value={contactId} onChange={(e) => setContactId(e.target.value)}>
            <option value="">Velg kontakt person</option>
            {contactPersons?.map((contactPerson, index) => (
              <option key={index} value={contactPerson.id}>{contactPerson.name}</option>
            ))}
          </select>
        </div>
        {/* Description */}
        <div className="space-y-1" ref={descriptionRef}>
          <label className="label">Beskrivelse *</label>
          <textarea
            className="input min-h-25"
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
        <ImageOrder initialImages={initialValues?.existingImages} onChange={setImages} onNewImage={onNewImage} />

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full">
          {submitLabel}
        </button>

      </form>
    </div>
  )
}
