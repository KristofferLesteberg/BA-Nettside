"use client"

import ContactForm from "@/app/components/admin/ContactForm"
import { ContactPerson } from "@/generated/prisma"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import type { ApiResponse } from '@/app/lib/api-response'

type ContactFormData = Omit<ContactPerson, 'id' | 'products'>


export default function NewContact() {
  const router = useRouter()

  const handleSubmit = async (data: ContactFormData) => {
    const res = await fetch("/api/contactPerson", {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(data)
    })
    const body: ApiResponse<unknown> = await res.json()
    if (!body.success) {
      if (body.fields) {
        Object.values(body.fields).flat().forEach(msg => toast.error(msg))
      } else {
        toast.error(body.error)
      }
      return
    }

      if(!res.ok) {
        console.log(res.ok)
        toast.error("Kunne ikke opprette kontaktpersonen")
        return
      }
      toast.success("Ny kontaktperson opprettet")
      router.push("/admin")  
    }

  return (
    <div>
      <ContactForm onSubmit={handleSubmit} heading="Opprett en ny kontakt"/>
    </div>

  )
}