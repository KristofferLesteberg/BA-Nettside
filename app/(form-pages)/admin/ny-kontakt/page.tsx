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

    const result = await createContactPerson(formData)
    if (!result.success) {
      toast.error(result.error)
      return
    }
    toast.success('Ny kontaktperson opprettet')
    router.push('/admin?tab=kontakt personer')
  }

  return (
    <div>
      <ContactForm onSubmit={handleSubmit} heading="Opprett en ny kontakt" />
    </div>
  )
}
