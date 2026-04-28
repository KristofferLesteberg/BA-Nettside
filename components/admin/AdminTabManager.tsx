"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"

export type AdminTab = {
  label: string
  content: React.ReactNode
}

export default function AdminTabManager({ tabs }: { tabs: AdminTab[] }) {
  const searchParams = useSearchParams()
  const tabLabel = searchParams.get('tab')
  const router = useRouter()

  // Either return the index from query or 0
  const initialIndex = Math.max(0, tabs.findIndex((tab) => tab.label === tabLabel))

  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const [mounted, setMounted] = useState<Set<number>>(new Set([initialIndex]))

  const handleTabChange = (index: number) => {
    setActiveIndex(index)
    router.push(`/admin?tab=${tabs[index].label}`)
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
