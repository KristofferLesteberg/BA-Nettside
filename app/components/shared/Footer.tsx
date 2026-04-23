import Image from 'next/image';
import Link from 'next/link';
import { FaEnvelope, FaLocationDot, FaFacebook, FaGlobe } from 'react-icons/fa6';

const navLinks = [
  { href: '/products',        label: 'Våre Produkter' },
  { href: '/request-project', label: 'Prosjekter'     },
  { href: '/contact',         label: 'Kontakt Oss'    },
];

const contactEmails = [
  {
    name:  'Trine Nicolaisen',
    role:  'Avdelingsleder Bygg',
    email: 'Trine.Nicolaisen@sameyde.vgs.no',
  },
  {
    name:  'Dagfinn Rike',
    role:  'Avdelingsleder Anlegg',
    email: 'dagfinn.brokka.rike@sameyde.vgs.no',
  },
];

/* Reusable section heading — replaces .label to avoid its hardcoded color */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-white/40 mb-5">
      {children}
    </h3>
  );
}

export default function Footer() {
  return (
    <footer className="bg-secondary text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">

        {/* Top: 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12 divide-x">

          {/* Col 1 – About */}
          <div>
            <div className="relative h-14 w-44 mb-5">
              <Image
                src="/icons/SamEyde_vgs_hvit.svg"
                alt="Sam Eyde VGS"
                fill
                className="object-contain object-left brightness-0 invert"
              />
            </div>
            <p className="text-sm leading-relaxed text-white/70 mb-5">
              Elever ved Bygg- og anleggsteknikk på Sam Eyde VGS tilbyr
              produkter og tjenester av høy kvalitet — laget med faglig
              stolthet i Arendal.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/sameydevgs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-150"
              >
                <FaFacebook className="text-base" />
              </a>
              <a
                href="https://sameyde.vgs.no/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Skolens nettside"
                className="text-white w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-150"
              >
                <FaGlobe className="text-base" />
              </a>
            </div>
          </div>

          {/* Col 2 – Navigation */}
          <div>
            <SectionHeading>Navigasjon</SectionHeading>
            <ul className="flex flex-col gap-3">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm font-medium text-white/75 hover:text-white hover:underline transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 – Contact */}
          <div>
            <SectionHeading>Kontakt</SectionHeading>
            <ul className="flex flex-col gap-5">
              {contactEmails.map(({ name, role, email }) => (
                <li key={email} className="flex items-start gap-3">
                  <FaEnvelope className="mt-0.5 shrink-0 text-white/40 text-sm" />
                  <div>
                    <p className="text-xs text-white/40 mb-0.5">{role}</p>
                    <p className="text-sm font-semibold text-white">{name}</p>
                    <a
                      href={`mailto:${email}`}
                      className="text-xs text-white/60 hover:text-white hover:underline transition-colors duration-150 break-all"
                    >
                      {email}
                    </a>
                  </div>
                </li>
              ))}

              <li className="flex items-start gap-3">
                <FaLocationDot className="mt-0.5 shrink-0 text-white/40 text-sm" />
                <div>
                  <p className="text-xs text-white/40 mb-0.5">Adresse</p>
                  <p className="text-sm font-medium text-white/90">Østensbuveien 80</p>
                  <p className="text-sm text-white/70">4848 Arendal</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Map */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <FaLocationDot className="text-sm text-white/40 mb-5" />
            <SectionHeading>Finn oss</SectionHeading>
          </div>
          <div className="rounded-lg overflow-hidden w-full h-52 sm:h-64 opacity-90 hover:opacity-100 transition-opacity duration-200">
            <iframe
              title="Kart – Sam Eyde VGS"
              src="https://www.openstreetmap.org/export/embed.html?bbox=8.71721148490906%2C58.4796235209966%2C8.727253675460817%2C58.4839534441894&layer=mapnik"
              className="w-full h-full"
              loading="lazy"
            />
          </div>
          <a
            href="https://www.openstreetmap.org/?#map=17/58.481789/8.722233"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 inline-block mt-2 text-xs hover:text-white hover:underline transition-colors duration-150"
          >
            Åpne i kart ↗
          </a>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/20 pt-6 flex flex-col gap-2 text-xs text-white/40">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <p>© {new Date().getFullYear()} Sam Eyde VGS · Bygg- og anleggsteknikk</p>
            <a
              href="https://sameyde.vgs.no/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors duration-150"
            >
              sameyde.vgs.no ↗
            </a>
          </div>
          <p>
            Utvikling:{' '}
            {/* <a href="https://samit.sevgs.no/" className="text-white/60 hover:text-white transition-colors duration-150">Sam-IT UB</a>
            {' · '} */}
            <a href="https://www.linkedin.com/in/kristoffer-lesteberg-724a6537a/" className="text-white/60 hover:text-white transition-colors duration-150">Kristoffer Lesteberg</a>
            {' · '}
            <a href="https://www.linkedin.com/in/yehor-maksiuchenko/" className="text-white/60 hover:text-white transition-colors duration-150">Yehor Maksiuchenko</a>
          </p>
        </div>

      </div>
    </footer>
  );
}
