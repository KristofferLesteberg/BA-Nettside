"use client"

import { useState } from "react"

type Props = {
  details: React.ReactNode
  measures: React.ReactNode
  contactInfo: React.ReactNode
}

export default function ProductTabs({ details, measures, contactInfo }: Props) {
  const [active, setActive] = useState<"details" | "measures" | "contactInfo">("details")

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
        <button
          onClick={() => setActive("contactInfo")}
          className="label cursor-pointer pb-2 transition-colors"
          style={{
            color: active === "contactInfo" ? "var(--color-primary)" : undefined,
            borderBottom: active === "contactInfo" ? "2px solid var(--color-primary)" : "2px solid transparent",
            marginBottom: "-1px",
          }}
        >
          Kontakt info
        </button>
      </div>

      {/* Sliding panels */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: active === "details" ? "translateX(0%)" : active === "measures" ? "translateX(-25%)" : active === "contactInfo" ? "translateX(-50%)" : undefined,
          
            width: "400%",
          }}
        >
          <div className="w-1/4">{details}</div>
          <div className="w-1/4">{measures}</div>
          <div className="w-1/4">{contactInfo}</div>
    
        </div>
      </div>

    </div>
  )
}