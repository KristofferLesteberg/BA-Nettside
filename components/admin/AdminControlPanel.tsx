'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { usePopUp } from '../shared/PopUp'
import { IconSignOut, IconSettings } from '@/app/lib/icons'
import ControlPanelModal from './ControlPanel/ControlPanelModal'

export default function AdminControlPanel() {
  const { open: openPopUp, element: popUpElement } = usePopUp()
  const [panelOpen, setPanelOpen] = useState(false)

  return (
    <div className="flex items-center gap-2">
      {popUpElement}
      <ControlPanelModal open={panelOpen} onClose={() => setPanelOpen(false)} />

      <button
        onClick={() => setPanelOpen(true)}
        className="btn btn-ghost gap-2"
        aria-label="Åpne kontrollpanel"
      >
        <IconSettings aria-hidden="true" />
        <span className="hidden sm:inline">Kontrollpanel</span>
      </button>

      <button
        onClick={() =>
          openPopUp({
            title: 'Logg ut?',
            subtitle: 'Er du sikker på at du vil logge ut?',
            yesLabel: 'Ja, logg ut',
            noLabel: 'Nei, bli værende',
            onYes: () => signOut({ callbackUrl: '/' }),
          })
        }
        className="btn btn-ghost text-error hover:bg-error-bg whitespace-nowrap gap-2"
      >
        <IconSignOut aria-hidden="true" />
        <span className="hidden sm:inline">Logg ut</span>
      </button>
    </div>
  )
}
