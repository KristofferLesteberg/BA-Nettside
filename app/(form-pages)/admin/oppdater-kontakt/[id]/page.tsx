"use client"
import ContactForm from "@/components/admin/ContactForm";

import { updateContactPerson } from "@/actions/contact";
import { getContactById } from "@/actions/contact";

import { ApiResponse } from "@/app/lib/api-response";
import { ContactPerson } from "@/generated/prisma";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import toast from "react-hot-toast";

type ContactFormData = Omit<ContactPerson, 'id' | 'products'>



export default function UpdateContact({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()

  const [contact, setContact] = useState<ContactFormData | undefined>(undefined)
  const contactId = parseInt(use(params).id)

  useEffect(() => {
      
    const getContact = async () => {
      try {
        const contact = await getContactById(contactId)
        setContact(contact)
      } catch(error) {
        toast.error("Kunne ikke laste kontaktperson")
      }
    }

    getContact()
  }, [contactId])

  const handleUpdate = async ( {name, email, phone, title }: ContactFormData) => {
    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("phone", phone)
    formData.append("title", title)

    try {
      await updateContactPerson(contactId, formData)
      toast.success("Oppdatert kontakt informasjonen")
      router.push("/admin")
    } catch(error) {
      toast.error(error instanceof Error ? error.message : "Kunne ikke oppdatere kontakt informasjonen")
    }
  }

  if(!contact) return <p>Laster...</p>
  return (
    <ContactForm heading={"Rediger kontaktinformasjonen"} exsitingContact={contact} onSubmit={handleUpdate} />
  )

}