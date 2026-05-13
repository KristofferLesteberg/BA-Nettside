import { useState } from 'react'

interface PopUpConfig {
  title:     string
  yesLabel?: string
  noLabel?:  string
  onYes:     () => void
  onNo?:     () => void
}

export function usePopUp() {
  const [config, setConfig] = useState<PopUpConfig | null>(null)
  // visible drives the CSS class (animate-popup-in vs animate-popup-out).
  // close() flips visible to false first, then clears config after the
  // exit animation (150ms) so the popup stays mounted while it fades out.
  const [visible, setVisible] = useState(false)

  const open = (cfg: PopUpConfig) => {
    setConfig(cfg)
    setVisible(true)
  }

  const close = () => {
    setVisible(false)
    setTimeout(() => setConfig(null), 150)
  }

  return {
    open,
    close,
    element: config && <PopUp {...config} onClose={close} visible={visible} />,
  }
}

interface PopUpProp extends PopUpConfig {
  onClose: () => void
  visible: boolean
}

export default function PopUp({ title, onYes, onNo, onClose, yesLabel, noLabel, visible }: PopUpProp) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs ${visible ? 'animate-popup-in' : 'animate-popup-out'}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="card bg-surface-overlay shadow-2xl flex flex-col gap-6 mx-4 animate-fade-in"
      >
        <p className="heading-4 text-text">{title}</p>
        <div className="flex gap-3 justify-start flex-row-reverse">
          <button type="button" onClick={() => { onClose(); onYes(); }} className="btn btn-primary text-xs px-3 py-1.5">
            {yesLabel}
          </button>
          <button type="button" onClick={() => { onClose(); onNo?.(); }} className="btn btn-outline text-xs px-3 py-1.5">
            {noLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
