import { FaMinus } from "react-icons/fa6";

type Props = {
  name: string
  value: string
  onChange: (field: "name" | "value", val: string) => void
  onDelete: () => void
}

export default function MeasurementInput({ name, value, onChange, onDelete }: Props) {
  return (
    <div className="flex flex-row gap-2 bg-surface border-2 border-default rounded-md p-1">
      <input type="text" placeholder="Navn" className="input" value={name} onChange={e => onChange("name", e.target.value)} />
      <input type="text" placeholder="Verdi" className="input" value={value} onChange={e => onChange("value", e.target.value)} />
      <button type="button" className="btn btn-error btn-icon self-center shrink-0" onClick={onDelete}>
        <FaMinus />
      </button>
    </div>
  )
}