
import { useSearchParams, useRouter } from "next/navigation"

interface Props {
  currentPage: number
  maxPages: number
}

export default function Pagination ({ currentPage, maxPages }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()



  if (maxPages <= 1) { return }

  return (
    <></>
  )
}