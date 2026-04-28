"use client"
import ContactForm from "@/app/components/admin/ContactForm";
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
        const res = await fetch(`/api/contactPerson/${contactId}`)
        const body: ApiResponse<ContactFormData> = await res.json()
      
        if (!body.success) {
          if (body.fields) {
          Object.values(body.fields).flat().forEach(msg => toast.error(msg))
        } else {
          toast.error(body.error)
        }
        return
    }
    setContact(body.data)
     console.log(body.data)
      } catch(error) {
        console.log(error)
        toast.error("Kunne ikke laste ned kontakt informasjonen")
      }
    }

    getContact()
  }, [contactId])

  const handleUpdate = async (data: ContactFormData) => {
    try {
      const res = await fetch(`/api/contactPerson/${contactId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
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

    toast.success("Oppdaterte informasjonen")
    router.push("/admin")
    } catch(error) {
      console.log(error)
      toast.error("Kunne ikke oppdatere informasjonen")


  }
}

  if(!contact) return <p>Laster...</p>
  return (
    <ContactForm heading={"Rediger kontaktinformasjonen"} exsitingContact={contact} onSubmit={handleUpdate} />
  )

}