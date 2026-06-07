"use client"
import { useRouter } from "next/navigation"
import { IconPlus } from "@/app/lib/icons"
export default function CreateProduct() {
  const router = useRouter()
  return (
    <button onClick={() => router.push('/admin/nytt-produkt')} className="btn btn-primary gap-1.5">
      <IconPlus className="text-base" />
      Ny produkt
    </button>
  )
}