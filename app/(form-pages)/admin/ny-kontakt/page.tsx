"use client"

import ContactForm from "@/components/admin/ContactForm"
import { createContactPerson } from "@/actions/contact"
import { ContactPerson } from "@/generated/prisma"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

type ContactFormData = Omit<ContactPerson, 'id' | 'products' | 'isSeeded'>

export default function NewContact() {
  const router = useRouter()

  const handleSubmit = async ({ name, email, phone, title }: ContactFormData) => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('phone', phone)
    formData.append('title', title)

    try {
      await toast.promise(createContactPerson(formData), {
        loading: 'Oppretter kontaktperson…',
        success: 'Ny kontaktperson opprettet',
        error: (e: unknown) => e instanceof Error ? e.message : 'Kunne ikke opprette kontaktpersonen',
      })
      router.push('/admin?tab=kontakt personer')
    } catch {}
  }

  return (
    <div>
      <ContactForm onSubmit={handleSubmit} heading="Opprett en ny kontakt" />
    </div>
  )
}
