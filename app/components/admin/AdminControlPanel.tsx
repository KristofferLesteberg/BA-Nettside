"use client"

import { signOut } from "next-auth/react"

export default function AdminControlPanel() {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => signOut({ callbackUrl: "/admin/login" })}
        className="btn btn-error text-xs py-1.5"
      >
        Logg ut
      </button>
    </div>
  )
}
