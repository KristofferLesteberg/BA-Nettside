"use client"

import ContactForm from "@/app/components/admin/ContactForm"
import { ContactPerson } from "@/generated/prisma"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

type ContactFormData = Omit<ContactPerson, 'id' | 'products'>


export default function NewContact() {
  const router = useRouter()

  const handleSubmit = async (data: ContactFormData) => {
    const res = await fetch("/api/contactPerson", {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(data)
    })

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