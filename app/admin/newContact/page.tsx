"use client"

import ContactForm from "@/app/components/admin/ContactForm"
import { ContactPerson } from "@/generated/prisma"

type ContactFormData = Omit<ContactPerson, 'id' | 'products'>

export default function NewContact() {

  const handleSubmit = async (data: ContactFormData) => {

  }

  return (
    <div>
      <h1>test</h1>
      <ContactForm onSubmit={handleSubmit}/>
    </div>

  )
}