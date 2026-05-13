import { useState } from 'react'

interface PopUpConfig {
  title:    string
  yesLabel?: string
  noLabel?: string
  onYes:    () => void
  onNo?:     () => void
}

export function usePopUp() {
  const [config, setConfig] = useState<PopUpConfig | null>(null)
  const close = () => setConfig(null)

  return {
    open:    (cfg: PopUpConfig) => setConfig(cfg),
    close,
    element: config && <PopUp {...config} onClose={close} />,
  }
}

interface PopUpProp extends PopUpConfig {
  onClose: () => void
}

export default function PopUp({ title, onYes, onNo, onClose, yesLabel, noLabel }: PopUpProp) {
  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        onClick={(e) => e.stopPropagation()}
        className="card bg-surface-overlay shadow-2xl flex flex-col gap-6 mx-4"
      >
        <p className="heading-4 text-text">{title}</p>
        <div className="flex gap-3 justify-start flex-row-reverse">
          <button type="button" onClick={() => {
            onClose()
            onYes()
          }} className="btn btn-primary text-xs px-3 py-1.5">
            {yesLabel}
          </button>
          <button type="button" onClick={() => {
            onClose()
            onNo?.()
          }} className="btn btn-outline text-xs px-3 py-1.5">
            {noLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
