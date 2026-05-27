"use client"

import Link from "next/link"
import { FaBoxOpen } from "react-icons/fa6"
import BackBtn from "@/components/shared/BackBtn"

export default function ProductNotFound() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 sm:py-8 flex flex-col min-h-[calc(100vh-5rem)]">

      <div>
        <BackBtn />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-4 mb-10">

        <div className="w-20 h-20 rounded-full bg-subtle border border-default flex items-center justify-center">
          <FaBoxOpen className="text-3xl text-faint" />
        </div>

        <div className="flex flex-col gap-2 max-w-120">
          <p className="label">Produkt ikke funnet</p>
          <h1 className="heading-1">Dette produktet er ikke tilgjengelig</h1>
          <p className="body-text mt-1">
            Produktet du leter etter finnes ikke, eller er ikke tilgjengelig for øyeblikket.
            Ta en titt på resten av produktene våre — kanskje du finner noe du liker.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-2">
          <Link href="/produkter" className="btn btn-primary">Se alle produkter</Link>
          <Link href="/kontakt-oss" className="btn btn-outline">Kontakt oss</Link>
        </div>

      </div>

      <div className="card-subtle flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="font-medium">Leter du etter noe spesielt?</p>
          <p className="small-text mt-0.5">
            Du kan bestille et prosjekt eller en vare etter eget ønske.
          </p>
        </div>
        <Link href="/prosjekter" className="btn btn-primary shrink-0 whitespace-nowrap">
          Send en forespørsel
        </Link>
      </div>

    </div>
  )
}
