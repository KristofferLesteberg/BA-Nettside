import Link from "next/link"

export default function ToastTestPageB() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 min-h-screen">
      <h1 className="heading-2">Toast Test — Page B</h1>
      <p className="text-muted">This page uses the minimal form-pages layout.</p>
      <Link href="/toast-test" className="btn btn-outline">
        ← Back to Page A (header-footer layout)
      </Link>
    </div>
  )
}
