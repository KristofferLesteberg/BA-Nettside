"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MdOutlineModeEdit } from "react-icons/md"
import BackBtn from "@/components/shared/BackBtn"


interface AdminPreviewBannerProps {
  productId: number
  isDraft: boolean
}

export default function AdminPreviewBanner({ productId, isDraft }: AdminPreviewBannerProps) {
  const router = useRouter()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let lastScrollY = window.scrollY
    const onScroll = () => {
      const currentScrollY = window.scrollY
      setVisible(currentScrollY < lastScrollY || currentScrollY < 20)
      lastScrollY = currentScrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="fixed left-0 right-0 z-40 h-12 bg-surface-overlay border-b border-default shadow-b-md transition-transform duration-300"
      style={{
        top: '5rem',
        transform: visible ? 'translateY(0)' : 'translateY(-5rem)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 h-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BackBtn handleOnClick={() => router.push('/admin?tab=produkter')} />
          <span className={`badge ${isDraft ? "badge-info" : "badge-success"}`}>
            {isDraft ? "Utkast" : "Publisert"}
          </span>
          <span className="small-text text-faint">Forhåndsvisning</span>
        </div>
        <Link href={`/admin/oppdater-produkt/${productId}`} className="btn btn-primary gap-1.5 text-sm">
          <MdOutlineModeEdit />
          Rediger
        </Link>
      </div>
    </div>
  )
}
