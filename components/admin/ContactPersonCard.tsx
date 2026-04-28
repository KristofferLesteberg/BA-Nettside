"use client"
import { ApiResponse } from "@/app/lib/api-response";
import { ContactPerson } from "@/generated/prisma";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
  person: ContactPerson
}

export default function ContactPersonCard( { person } : Props) {
  const router = useRouter()

  const deletePerson = async () => {
    if (!window.confirm('Vil du slette anmeldelsen?')) return
    try {
      const res = await fetch(`/api/contactPerson/${person.id}`,  {
        method: 'DELETE'
      })
      const body: ApiResponse<unknown> = await res.json()

    if (!body.success) {
      toast.error(body.error)
      return
    }

    toast.success(body.message ?? 'Anmeldelse slettet')
    router.refresh()
  } catch(error) {
      console.log(error)
      toast.error("Kunne ikke fjerne kontakt person")
    }

  }

  return (
    <div className="card card-subtle flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <h1 className="heading-1">{person.name}</h1>
  
        <div className="flex items-center gap-2 shrink-0">
          <Link href={`/admin/oppdater-kontakt/${person.id}`} className="btn btn-outline">
           <p>Redigere</p>
          </Link>
          <button className="btn btn-error" onClick={deletePerson}>Fjern</button>
        </div>
      </div>

      <div className="grid grid-cols-3">
        <div>
          <label className="label">Mail:</label>
          <p>{person.email}</p>
        </div>
        <div>
          <label className="label">Telefon:</label>
          <p>{person.phone}</p>
        </div>
        <div>
          <label className="label">Tittel:</label>
          <p>{person.title}</p>
        </div>
        
      </div>

    </div>
  )

}