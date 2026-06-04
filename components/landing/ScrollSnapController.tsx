'use client'
import { useEffect } from 'react'

const HEADER_HEIGHT = 80 // 5rem at 16px base — matches layout pt-20

export default function ScrollSnapController() {
  useEffect(() => {
    let scrollTimer: ReturnType<typeof setTimeout>
    let isSnapping = false

    const handleScroll = () => {
      if (isSnapping) return
      clearTimeout(scrollTimer)
      scrollTimer = setTimeout(() => {
        const scrollY = window.scrollY
        // The dark section starts exactly one viewport height from the document top.
        // Snapping to it means scrolling so its top sits just below the fixed header.
        const snapTarget = window.innerHeight - HEADER_HEIGHT

        if (scrollY > 0 && scrollY < snapTarget) {
          isSnapping = true
          const target = scrollY < snapTarget / 2 ? 0 : snapTarget
          window.scrollTo({ top: target, behavior: 'smooth' })
          setTimeout(() => { isSnapping = false }, 700)
        }
      }, 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimer)
    }
  }, [])
  return null
}
