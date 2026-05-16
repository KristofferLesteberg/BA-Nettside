import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

interface PopUpConfig {
  title:     string
  subtitle?: string
  yesLabel?: string
  noLabel?:  string
  onYes:     () => void
  onNo?:     () => void
}

export function usePopUp() {
  const [config, setConfig] = useState<PopUpConfig | null>(null)
  const [visible, setVisible] = useState(false)
  const [portalEl] = useState<HTMLDivElement | null>(() => {
    if (typeof document === 'undefined') return null
    return document.createElement('div')
  })

  useEffect(() => {
    if (!portalEl) return
    document.body.appendChild(portalEl)
    return () => { document.body.removeChild(portalEl) }
  }, [portalEl])

  const open = useCallback((cfg: PopUpConfig) => {
    setConfig(cfg)
    setVisible(true)
    Array.from(document.body.children).forEach(child => {
      if (child !== portalEl) child.setAttribute('inert', '')
    })
  }, [portalEl])

  const close = useCallback(() => {
    setVisible(false)
    Array.from(document.body.children).forEach(child => {
      child.removeAttribute('inert')
    })
    setTimeout(() => setConfig(null), 200)
  }, [])

  const element = config && portalEl
    ? createPortal(<PopUp {...config} onClose={close} visible={visible} />, portalEl)
    : null

  return { open, close, element }
}

interface PopUpProp extends PopUpConfig {
  onClose: () => void
  visible: boolean
}

export default function PopUp({ title, subtitle, onYes, onNo, onClose, yesLabel, noLabel, visible }: PopUpProp) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    cardRef.current?.focus()
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div
      onClick={(e) => { e.stopPropagation(); onClose() }}
      className={`fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-xs ${visible ? 'animate-popup-in' : 'animate-popup-out'}`}
    >
      <div
        ref={cardRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="card relative bg-surface-overlay shadow-2xl flex flex-col gap-5 p-6 mx-4 w-full max-w-96 md:max-w-2/3 lg:max-w-1/3 animate-fade-in outline-none"
      >
        <button type="button" onClick={onClose} className="btn btn-outline btn-icon absolute top-3 right-3">
          <X size={16} />
        </button>

        <div className="flex flex-col items-center gap-2 pt-4">
          <p className="heading-3 text-text text-center">{title}</p>
          {subtitle && <p className="small-text text-center">{subtitle}</p>}
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={() => { onClose(); onNo?.(); }} className="btn btn-outline p-2 flex-1">
            {noLabel}
          </button>
          <button type="button" onClick={() => { onClose(); onYes(); }} className="btn btn-primary p-2 flex-1">
            {yesLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
