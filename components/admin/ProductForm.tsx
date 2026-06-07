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
import ContactDropdown from '../shared/ContactDropdown'
import { IconRevert, IconWarning, IconSuccess } from '@/app/lib/icons'
import { isProductPublishable } from '@/app/lib/product-utils'
import { MeasureItemSchema } from '@/app/lib/schemas'
import PriceInput from '@/components/shared/input/price-input'

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

  productId: number | null
  ensureDraft?: () => Promise<number>
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

export default function ProductForm({ mode, heading, submitLabel, productId, ensureDraft, initialValues, onNewImage, onSubmit }: ProductFormProps) {
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

  const educationFieldRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)

  const { open: openPopUp, close: closePopUp, element: popUpElement } = usePopUp()

  const validateMeasures = (): boolean => {
    const errors: string[] = []
    measures.forEach((m, i) => {
      const result = MeasureItemSchema.safeParse(m)
      if (!result.success) {
        const label = m.name.trim() ? `«${m.name.trim()}»` : `Mål #${i + 1}`
        const fields = new Set(result.error.issues.map(issue => issue.path[0]))
        const missing: string[] = []
        if (fields.has('name'))  missing.push('navn')
        if (fields.has('value')) missing.push('verdi')
        if (fields.has('unit'))  missing.push('enhet')
        const joined = missing.length <= 1
          ? missing[0]
          : missing.slice(0, -1).join(', ') + ' og ' + missing[missing.length - 1]
        errors.push(`${label}: mangler ${joined}`)
      }
    })
    if (errors.length > 0) {
      errors.forEach(msg => toast.error(msg))
      return false
    }
    return true
  }

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
    if (!validateMeasures()) return
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
    if (backBtn) { router.back() }
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
      await toast.promise(updateProduct(productId!, buildFormData(), !initialValues?.draft), {
        loading: 'Lagrer endringer…',
        success: 'Endringer lagret',
        error: 'Kunne ikke lagre endringene',
      })
      closePopUp()
      router.back()
    } catch {}
  }

  const handleSaveDraft = async () => {
    if (!validateMeasures()) return
    const formData = buildFormData()
    setSaving(true)
    try {
      const id = ensureDraft ? await ensureDraft() : productId!
      await toast.promise(updateProduct(id, formData, false), {
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

  const isChanged =
    educationField !== original.current.educationField ||
    title !== original.current.title ||
    description !== original.current.description ||
    price !== original.current.price ||
    amount !== original.current.amount ||
    contactId !== original.current.contactId ||
    JSON.stringify(measures) !== JSON.stringify(original.current.measures) ||
    imagesChanged

  const isDraft = initialValues?.draft ?? true

  return (
    <div className="form-page-wrapper">
      {popUpElement}
      <form onSubmit={handleForm} className="card-accented shadow-xl overflow-hidden">

        {/* Draft / Published banner */}
        {mode === "update" && (
          <div className={`-mx-6 -mt-6 px-6 py-3 flex items-center gap-2 border-b ${
            isDraft
              ? 'bg-warning-bg border-warning/20 text-warning'
              : 'bg-success-bg border-success/20 text-success'
          }`}>
            {isDraft
              ? <IconWarning size={15} className="shrink-0" />
              : <IconSuccess size={15} className="shrink-0" />
            }
            <span className="small-text font-medium">
              {isDraft ? 'Utkast — ikke synlig for kunder' : 'Publisert — synlig for kunder'}
            </span>
          </div>
        )}

        <div className="space-y-6 mt-6">
          <div className="flex flex-row justify-between items-center">
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

            {mode === 'create' && (
              <BackBtn handleOnClick={() => {
                if (!isChanged) { router.back(); return }
                openPopUp({
                  title:   'Vil du lagre som utkast?',
                  yesLabel: 'Ja',
                  noLabel:  'Nei',
                  onNo:  () => {
                    if (productId !== null) deleteProduct(productId)
                    setTimeout(() => router.back(), productId !== null ? 1000 : 0)
                  },
                  onYes: () => router.back(),
                })
              }} />
            )}
          </div>

          <h2 className="heading-2">{heading}</h2>

          <div className="flex justify-between items-center">
            <p className="text-text-faint italic text-sm">
              Feltene merket med <span className="text-error italic font-medium">*</span> må fylles ut før du kan fortsette
            </p>
            <button
              type="button"
              onClick={() => resetAllFields()}
              className={`btn btn-ghost transition-opacity duration-150 ${isChanged ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
              <IconRevert size={14} />
              Tilbakestill
            </button>
          </div>

          {/* Education Field */}
          <div className="space-y-1" ref={educationFieldRef}>
            <label className="label">
              Linje <span className="text-error italic">*</span>
            </label>
            <LinjeDropdown
              value={educationField}
              onChange={setEducationField}
              placeholder="Velg linje"
            />
          </div>

          {/* Title */}
          <div className="space-y-1" ref={titleRef}>
            <label className="label">
              Tittel <span className="text-error italic">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                className="input pr-8"
                placeholder="Produkt navn"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setTitle(original.current.title)}
                className={`absolute right-2 top-1/2 -translate-y-1/2 text-text-faint hover:text-text transition-opacity duration-150 p-0.5 rounded cursor-pointer ${title !== original.current.title ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              >
                <IconRevert size={14} />
              </button>
            </div>
          </div>

          {/* Contact person */}
          <div className="space-y-1">
            <label className="label">Kontakt person</label>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <ContactDropdown
                  contacts={contactPersons ?? []}
                  value={contactId}
                  onChange={setContactId}
                />
              </div>
              <button
                type="button"
                onClick={() => setContactId(original.current.contactId)}
                className={`overflow-hidden transition-all duration-150 text-text-faint hover:text-text rounded flex items-center justify-center shrink-0 ${contactId !== original.current.contactId ? 'w-6 h-6 opacity-100 cursor-pointer' : 'w-0 opacity-0 pointer-events-none'}`}
              >
                <IconRevert size={14} className="shrink-0" />
              </button>
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
            <label className="label">
              Beskrivelse <span className="text-error italic">*</span>
            </label>
            <div className="relative">
              <textarea
                className="input min-h-25 pr-8"
                placeholder="Beskriv produkt"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setDescription(original.current.description)}
                className={`absolute right-2 top-2 text-text-faint hover:text-text transition-opacity duration-150 p-0.5 rounded cursor-pointer ${description !== original.current.description ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              >
                <IconRevert size={14} />
              </button>
            </div>
          </div>

          {/* Price + Amount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="label">Pris</label>
              <PriceInput
                value={price}
                onChange={setPrice}
                onRevert={price !== original.current.price ? () => setPrice(original.current.price) : undefined}
              />
            </div>
            <div className="space-y-1">
              <label className="label">Antall</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  className="input flex-1 min-w-0"
                  placeholder="0"
                  value={amount}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, "")
                    setAmount(digits.replace(/^0+(\d)/, "$1"))
                  }}
                />
                <button
                  type="button"
                  onClick={() => setAmount(original.current.amount)}
                  className={`overflow-hidden transition-all duration-150 text-text-faint hover:text-text rounded flex items-center justify-center shrink-0 ${amount !== original.current.amount ? 'w-6 h-6 opacity-100 cursor-pointer' : 'w-0 opacity-0 pointer-events-none'}`}
                >
                  <IconRevert size={14} className="shrink-0" />
                </button>
              </div>
            </div>
          </div>

          {/* Measures */}
          <MeasurementList key={resetKey} initialMeasures={initialValues?.measures} onChange={setMeasures} />

          {/* Images */}
          <label className="label">Bilder</label>
          <ImageOrder resetKey={resetKey} initialImages={initialValues?.existingImages} onChange={(imgs) => { setImages(imgs); setImagesChanged(true) }} onNewImage={onNewImage} />

          {/* Submit */}
          <div className="flex flex-row gap-2">
            {mode === "update" ? (
              <button
                type="button"
                className="btn btn-secondary w-1/2"
                onClick={() => openPopUp({
                  title:   'Ønsker du å lagre endringene?',
                  yesLabel: 'Lagre som utkast med endringer',
                  noLabel:  'Lagre som utkast uten endringer',
                  onYes:   handleSaveDraft,
                  onNo:    () => resetAllFields(true),
                })}
              >
                Lagre som utkast
              </button>
            ) : (
              <button
                className="btn btn-secondary w-1/2 gap-2"
                disabled={saving}
                onClick={handleSaveDraft}
              >
                {saving ? <><Spinner />Lagrer…</> : 'Lagre som utkast'}
              </button>
            )}

            <button
              type="button"
              disabled={mode === "update" && !isChanged || !isProductPublishable({ educationField, title, description })}
              className={`btn w-1/2 ${mode === "update" && !isChanged ? 'btn-ghost' : 'btn-primary'}`}
              onClick={() => openPopUp({
                title:   mode === "create" ? 'Ønsker du å publisere produktet?' : 'Ønsker du å oppdatere produktet med endringene?',
                yesLabel: mode === "create" ? 'Ja, publiser' : 'Ja, oppdater',
                noLabel:  'Avbryt',
                onYes:   submitForm,
              })}
            >
              {submitLabel}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
