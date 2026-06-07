"use client"

import { signOut } from "next-auth/react"
import { usePopUp } from "../shared/PopUp"
import { IconSignOut } from "@/app/lib/icons";

export default function AdminControlPanel() {
  const { open: openPopUp, element: popUpElement } = usePopUp()

  return (
    <div className="flex items-center gap-2">
      {popUpElement}
      <button
        onClick={() => openPopUp({
          title: "Logg ut?",
          subtitle: "Er du sikker på at du vil logge ut?",
          yesLabel: "Ja, logg ut",
          noLabel: "Nei, bli værende",
          onYes: () => signOut({ callbackUrl: '/' })
        })}
        className="btn btn-ghost text-error hover:bg-error-bg whitespace-nowrap gap-2"
      >
        <IconSignOut />
        <span className="hidden sm:inline">Logg ut</span>
      </button>
    </div>
  )
}
