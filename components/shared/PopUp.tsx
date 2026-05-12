
interface PopUpProp {
  title: string
  onYes: () => void
  onNo: () => void 
  onClose: () => void
  yesLabel: string
  noLabel?: string
}

export default function PopUp({ title, onYes, onNo,onClose, yesLabel, noLabel }: PopUpProp) {
  return (
    <div onClick={onClose} className=" fixed inset-0 z-50 flex items-start justify-center pt-10 bg-black/40">
      <div className="card bg-surface-overlay shadow-xl w-1/2 max-w-sm flex flex-col gap-5 ">
        <p className="heading-4">{title}</p>
        <div className="flex gap-3">
          <button type="button" onClick={onYes} className="btn btn-primary flex-1">
            {yesLabel}
          </button>
          <button type="button" onClick={onNo} className="btn btn-outline flex-1">
            {noLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
