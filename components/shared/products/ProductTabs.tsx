"use client"

import { useState } from "react"

type Props = {
  details: React.ReactNode
  measures: React.ReactNode
}

export default function ProductTabs({ details, measures }: Props) {
  const [active, setActive] = useState<"details" | "measures">("details")

  return (
    <div className="flex flex-col gap-3">

      {/* Tab controls */}
      <div className="flex flex-row gap-4 border-b border-default">
        <button
          onClick={() => setActive("details")}
          className="label cursor-pointer pb-2 transition-colors"
          style={{
            color: active === "details" ? "var(--color-primary)" : undefined,
            borderBottom: active === "details" ? "2px solid var(--color-primary)" : "2px solid transparent",
            marginBottom: "-1px",
          }}
        >
          Detaljer
        </button>
        <button
          onClick={() => setActive("measures")}
          className="label cursor-pointer pb-2 transition-colors"
          style={{
            color: active === "measures" ? "var(--color-primary)" : undefined,
            borderBottom: active === "measures" ? "2px solid var(--color-primary)" : "2px solid transparent",
            marginBottom: "-1px",
          }}
        >
          Mål
        </button>
      </div>

      {/* Sliding panels */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: active === "details" ? "translateX(0%)" : "translateX(-50%)",
            width: "200%",
          }}
        >
          <div className="w-1/2">{details}</div>
          <div className="w-1/2">{measures}</div>
        </div>
      </div>

    </div>
  )
}