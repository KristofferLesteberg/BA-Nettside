import Link from 'next/link'

export default function RootNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-page">
      <div className="text-center space-y-4 max-w-96">
        <p className="label text-primary">404</p>
        <h1 className="heading-1">Side ikke funnet</h1>
        <p className="body-text">
          Siden du leter etter finnes ikke eller har blitt flyttet.
        </p>
        <Link href="/" className="btn btn-primary mt-2">
          Gå til forsiden
        </Link>
      </div>
    </div>
  )
}
