"use client"

import { useRef, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

const FADE_MS = 200

export default function AdminTabBreadcrumb({ fallback }: { fallback: string }) {
  const searchParams = useSearchParams()
  const initialTab = searchParams.get('tab') ?? fallback
  const [displayTab, setDisplayTab] = useState(initialTab)
  const [animClass, setAnimClass] = useState('')
  const bcT1 = useRef<ReturnType<typeof setTimeout> | null>(null)
  const bcT2 = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handler = (e: Event) => {
      const newLabel = (e as CustomEvent<{ label: string }>).detail.label

      if (bcT1.current) clearTimeout(bcT1.current)
      if (bcT2.current) clearTimeout(bcT2.current)

      setAnimClass('animate-tab-out')

      bcT1.current = setTimeout(() => {
        setDisplayTab(newLabel)
        setAnimClass('animate-tab-in')
      }, FADE_MS)

      bcT2.current = setTimeout(() => setAnimClass(''), FADE_MS * 2)
    }

    window.addEventListener('admin-tab-change', handler)
    return () => window.removeEventListener('admin-tab-change', handler)
  }, [])

  return <span className={`label text-md ${animClass}`}>/ {displayTab}</span>
}
