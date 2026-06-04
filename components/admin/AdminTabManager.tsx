"use client"

import { useState, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"

export type AdminTab = {
  label: string
  content: React.ReactNode
  count?: number
}

const FADE_MS = 200

export default function AdminTabManager({ primaryTabs, secondaryTabs }: { primaryTabs: AdminTab[], secondaryTabs: AdminTab[] }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tabs = [...primaryTabs, ...secondaryTabs]
  const initialIndex = Math.max(0, tabs.findIndex(t => t.label === searchParams.get('tab')))

  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const [pendingIndex, setPendingIndex] = useState<number | null>(null)
  const [mounted, setMounted] = useState<Set<number>>(new Set([initialIndex]))

  const panelRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const t1 = useRef<ReturnType<typeof setTimeout> | null>(null)
  const t2 = useRef<ReturnType<typeof setTimeout> | null>(null)

  const indicatorIndex = pendingIndex ?? activeIndex

  const animatePanel = (el: HTMLDivElement | null, cls: 'animate-tab-in' | 'animate-tab-out') => {
    if (!el) return
    el.classList.remove('animate-tab-in', 'animate-tab-out')
    void el.offsetWidth
    el.classList.add(cls)
  }

  const handleTabChange = (index: number) => {
    if (index === indicatorIndex) return
    
    if (t1.current) clearTimeout(t1.current)
    if (t2.current) clearTimeout(t2.current)

    // User clicked the tab that's currently fading out — cancel and fade back in
    if (index === activeIndex) {
      setPendingIndex(null)
      const restoredSaved = sessionStorage.getItem(`tabFilters_${tabs[activeIndex].label}`) ?? ''
      const restoredParams = new URLSearchParams(restoredSaved)
      restoredParams.set('tab', tabs[activeIndex].label)
      router.replace('/admin?' + restoredParams.toString())
      const panel = panelRefs.current[activeIndex]
      if (panel) {
        panel.style.display = 'block'
        animatePanel(panel, 'animate-tab-in')
      }
      window.dispatchEvent(new CustomEvent('admin-tab-change', { detail: { label: tabs[activeIndex].label } }))
      return
    }

    // Save current tab's filter params
    const currentParams = new URLSearchParams(searchParams.toString())
    currentParams.delete('tab')
    sessionStorage.setItem(`tabFilters_${tabs[activeIndex].label}`, currentParams.toString())

    // Load new tab's filter params and update URL
    const saved = sessionStorage.getItem(`tabFilters_${tabs[index].label}`) ?? ''
    const newParams = new URLSearchParams(saved)
    newParams.set('tab', tabs[index].label)
    router.push('/admin?' + newParams.toString())

    setMounted(prev => new Set(prev).add(index))
    setPendingIndex(index)
    window.dispatchEvent(new CustomEvent('admin-tab-change', { detail: { label: tabs[index].label } }))

    const fromPanel = panelRefs.current[activeIndex]
    if (fromPanel) {
      fromPanel.style.display = 'block'
      animatePanel(fromPanel, 'animate-tab-out')
    }

    t1.current = setTimeout(() => {
      if (fromPanel) {
        fromPanel.classList.remove('animate-tab-out')
        fromPanel.style.display = 'none'
      }

      setActiveIndex(index)
      setPendingIndex(null)

      const toPanel = panelRefs.current[index]
      if (toPanel) {
        toPanel.style.display = 'block'
        animatePanel(toPanel, 'animate-tab-in')
      }

      t2.current = setTimeout(() => {
        if (toPanel) toPanel.classList.remove('animate-tab-in')
      }, FADE_MS)
    }, FADE_MS)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Tab bar */}
      <div className="border-b border-default overflow-x-auto overflow-y-hidden">
        <div className="flex flex-row min-w-max justify-between">
          <div>
            {primaryTabs.map((tab, index) => (
              <button
                key={tab.label}
                onClick={() => handleTabChange(index)}
                className={`label cursor-pointer px-4 py-2.5 bg-bg hover:bg-surface-raised transition-colors whitespace-nowrap border-b-2 ${indicatorIndex === index ? "text-primary border-b-primary" : "text-text-faint border-b-transparent"}`}
              >
                {`${tab.label} ${tab.count ? `(${tab.count})` : ""}`}
              </button>
            ))}
          </div>
          <div>
            {secondaryTabs.map((tab, index) => (
              <button
                key={tab.label}
                onClick={() => handleTabChange(index + primaryTabs.length)}
                className={`label cursor-pointer px-4 py-2.5 bg-bg hover:bg-surface-raised transition-colors whitespace-nowrap border-b-2 ${indicatorIndex === index + primaryTabs.length ? "text-primary border-b-primary" : "text-text-faint border-b-transparent"}`}
              >
                {`${tab.label} ${tab.count ? `(${tab.count})` : ""}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab panels — mounted lazily, kept in DOM once visited to preserve state */}
      <div>
        {tabs.map((tab, index) =>
          mounted.has(index) ? (
            <div
              key={tab.label}
              ref={el => { panelRefs.current[index] = el }}
              style={activeIndex !== index ? { display: 'none' } : undefined}
            >
              {tab.content}
            </div>
          ) : null
        )}
      </div>
    </div>
  )
}
