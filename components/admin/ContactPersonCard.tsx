"use client"

import { ContactPerson } from "@/generated/prisma"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { deleteContactPerson } from "@/actions/contact"
import { usePopUp } from "../shared/PopUp"

interface Props {
  person: ContactPerson
}

export default function ContactPersonCard({ person }: Props) {
  const router = useRouter()
  const { open: openPopUp, element: popUpElement } = usePopUp()

  const deletePerson = async () => {
    try {
      await toast.promise(deleteContactPerson(person.id), {
        loading: 'Sletter kontaktperson…',
        success: 'Kontaktperson slettet',
        error: (e: unknown) => e instanceof Error ? e.message : 'Kunne ikke fjerne kontaktperson',
      })
      router.refresh()
    } catch {}
  }

  return (
    <div className="card card-subtle flex flex-col gap-4">
      {popUpElement}
      <div className="flex flex-row justify-between">
        <h1 className="heading-1">{person.name}</h1>

        <div className="flex items-center gap-2 shrink-0">
          <Link href={`/admin/oppdater-kontakt/${person.id}`} className="btn btn-outline">
            Redigere
          </Link>
          <button className="btn btn-error" onClick={() => openPopUp({
            title: "Slett kontaktpersonen?",
            subtitle: "Er du sikker på at du vil slette denne kontaktpersonen? Denne handlingen kan ikke angres.",
            yesLabel: "Ja, slett",
            noLabel: "Nei, behold",
            onYes: deletePerson
          })}>
            Fjern
          </button>
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
