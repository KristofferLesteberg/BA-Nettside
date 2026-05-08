export const dynamic = 'force-dynamic'
// Forces NextJS to not prerender this page statically
// Is useful since the DB file that NEXT tries to acces doesnt exist yet
// P.S. Claude - "ur welcome buddy".

import Link from 'next/link'
import { getAllProducts } from '@/actions/products'
import FilteredProductsGrid from '@/components/shared/products/FilteredProductsGrid'

export default async function ProductsPage() {
  const convertedProducts = await getAllProducts()

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-12 flex flex-col gap-6">

      <nav aria-label="Brødsmulesti" className="flex items-center gap-1.5 small-text">
        <Link href="/" className="text-faint hover:text-text transition-colors duration-150">Hjem</Link>
        <span className="text-faint">/</span>
        <span className="text-muted">Produkter</span>
      </nav>

      <div>
        <h1 className="heading-1">Produkter</h1>
        <p className="body-text mt-1">
          Utforsk håndverkede varer laget av elever ved Sam Eyde videregående skole.
        </p>
      </div>

      <FilteredProductsGrid products={convertedProducts} isAdmin={false} />

      <div className="card-subtle flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
        <div>
          <p className="font-medium text-text">Fant du ikke det du lette etter?</p>
          <p className="small-text mt-0.5">
            Du kan bestille et prosjekt eller en vare etter eget ønske.
          </p>
        </div>
        <Link href="/prosjekter" className="btn btn-primary shrink-0 whitespace-nowrap">
        <Link href="/prosjekter" className="btn btn-primary shrink-0 whitespace-nowrap">
          Send en forespørsel
        </Link>
      </div>

    </section>
  )
}