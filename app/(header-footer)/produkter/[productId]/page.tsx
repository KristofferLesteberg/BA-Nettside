import { notFound } from "next/navigation"
import Link from "next/link"
import Carousel from "@/components/shared/ImageCarousel"
import ProductTabs from "@/components/shared/products/ProductTabs"
import { getProductById } from "@/actions/products"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>
}) {
  const productId = parseInt((await params).productId)
  if (Number.isNaN(productId)) notFound()

  const product = await getProductById(productId)
  if (!product) notFound()


  return (
    <div className="bg-page min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 sm:py-12">

        {/* Breadcrumb */}
        <nav className="mb-6">
          <span className="small-text">
            <Link href="/" className="hover:underline">Hjem</Link>
            <span className="text-faint mx-2">/</span>
            <Link href="/produkter" className="hover:underline">Produkter</Link>
            <span className="text-faint mx-2">/</span>
            <span className="text-faint">{product.title}</span>
          </span>
        </nav>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* Left — carousel */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-8 lg:self-start">
            <Carousel
              images={product.images.map(img => img.id)}
              className="w-full h-72 sm:h-96 rounded-2xl"
            />
          </div>

          {/* Right — product details */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">

            {/* Title block */}
            <div className="flex flex-col gap-2">
              <span className="badge badge-neutral self-start">
                {product.educationField}
              </span>
              <h1 className="heading-2">{product.title}</h1>
              <p className="heading-2" style={{ color: "var(--color-primary)" }}>
                NOK {Number(product.price).toFixed(2)}
              </p>
            </div>

            {/* CTA */}
            <button className="btn btn-primary w-full py-3 text-base">
              Ta kontakt
            </button>

            <hr className="border-default" />

            {/* Description */}
            <div className="flex flex-col gap-2">
              <p className="label">Beskrivelse</p>
              <p className="body-text">{product.description}</p>
            </div>

            <hr className="border-default" />

            {/* Details table */}
            <ProductTabs
              details={
                <div className="card-subtle flex flex-col divide-y" style={{ borderRadius: "var(--radius-lg)" }}>
                  <div className="flex justify-between px-4 py-3">
                    <span className="small-text">Antall på lager</span>
                    <span className="small-text" style={{ color: "var(--color-text)" }}>{product.amount}</span>
                  </div>
                  <div className="flex justify-between px-4 py-3">
                    <span className="small-text">Publisert</span>
                    <span className="small-text" style={{ color: "var(--color-text)" }}>
                      {new Date(product.publishedAt).toLocaleDateString("no-NO")}
                    </span>
                  </div>
                  <div className="flex justify-between px-4 py-3">
                    <span className="small-text">Fagfelt</span>
                    <span className="small-text" style={{ color: "var(--color-text)" }}>
                      {product.educationField === "BUILDING" ? "Bygg" : "Anlegg"}
                    </span>
                  </div>
                </div>
              }
              measures={
                <div
                  className="card-subtle flex flex-col divide-y"
                  style={{ borderRadius: "var(--radius-lg)" }}
                >
                  {product.measures && Object.keys(product.measures).length > 0 ? (
                    Object.entries(product.measures).map(([key, value]) => (
                      <div key={key} className="flex justify-between px-4 py-3">
                        <span className="small-text">{key}</span>
                        <span className="small-text" style={{ color: "var(--color-text)" }}>
                          {value}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3">
                      <span className="small-text text-faint">Ingen mål tilgjengelig</span>
                    </div>
                  )}
                </div>
              }
              contactInfo={
                <div className="card-subtle flex flex-col divide-y" style={{ borderRadius: "var(--radius-lg)" }}>
                  <div className="flex justify-between px-4 py-3">
                    <span className="small-text">Navn</span>
                    <span className="small-text" style={{ color: "var(--color-text)" }}>{product.contactPerson?.name || ""}</span>
                  </div>
                  <div className="flex justify-between px-4 py-3">
                    <span className="small-text">Mail</span>
                    <span className="small-text" style={{ color: "var(--color-text)" }}>
                      {product.contactPerson?.email}
                    </span>
                  </div>
                  <div className="flex justify-between px-4 py-3">
                    <span className="small-text">Telefon</span>
                    <span className="small-text" style={{ color: "var(--color-text)" }}>
                      {product.contactPerson?.phone}
                    </span>
                  </div>
                  <div className="flex justify-between px-4 py-3">
                    <span className="small-text">Tittel</span>
                    <span className="small-text" style={{ color: "var(--color-text)" }}>
                      {product.contactPerson?.title}
                    </span>
                  </div>
                </div>
                

              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}