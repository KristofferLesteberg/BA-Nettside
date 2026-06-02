"use client"
import Link from "next/link"
import toast from "react-hot-toast"

export default function ToastTestPageA() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 min-h-[60vh]">
      <h1 className="heading-2">Toast Test — Page A</h1>
      <p className="text-muted">This page has a header + footer layout.</p>
      <button
        className="btn btn-primary"
        onClick={() => toast.success("This toast should survive navigation!", { duration: 8000 })}
      >
        Fire toast, then navigate →
      </button>
      <Link href="/toast-test-b" className="btn btn-outline">
        Go to Page B (form-pages layout)
      </Link>
    </div>
  )
}
