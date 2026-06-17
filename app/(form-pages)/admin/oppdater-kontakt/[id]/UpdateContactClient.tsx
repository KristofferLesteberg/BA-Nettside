"use client"

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import ContactForm from '@/components/admin/ContactForm'
import { updateContactPerson } from '@/actions/contact'

interface ContactFormData {
  name: string
  email: string
  phone: string
  title: string
}

export interface UpdateContactClientProps {
  contactId: number
  name: string
  email: string
  phone: string
  title: string
}

export default function UpdateContactClient({ contactId, name, email, phone, title }: UpdateContactClientProps) {
  const router = useRouter()

  const handleUpdate = async (data: ContactFormData) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('phone', data.phone)
    formData.append('title', data.title)

    const result = await updateContactPerson(contactId, formData)
    if (!result.success) {
      toast.error(result.error)
      return
    }
    toast.success('Oppdatert kontakt informasjonen')
    router.push('/admin?tab=kontakt personer')
  }

  return (
    <ContactForm
      heading="Rediger kontaktinformasjonen"
      exsitingContact={{ name, email, phone, title }}
      onSubmit={handleUpdate}
    />
  )
}
