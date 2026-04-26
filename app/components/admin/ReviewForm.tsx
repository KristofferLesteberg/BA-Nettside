"use client"

import { useRef, useState } from "react"
import ReviewImageInput from "@/app/components/input/ReviewImageInput"
import RegretBtn from "../shared/RegretBtn"

export interface ReviewFormValues {
  name:      string
  role:      string
  orgName:   string
  orgURL:    string
  message:   string
  imageFile: File | null
}

interface ReviewFormProps {
  heading:      string
  submitLabel:  string
  initialValues?: {
    name?:     string
    role?:     string
    orgName?:  string
    orgURL?:   string
    message?:  string
    imageUrl?: string
  }
  onSubmit: (values: ReviewFormValues) => Promise<void>
}

export default function ReviewForm({ heading, submitLabel, initialValues, onSubmit }: ReviewFormProps) {
  const [name,      setName]      = useState(initialValues?.name    ?? "")
  const [role,      setRole]      = useState(initialValues?.role    ?? "")
  const [orgName,   setOrgName]   = useState(initialValues?.orgName ?? "")
  const [orgURL,    setOrgURL]    = useState(initialValues?.orgURL  ?? "")
  const [message,   setMessage]   = useState(initialValues?.message ?? "")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading,   setLoading]   = useState(false)

  const nameRef    = useRef<HTMLDivElement>(null)
  const messageRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name.trim()) {
      nameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
    }
    if (!message.trim()) {
      messageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
    }

    setLoading(true)
    try {
      await onSubmit({ name, role, orgName, orgURL, message, imageFile })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-4/5 min-w-120 max-w-230 mx-auto my-10 mt-32">
      <form onSubmit={handleSubmit} className="card-accented space-y-6 shadow-mist-500 shadow-xl">
        <RegretBtn isAdmin={true} />
        <h2 className="heading-2">{heading}</h2>
        <p className="text-text-faint italic -mt-4">
          Feltene merket med <span className="text-red-500">*</span> må fylles ut før du kan fortsette
        </p>

        {/* Name */}
        <div className="space-y-1" ref={nameRef}>
          <label className="label">Navn <span className="text-red-500">*</span></label>
          <input
            type="text"
            className="input"
            placeholder="Fullt navn"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Role + OrgName */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="label">Rolle</label>
            <input
              type="text"
              className="input"
              placeholder="f.eks. Kommunikasjonsansvarlig"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="label">Organisasjon</label>
            <input
              type="text"
              className="input"
              placeholder="f.eks. Kvadraturen Skolesenter"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
            />
          </div>
        </div>

        {/* orgURL */}
        <div className="space-y-1">
          <label className="label">Organisasjonens nettside</label>
          <input
            type="url"
            className="input"
            placeholder="https://eksempel.no"
            value={orgURL}
            onChange={(e) => setOrgURL(e.target.value)}
          />
        </div>

        {/* Message */}
        <div className="space-y-1" ref={messageRef}>
          <label className="label">Anmeldelse <span className="text-red-500">*</span></label>
          <textarea
            className="input min-h-30"
            placeholder="Skriv anmeldelsen her"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* Profile image */}
        <div className="space-y-2">
          <label className="label">Profilbilde</label>
          <ReviewImageInput
            initialUrl={initialValues?.imageUrl}
            onChange={setImageFile}
          />
        </div>

        {/* Submit */}
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? "Lagrer..." : submitLabel}
        </button>

      </form>
    </div>
  )
}
