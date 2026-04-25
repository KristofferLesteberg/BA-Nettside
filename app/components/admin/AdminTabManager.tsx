"use client"

import { useState } from "react"

export type AdminTab = {
  label: string
  content: React.ReactNode
}

export default function AdminTabManager({ tabs }: { tabs: AdminTab[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [mounted, setMounted] = useState<Set<number>>(new Set([0]))

  const handleTabChange = (index: number) => {
    setActiveIndex(index)
    setMounted(prev => new Set(prev).add(index))
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Tab bar */}
      <div className="border-b border-default overflow-x-auto overflow-y-hidden">
        <div className="flex flex-row min-w-max">
          {tabs.map((tab, index) => (
            <button
              key={tab.label}
              onClick={() => handleTabChange(index)}
              className={`label cursor-pointer px-4 py-2.5 bg-bg hover:bg-surface-raised transition-colors whitespace-nowrap border-b-2 ${activeIndex === index ? "text-primary border-b-primary" : "text-text-faint border-b-transparent"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab panels — mounted lazily, kept in DOM once visited to preserve state */}
      <div>
        {tabs.map((tab, index) =>
          mounted.has(index) ? (
            <div key={tab.label} hidden={activeIndex !== index}>
              {tab.content}
            </div>
          ) : null
        )}
      </div>

    </div>
  )
}
