"use client"

import { ContactPerson } from "@/generated/prisma"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { deleteContactPerson } from "@/actions/contact"
import { usePopUp } from "../shared/PopUp"
import { IconEdit, IconDelete, IconEmail, IconPhone, IconRole } from "@/app/lib/icons"

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
    <div className="card card-subtle py-4 px-5 flex items-center" role="article">
      {popUpElement}

      <div className="flex-1 min-w-0">
        <p className="heading-4 truncate">{person.name}</p>
      </div>

      <div className="hidden sm:flex items-center shrink-0">
        <div className="w-px self-stretch bg-border" />

        <div className="flex items-center px-4">
          <div className="flex flex-col gap-0.5 w-52">
            <span className="label flex items-center gap-1">
              <IconEmail className="text-text-faint w-3 h-3 shrink-0" aria-hidden="true" />
              E-post
            </span>
            <span className="small-text text-muted truncate">{person.email}</span>
          </div>

          <div className="w-px self-stretch bg-border mx-3" />

          <div className="flex flex-col gap-0.5 w-36">
            <span className="label flex items-center gap-1">
              <IconPhone className="text-text-faint w-3 h-3 shrink-0" aria-hidden="true" />
              Telefon
            </span>
            <span className="small-text text-muted truncate">{person.phone}</span>
          </div>

          <div className="w-px self-stretch bg-border mx-3" />

          <div className="flex flex-col gap-0.5 w-32">
            <span className="label flex items-center gap-1">
              <IconRole className="text-text-faint w-3 h-3 shrink-0" aria-hidden="true" />
              Tittel
            </span>
            <span className="small-text text-muted truncate">{person.title}</span>
          </div>
        </div>

        <div className="w-px self-stretch bg-border mx-5" />
      </div>

      <div className="flex items-center gap-0.5 shrink-0">
        <Link href={`/admin/oppdater-kontakt/${person.id}`} className="btn btn-ghost p-2" aria-label="Rediger kontaktperson">
          <IconEdit className="w-5 h-5" aria-hidden="true" />
        </Link>
        <button
          className="btn btn-ghost p-2 text-error hover:bg-error-bg"
          aria-label="Slett kontaktperson"
          onClick={() => openPopUp({
            title: "Slett kontaktpersonen?",
            subtitle: "Er du sikker på at du vil slette denne kontaktpersonen? Denne handlingen kan ikke angres.",
            yesLabel: "Ja, slett",
            noLabel: "Nei, behold",
            onYes: deletePerson
          })}
        >
          <IconDelete className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
