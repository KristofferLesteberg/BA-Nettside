import { prisma } from "./lib/prisma"
import ProductCard from "./components/product/ProductCard"

export default async function Home() {
  const products = await prisma.product.findMany({
    include: { images: true },
  })

  const convertedProducts = products.map((product) => ({
    ...product,
    price: product.price.toNumber(),
    publishedAt: product.publishedAt.toISOString(),
  }))

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-12">

      {/* Prosjektoversikt */}
      <section className="space-y-3">
        <h1 className="text-3xl font-bold">BA-Nettside</h1>
        <p className="text-secondary max-w-2xl">
          Produktkatalog og administrasjonspanel for et bygg- og anleggsprogram.
          Administratorer kan opprette, redigere og slette produkter med bilder og spesifikasjoner.
          Besøkende kan bla gjennom produkter og se detaljer.
        </p>
      </section>

      {/* Offentlige sider */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Offentlige sider</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { href: "/", label: "/ — Forside", desc: "Produktgrid med alle varer fra databasen." },
            { href: "/products/[id]", label: "/products/[id] — Produktside", desc: "Bildekarusell, pris, fagfelt-merke, beskrivelse, spesifikasjons-faner og kontakt-knapp." },
            { href: "/style-test", label: "/style-test — Designsystem", desc: "Typografi, farger, knapper, inndatafelt, merker, kort, mellomrom og kantradier." },
          ].map(({ href, label, desc }) => (
            <a
              key={href}
              href={href.includes("[") ? undefined : href}
              className="block border border-border rounded-lg p-4 hover:bg-surface transition-colors"
            >
              <div className="font-mono text-sm font-medium">{label}</div>
              <div className="text-secondary text-sm mt-1">{desc}</div>
            </a>
          ))}
        </div>
      </section>

      {/* Adminsider */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Adminsider <span className="text-sm font-normal text-secondary">(krever innlogging)</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { href: "/admin/login", label: "/admin/login — Innlogging", desc: "Brukernavn og passord settes via ADMIN_USERNAME / ADMIN_PASSWORD i miljøvariabler." },
            { href: "/admin", label: "/admin — Dashbord", desc: "Alle produkter med rediger- og slett-knapper. Lenke til å opprette nytt produkt." },
            { href: "/admin/newProduct", label: "/admin/newProduct — Nytt produkt", desc: "Skjema: fagfelt (Bygg/Anlegg), tittel, beskrivelse, pris, antall, mål (nøkkel-verdi) og drag-and-drop bildeoppasting." },
            { href: "/admin/updateProduct/[id]", label: "/admin/updateProduct/[id] — Rediger produkt", desc: "Samme skjema forhåndsutfylt med eksisterende data. Støtter omsortering, sletting og tillegg av bilder." },
          ].map(({ href, label, desc }) => (
            <a
              key={href}
              href={href.includes("[") ? undefined : href}
              className="block border border-border rounded-lg p-4 hover:bg-surface transition-colors"
            >
              <div className="font-mono text-sm font-medium">{label}</div>
              <div className="text-secondary text-sm mt-1">{desc}</div>
            </a>
          ))}
        </div>
      </section>

      {/* Datamodell */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Datamodell</h2>
        <div className="border border-border rounded-lg divide-y divide-border text-sm">
          {[
            { model: "Product", fields: "id, educationField (BUILDING | CONSTRUCTION), title, description, price, measures (JSON), amount, publishedAt" },
            { model: "ProductImage", fields: "id (UUID), productId (FK), sortOrder" },
            { model: "ProjectRequest", fields: "id, educationField, title, description, minPrice, maxPrice, klientinfo, adresse — definert i schema, ikke tatt i bruk enda" },
          ].map(({ model, fields }) => (
            <div key={model} className="flex gap-4 px-4 py-3">
              <span className="font-mono font-bold w-40 shrink-0">{model}</span>
              <span className="text-secondary">{fields}</span>
            </div>
          ))}
        </div>
        <p className="text-secondary text-sm">Database: SQLite (utvikling) via Prisma. Bilder lagres som WebP i <code className="font-mono">/public/images/</code> og serveres statisk.</p>
      </section>

      {/* Under arbeid */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Under arbeid / ufullstendig</h2>
        <ul className="space-y-2 text-sm text-secondary list-disc list-inside">
          <li><strong className="text-foreground">ProjectRequest-flyt</strong> — modellen finnes i schema; ingen API-endepunkter eller sider er laget enda.</li>
          <li><strong className="text-foreground">/projects-side</strong> — ruten eksisterer men innholdet er tomt.</li>
          <li><strong className="text-foreground">&quot;Ta kontakt&quot;-knapp</strong> — vises på produktsider men har ingen handling koblet til.</li>
          <li><strong className="text-foreground">DeleteProduct-omdirigering</strong> — siden oppdaterer seg ikke etter sletting.</li>
          <li><strong className="text-foreground">UpdateProductForm lastestatus</strong> — setter <code className="font-mono">isLoading = true</code> etter at data er hentet; viser &quot;Laster...&quot; på ubestemt tid.</li>
        </ul>
      </section>

      {/* Teknologistack */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Teknologistack</h2>
        <div className="flex flex-wrap gap-2 text-sm">
          {["Next.js 16 (App Router)", "React 19", "TypeScript 5", "Prisma 7 + SQLite", "NextAuth 4 (JWT)", "Tailwind CSS 4", "Swiper 12", "dnd-kit", "react-dropzone", "Sharp (WebP)"].map((t) => (
            <span key={t} className="border border-border rounded-full px-3 py-1">{t}</span>
          ))}
        </div>
      </section>

      {/* Skillelinje */}
      <hr className="border-border" />

      {/* Produktliste */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Produkter ({convertedProducts.length})</h2>
        {convertedProducts.length === 0 ? (
          <p className="text-secondary text-sm">Ingen produkter enda. <a href="/admin/newProduct" className="underline">Legg til et i adminpanelet.</a></p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {convertedProducts.map((product) => (
              <ProductCard key={product.id} product={product} isAdmin={false} />
            ))}
          </div>
        )}
      </section>

    </div>
  )
}
