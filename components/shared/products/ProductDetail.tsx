/* eslint-disable @next/next/no-img-element */
"use client"

import Link from "next/link"
import Carousel from "@/components/shared/ImageCarousel"
import { EDUCATION_FIELD_LABELS } from "@/app/lib/education-fields"
import { FaEnvelope, FaPhone } from "react-icons/fa"
import { FaWrench, FaHelmetSafety, FaRoad } from "react-icons/fa6"
import { GiBrickWall } from "react-icons/gi"
import type { getProductById } from "@/actions/products"
import type { EducationField } from "@/generated/prisma"

const FIELD_ICONS: Record<EducationField, React.ReactNode> = {
  PLUMBER:      <FaWrench       className="shrink-0" />,
  CONCRETE:     <GiBrickWall    className="shrink-0" />,
  CARPENTER:    <FaHelmetSafety className="shrink-0" />,
  CONSTRUCTION: <FaRoad         className="shrink-0" />,
}

type Product = NonNullable<Awaited<ReturnType<typeof getProductById>>>
type StoredMeasure = { name: string; value: string; unit: string }

export default function ProductDetail({ product }: { product: Product }) {
  const rawMeasures = product.measures
  const measures: StoredMeasure[] = Array.isArray(rawMeasures)
    ? (rawMeasures as StoredMeasure[])
    : Object.entries((rawMeasures ?? {}) as Record<string, string>)
        .map(([name, value]) => ({ name, value, unit: "" }))

  const contact = product.contactPerson

  const handleTaKontakt = () => {
    const card = document.getElementById("contact-card")
    if (!card) return
    card.scrollIntoView({ behavior: "smooth", block: "center" })
    card.classList.remove("contact-highlight")
    void card.offsetWidth
    card.classList.add("contact-highlight")
    card.addEventListener("animationend", () => card.classList.remove("contact-highlight"), { once: true })
  }

  return (
    <div className="bg-page min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 sm:py-8">

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">

          {/* Left — carousel */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-24 lg:self-start">
            {/* Breadcrumb */}
            <nav className="mb-5">
              <span className="small-text">
                <Link href="/" className="hover:underline">Hjem</Link>
                <span className="text-faint mx-2">/</span>
                <Link href="/produkter" className="hover:underline">Produkter</Link>
                <span className="text-faint mx-2">/</span>
                <span className="text-faint">{product.title}</span>
              </span>
            </nav>
            <Carousel
              images={product.images.map(img => img.id)}
              className="w-full h-72 sm:h-96"
            />
          </div>

          {/* Right — product details */}
          <div className="w-full lg:w-1/2 flex flex-col gap-5">

            {/* Title block */}
            <div className="flex flex-col gap-1.5">
              {product.educationField && (
                <span className="badge badge-neutral self-start flex items-center gap-1.5">
                  {FIELD_ICONS[product.educationField]}
                  {EDUCATION_FIELD_LABELS[product.educationField]}
                </span>
              )}
              <h1 className="heading-2">{product.title}</h1>
              <p className="heading-2" style={{ color: "var(--color-primary)" }}>
                NOK {Number(product.price).toFixed(2)}
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-3">
              {contact && (
                <div className="flex flex-col gap-1.5">
                  <button onClick={handleTaKontakt} className="btn btn-outline">
                    Ta Kontakt
                  </button>
                  <div className="flex items-center gap-2 pl-1">
                    <div className="w-5 h-5 rounded-full bg-surface-sunken border border-secondary flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-faint">
                        {contact.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="small-text text-faint">{contact.name} · {contact.title}</span>
                  </div>
                </div>
              )}
              {product.amount > 0 ? (
                <Link className="btn btn-primary" href={`/bestill-produkt/${product.id}`}>
                  Bestill
                </Link>
              ) : (
                <button disabled className="btn btn-primary opacity-50 cursor-not-allowed">
                  Utsolgt
                </button>
              )}
            </div>

            <hr className="border-default" />

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <p className="label">Beskrivelse</p>
              <p className="body-text">{product.description}</p>
            </div>

            <hr className="border-default" />

            {/* Detaljer */}
            <div className="flex flex-col gap-2">
              <p className="label">Detaljer</p>
              <div className="card p-3 flex flex-col divide-y rounded-lg">
                <div className="flex justify-between px-4 py-2">
                  <span className="small-text">Antall på lager</span>
                  <span className="small-text text-text" >{product.amount}</span>
                </div>
                <div className="flex justify-between px-4 py-2">
                  <span className="small-text">Publisert</span>
                  <span className="small-text text-text">
                    {new Date(product.publishedAt).toLocaleDateString("no-NO")}
                  </span>
                </div>
                {product.educationField && (
                  <div className="flex justify-between px-4 py-2">
                    <span className="small-text">Fagfelt</span>
                    <span className="small-text text-text">
                      {EDUCATION_FIELD_LABELS[product.educationField]}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Mål */}
            <div className="flex flex-col gap-2">
              <p className="label">Mål</p>
              <div className="card p-3 flex flex-col divide-y rounded-lg">
                {measures.length > 0 ? measures.map((m, i) => (
                  <div key={i} className="flex justify-between items-baseline px-4 py-2">
                    <span className="label">{m.name}</span>
                    <span className="small-text font-semibold text-text">
                      {m.value}{m.unit}
                    </span>
                  </div>
                )) : (
                  <div className="px-4 py-2">
                    <span className="small-text text-faint">Ingen mål tilgjengelig</span>
                  </div>
                )}
              </div>
            </div>

            {/* Kontaktperson */}
            <div className="flex flex-col gap-2">
              <p className="label">Kontaktperson</p>
              {contact ? (
                <div
                  id="contact-card"
                  className="card flex flex-col gap-4 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full shrink-0 bg-surface-sunken border-2 border-secondary flex items-center justify-center">
                      <span className="text-base font-bold text-faint">
                        {contact.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-base truncate" style={{ color: "var(--color-text)" }}>
                        {contact.name}
                      </p>
                      <p className="small-text text-faint">{contact.title}</p>
                    </div>
                  </div>
                  <hr className="border-default" />
                  <div className="flex flex-col gap-2">
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-2 small-text hover:underline"
                      style={{ color: "var(--color-text)" }}
                    >
                      <FaEnvelope className="text-primary shrink-0" />
                      {contact.email}
                    </a>
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex items-center gap-2 small-text hover:underline"
                      style={{ color: "var(--color-text)" }}
                    >
                      <FaPhone className="text-primary shrink-0" />
                      {contact.phone}
                    </a>
                  </div>
                </div>
              ) : (
                <div className="card-subtle px-4 py-3" style={{ borderRadius: "var(--radius-lg)" }}>
                  <span className="small-text text-faint">Ingen kontaktperson er tilknyttet dette produktet</span>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
