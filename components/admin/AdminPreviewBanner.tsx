import Link from "next/link"
import { MdOutlineModeEdit } from "react-icons/md"
import { IoArrowBack } from "react-icons/io5"

interface AdminPreviewBannerProps {
  productId: number
  isDraft: boolean
}

export default function AdminPreviewBanner({ productId, isDraft }: AdminPreviewBannerProps) {
  return (
    <div className="sticky top-20 z-10 bg-surface-overlay border-b border-default shadow-b-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin?tab=produkter" className="btn btn-ghost gap-1.5 text-sm">
            <IoArrowBack />
            Tilbake
          </Link>
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
