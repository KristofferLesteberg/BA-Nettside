"use client"

import { useEffect, useRef, useState } from 'react'
import ImageOrder, { ImageItem } from './ImageOrder'
import MeasurementList, { Measure } from './MeasurementList'
import BackBtn from '@/components/shared/BackBtn'
import { ContactPerson } from '@/generated/prisma'
import { usePopUp } from '../shared/PopUp'
import { deleteProduct, updateProduct } from '@/actions/products'
import toast from 'react-hot-toast'
import { Spinner } from '@/components/shared/Spinner'
import { useRouter } from 'next/navigation'
import { getAllContacts } from '@/actions/contact'
import LinjeDropdown from '../shared/LinjeDropdown'
import { RotateCcw } from 'lucide-react'
import { isProductPublishable } from '@/app/lib/product-utils'

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
  mode: "create" | "update"
  heading: string
  submitLabel: string

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
    draft?: boolean
  }
  onNewImage?: (file: File) => Promise<{ id: string }>
  onSubmit: (values: ProductFormValues) => Promise<void>
}

export default function ProductForm({ mode, heading, submitLabel, productId, initialValues, onNewImage, onSubmit }: ProductFormProps) {
  const router = useRouter()

  const [contactPersons, setContactPersons] = useState<ContactPerson[] | null>(null)
  useEffect(() => {
    getAllContacts()
      .then(setContactPersons)
      .catch(() => toast.error("Kunne ikke laste kontaktpersoner"))
  }, [])

  const [educationField, setEducationField] = useState(initialValues?.educationField ?? "")
  const [title, setTitle] = useState(initialValues?.title ?? "")
  const [description, setDescription] = useState(initialValues?.description ?? "")
  const [price, setPrice] = useState(initialValues?.price ?? "")
  const [amount, setAmount] = useState(initialValues?.amount ?? "")
  const [measures, setMeasures] = useState<Measure[]>(initialValues?.measures ?? [])
  const [images, setImages] = useState<ImageItem[]>(
    initialValues?.existingImages?.map(img => ({ id: img.id, type: "existing" as const, url: img.url })) ?? []
  )
  const [contactId, setContactId] = useState(initialValues?.contactId ?? "")

  const [resetKey, setResetKey] = useState(0)
  const [imagesChanged, setImagesChanged] = useState(false)
  const [saving, setSaving] = useState(false)
  const [menyOpen, setMenyOpen] = useState<boolean>(false)

  const educationFieldRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)

  const { open: openPopUp, close: closePopUp, element: popUpElement } = usePopUp()


  const submitForm = async () => {
    if (!educationField) {
      educationFieldRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }
    if (!title.trim()) {
      titleRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }
    if (!description.trim()) {
      descriptionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }
    await onSubmit({ educationField, title, description, price, amount, measures, images, contactId })
  }

  const handleForm = (e: React.SyntheticEvent) => {
    e.preventDefault()
  }

    const original = useRef({
    educationField: initialValues?.educationField ?? "",
    title: initialValues?.title ?? "",
    description: initialValues?.description ?? "",
    price: initialValues?.price ?? "",
    amount: initialValues?.amount ?? "",
    measures: initialValues?.measures ?? [] as Measure[],
    contactId: initialValues?.contactId ?? "",
    existingImages: initialValues?.existingImages ?? [] as { id: string; url: string }[],
  })


  useEffect(() => {
    console.log("mode" + mode)
  }, [])

  const resetAllFields = (backBtn?: boolean) => {
    setEducationField(original.current.educationField)
    setTitle(original.current.title)
    setDescription(original.current.description)
    setPrice(original.current.price)
    setAmount(original.current.amount)
    setMeasures(original.current.measures)
    setContactId(original.current.contactId)
    setImagesChanged(false)
    setResetKey(k => k + 1)
    if(backBtn) { router.back() }
  }



  const buildFormData = () => {
    const formData = new FormData
    formData.append("educationField", educationField)
    formData.append("title", title)
    formData.append("description", description)
    formData.append("price", price || "0")
    formData.append("amount", amount || "0")
    formData.append("measures", JSON.stringify(measures))
    formData.append("contactId", contactId)
    formData.append("imageIds", JSON.stringify(images.map(img => img.id)))
    return formData
  }

  const handleSaveChanges = async () => {
    try {
      await toast.promise(updateProduct(productId, buildFormData(), !initialValues?.draft), {
        loading: 'Lagrer endringer…',
        success: 'Endringer lagret',
        error: 'Kunne ikke lagre endringene',
      })
      closePopUp()
      router.back()
    } catch {}
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
    setSaving(true)
    try {
      await toast.promise(updateProduct(productId, formData, false), {
        loading: 'Lagrer utkast…',
        success: 'Utkast lagret',
        error: 'Kunne ikke lagre produktet som utkast',
      })
      closePopUp()
      router.back()
    } catch {} finally {
      setSaving(false)
    }
  }

  const handleDeleteDraft = async () => {
    try {
      await toast.promise(deleteProduct(productId), {
        loading: 'Sletter utkast…',
        success: 'Utkastet ble slettet',
        error: 'Kunne ikke slette utkast',
      })
      closePopUp()
      router.back()
    } catch {}
  }

  const isChanged =
    educationField !== original.current.educationField ||
    title !== original.current.title ||
    description !== original.current.description ||
    price !== original.current.price ||
    amount !== original.current.amount ||
    contactId !== original.current.contactId ||
    JSON.stringify(measures) !== JSON.stringify(original.current.measures) ||
    imagesChanged
  return (

 
    <div className="w-4/5 min-w-120 max-w-230 mx-auto py-10">
      {popUpElement}
      <form onSubmit={handleForm} className="card-accented space-y-6 shadow-mist-500 shadow-xl">

        <div className="flex flex-row justify-between">
          {isChanged && mode === "update" &&
            <BackBtn handleOnClick={() => openPopUp({
              title:    'Vil du lagre endringene dine?',
              subtitle: 'Du vil kunne fortsette å redigere utkastet senere, og det vil ikke være synlig for kunder før du publiserer det.',
              yesLabel: 'Lagre endringene',
              noLabel:  'Forkast endringene',
              onYes:    handleSaveChanges,
              onNo:     () => resetAllFields(true),
            })} />
          } 
          {!isChanged && mode === 'update' && <BackBtn handleOnClick={() => router.back()} />}
          
        
          {isChanged && mode === 'create' && 
          <BackBtn handleOnClick={() => openPopUp({
              title: 'Vil du lagre som utkast?',
              yesLabel: 'Ja',
              noLabel: 'Nei',
              onNo: () => { deleteProduct(productId); setTimeout(() => router.back(), 1000) },
              onYes: () => router.back()
            })} />
        }

        {!isChanged && mode === 'create' && <BackBtn handleOnClick={() => { deleteProduct(productId); setTimeout(() => router.back(), 1000) }} />}
          
          
          
          {mode === "update" && (
            <span className="badge badge-info">{initialValues?.draft ? 'Utkast' : 'Publisert'}</span>
          )}
        </div>
        <h2 className="heading-2">{heading}</h2>
        <div className='flex justify-between items-center'>
          <p className="text-text-faint italic">Feltene merket med <span className="text-red-500">*</span> må fylles ut før du kan fortsette</p>
        <button
          type="button"
          onClick={() => resetAllFields()}
          className={`btn btn-ghost transition-opacity duration-150 ${isChanged ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <RotateCcw size={14} />
          Tilbakestill
        </button>

        </div>
        
        {/* Education Field */}
        <div className="space-y-1" ref={educationFieldRef}>
          <label className="label">Kategori *</label>
          <LinjeDropdown
            value={educationField}
            onChange={setEducationField}
            placeholder="Velg kategori"
          />
        </div>

        {/* Title */}
        <div className="space-y-1" ref={titleRef}>
          <label className="label">Tittel *</label>
          <div className="relative">
            <input
              type="text"
              className="input pr-8"
              placeholder="Produkt navn"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {title !== original.current.title && (
              <button
                type="button"
                onClick={() => setTitle(original.current.title)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-text-faint hover:text-text transition-colors p-0.5 rounded cursor-pointer animate-fade-in"
              >
                <RotateCcw size={14} />
              </button>
            )}
          </div>
        </div>
        {/*Kontact person */}
        <div className='space-y-1'>
          <label className='label'>Kontakt person</label>
          <div className="flex items-center gap-2">
            <select className='input' value={contactId} onChange={(e) => setContactId(e.target.value)}>
              <option value="">Velg kontakt person</option>
              {contactPersons?.map((contactPerson, index) => (
                <option key={index} value={String(contactPerson.id)}>{contactPerson.name}</option>
              ))}
            </select>
            {contactId !== original.current.contactId && (
              <button
                type="button"
                onClick={() => { setContactId(original.current.contactId); }}
                className="text-text-faint hover:text-text transition-colors p-0.5 rounded cursor-pointer animate-fade-in shrink-0"
              >
                <RotateCcw size={14} />
              </button>
            )}
          </div>
          {(() => {
            const selected = contactPersons?.find(cp => String(cp.id) === contactId)
            return (
              <div className={`grid transition-all duration-300 ease-in-out ${selected ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                  {selected && (
                    <div className="mt-2 p-3 bg-surface rounded-lg border border-border text-sm space-y-1">
                      <p className="font-medium text-text">{selected.name}</p>
                      <p className="text-text-muted">Rolle: {selected.title}</p>
                      <p className="text-text-muted">Mail: {selected.email}</p>
                      <p className="text-text-muted">Tlf: {selected.phone}</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })()}
        </div>
        {/* Description */}
        <div className="space-y-1" ref={descriptionRef}>
          <label className="label">Beskrivelse *</label>
          <div className="relative">
            <textarea
              className="input min-h-25 pr-8"
              placeholder="Beskriv produkt"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {description !== original.current.description && (
              <button
                type="button"
                onClick={() => setDescription(original.current.description)}
                className="absolute right-2 top-2 text-text-faint hover:text-text transition-colors p-0.5 rounded cursor-pointer animate-fade-in"
              >
                <RotateCcw size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Price + Amount */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="label">Pris</label>
            <div className="relative">
              <input
                type="text"
                inputMode="decimal"
                className="input pr-8"
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
              {price !== original.current.price && (
                <button
                  type="button"
                  onClick={() => setPrice(original.current.price)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-text-faint hover:text-text transition-colors p-0.5 rounded cursor-pointer animate-fade-in"
                >
                  <RotateCcw size={14} />
                </button>
              )}
            </div>
          </div>
          <div className="space-y-1">
            <label className="label">Antall</label>
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                className="input pr-8"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
              />
              {amount !== original.current.amount && (
                <button
                  type="button"
                  onClick={() => setAmount(original.current.amount)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-text-faint hover:text-text transition-colors p-0.5 rounded cursor-pointer animate-fade-in"
                >
                  <RotateCcw size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Measures */}
        <MeasurementList resetKey={resetKey} initialMeasures={initialValues?.measures} onChange={setMeasures} />

        {/* Images */}
        <label className="label">Bilder</label>
        <ImageOrder resetKey={resetKey} initialImages={initialValues?.existingImages} onChange={(imgs) => { setImages(imgs); setImagesChanged(true) }} onNewImage={onNewImage} />

        {/* Submit */}
        <div className='flex flex-row gap-2'>

          {mode === "update" ? (
            <button
              type="button"
              className="btn btn-secondary w-1/2"
              onClick={() => openPopUp({
                title: 'Ønsker du å lagre endringene?',
                yesLabel: 'Lagre som utkast med endringer',
                noLabel: 'Lagre som utkast uten endringer',
                onYes: handleSaveDraft,
                onNo: () => resetAllFields(true),
              })}
            >
              Lagre som utkast
            </button>
          ) : <button className='btn btn-secondary w-1/2 gap-2' disabled={saving} onClick={handleSaveDraft}>{saving ? <><Spinner />Lagrer…</> : 'Lagre som utkast'}</button>}
          
          
          <button
            type="button"
            disabled={mode === "update" && !isChanged || !isProductPublishable({ educationField, title, description })}
            className={`btn w-1/2 ${mode === "update" && !isChanged ? 'btn-ghost' : 'btn-primary'}`}
            onClick={() => openPopUp({
              title: mode === "create" ? 'Ønsker du å publisere produktet?' : 'Ønsker du å oppdatere produktet med endringene?',
              yesLabel: mode === "create" ? 'Ja, publiser' : 'Ja, oppdater',
              noLabel: 'Avbryt',
              onYes: submitForm,
            })}
          >
            {submitLabel}
          </button>
          
        </div>
      </form>
    </div>
  )
}
