"use client"

import { ContactPerson } from "@/generated/prisma"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { deleteContactPerson } from "@/actions/contact"

interface Props {
  person: ContactPerson
}

export default function ContactPersonCard({ person }: Props) {
  const router = useRouter()
  

  const deletePerson = async () => {
    if (!window.confirm('Vil du slette kontaktpersonen?')) return

    try {
      await deleteContactPerson(person.id)
      toast.success('Kontaktperson slettet')
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Kunne ikke fjerne kontaktperson')
    }
  }

  return (
    <div className="card card-subtle flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <h1 className="heading-1">{person.name}</h1>

        <div className="flex items-center gap-2 shrink-0">
          <Link href={`/admin/oppdater-kontakt/${person.id}`} className="btn btn-outline">
            Redigere
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
