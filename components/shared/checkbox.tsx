"use client"

import { useId } from 'react'

export default function Checkbox({ checked, callback }: { checked: boolean; callback: () => void }) {
  const id = useId()

  return (
    <label htmlFor={id} className="checkbox-toggle ml-auto">
      <input
        id={id}
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={callback}
      />
      <span className="toggle-track" aria-hidden="true">
        <span className="toggle-thumb" />
      </span>
    </label>
  )
}
