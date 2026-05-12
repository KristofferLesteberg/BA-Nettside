
interface PopUpProp {
  title: string
  onYes: () => void
  onNo: () => void
  yesLabel: string
  noLabel?: string
}

export default function PopUp({ title, onYes, onNo, yesLabel, noLabel }: PopUpProp) {

  return (
    <div>
      <p>{title}</p>
      
      <div>
        <button type="button" onClick={() => onYes()}>{yesLabel}</button>
        <button type="button" onClick={() => onNo()}>{noLabel}</button>
      </div>

    </div>

  )
}