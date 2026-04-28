"use client"

import ContactForm from "@/components/admin/ContactForm"
import { createContactPerson } from "@/actions/contact"
import { ContactPerson } from "@/generated/prisma"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

type ContactFormData = Omit<ContactPerson, 'id' | 'products'>

export default function NewContact() {
  const router = useRouter()

  const handleSubmit = async ({ name, email, phone, title }: ContactFormData) => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('phone', phone)
    formData.append('title', title)

    try {
      await createContactPerson(formData)
      toast.success('Ny kontaktperson opprettet')
      router.push('/admin')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Kunne ikke opprette kontaktpersonen')
    }
  }

  return (
    <div>
      <ContactForm onSubmit={handleSubmit} heading="Opprett en ny kontakt" />
    </div>
  )
}
