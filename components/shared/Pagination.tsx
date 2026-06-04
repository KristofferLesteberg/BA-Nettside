"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

interface Props {
  currentPage: number
  maxPages: number
}

export default function Pagination ({ currentPage, maxPages }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()

  function setPage(newPage: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('side', String(newPage))
    router.replace('?' + params.toString())
  }

  if (maxPages <= 0) return null

  return (
    <nav role="navigation" aria-label="Paginering" className="flex items-center">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setPage(currentPage - 1)}
          disabled={currentPage <= 1}
          className="btn btn-outline disabled:opacity-40"
          aria-label="Forrige side"
        >
          <FaChevronLeft aria-hidden="true" />
          Forrige side
        </button>
        <button
          onClick={() => setPage(currentPage + 1)}
          disabled={currentPage >= maxPages}
          className="btn btn-outline disabled:opacity-40"
          aria-label="Neste side"
        >
          Neste side
          <FaChevronRight aria-hidden="true" />
        </button>
      </div>
    </nav>
  )
}
