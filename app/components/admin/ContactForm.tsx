import { ContactPerson } from "@/generated/prisma"
import { useState } from "react"

type ContactFormData = Omit<ContactPerson, 'id' | 'products'>

interface Props {
  exsitingContact? : ContactFormData,
  onSubmit: (data: ContactFormData) => Promise<void>
}

export default function ContactForm({ exsitingContact, onSubmit}: Props) {
  const [name, setName] = useState(exsitingContact?.name || "")
  const [email, setEmail] = useState(exsitingContact?.name || "")
  const [phone, setPhone] = useState(exsitingContact?.phone || "")
  const [title, setTitle] = useState(exsitingContact?.title || "")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await onSubmit( {name, email, phone, title })

  }

  return (
    <div className="w-4/5 min-w-120 max-w-230 mx-auto my-10 mt-32">
          <form onSubmit={handleSubmit} className="card-accented space-y-6 shadow-mist-500 shadow-xl">
    
         
            {/* Education Field */}
            <div className="space-y-1">
             
            </div>
    
            {/* Title */}
            <div className="space-y-1">
              
            </div>
    
            {/* Description */}
            <div className="space-y-1">
             
            </div>
    
            {/* Price + Amount */}
            <div className="grid grid-cols-2 gap-4">
            
            </div>
            <div className="space-y-1">
                
            </div>
          </form>
        </div>
  )
}