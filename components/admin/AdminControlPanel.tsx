"use client"

import { signOut } from "next-auth/react"
import { usePopUp } from "../shared/PopUp"
import { FaSignOutAlt } from "react-icons/fa";

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
        className="btn btn-error py-1.5"
      >
        <FaSignOutAlt className="mr-1"/>
        Logg ut
      </button>
    </div>
  )
}
