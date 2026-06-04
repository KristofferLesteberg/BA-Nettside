import Image from 'next/image';
import Link from 'next/link';
import { IconEmail, IconLocation, IconFacebook, IconWebsite } from '@/app/lib/icons';

const navLinks = [
  { href: '/produkter',   label: 'Våre Produkter'      },
  { href: '/prosjekter',  label: 'Bestill et prosjekt' },
  { href: '/kontakt-oss', label: 'Kontakt Oss'         },
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

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-text-on-dark-faint mb-5">
      {children}
    </h3>
  );
}

export default function Footer() {
  return (
    <footer className="bg-secondary text-text-on-dark mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">

        {/* Top: 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 mb-12">

          {/* Col 1 – About */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="relative h-14 w-44 mb-5">
              <Image
                src="/icons/SamEyde_vgs_hvit.svg"
                alt="Sam Eyde VGS"
                fill
                className="object-contain object-left brightness-0 invert"
              />
            </div>
            <p className="text-sm leading-relaxed text-text-on-dark-muted mb-5">
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
                className="text-text-on-dark w-9 h-9 rounded-full bg-surface-on-dark hover:bg-surface-on-dark-hover flex items-center justify-center transition-colors duration-150"
              >
                <IconFacebook className="text-base" />
              </a>
              <a
                href="https://sameyde.vgs.no/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Skolens nettside"
                className="text-text-on-dark w-9 h-9 rounded-full bg-surface-on-dark hover:bg-surface-on-dark-hover flex items-center justify-center transition-colors duration-150"
              >
                <IconWebsite className="text-base" />
              </a>
            </div>
          </div>

          {/* Col 2 – Navigation */}
          <div className="border-t border-border-on-dark pt-6 sm:border-t-0 sm:pt-0 sm:border-l sm:pl-8 md:pl-10">
            <SectionHeading>Navigasjon</SectionHeading>
            <ul className="flex flex-col gap-3">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm font-medium text-text-on-dark-muted hover:text-text-on-dark hover:underline transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 – Contact */}
          <div className="border-t border-border-on-dark pt-6 sm:border-t md:border-t-0 md:pt-0 md:border-l md:pl-10">
            <SectionHeading>Kontakt</SectionHeading>
            <ul className="flex flex-col gap-5">
              {contactEmails.map(({ name, role, email }) => (
                <li key={email} className="flex items-start gap-3">
                  <IconEmail aria-hidden="true" className="mt-0.5 shrink-0 text-text-on-dark-faint text-sm" />
                  <div>
                    <p className="text-xs text-text-on-dark-faint mb-0.5">{role}</p>
                    <p className="text-sm font-semibold text-text-on-dark">{name}</p>
                    <a
                      href={`mailto:${email}`}
                      className="text-xs text-text-on-dark-faint hover:text-text-on-dark hover:underline transition-colors duration-150 break-all"
                    >
                      {email}
                    </a>
                  </div>
                </li>
              ))}

              <li className="flex items-start gap-3">
                <IconLocation aria-hidden="true" className="mt-0.5 shrink-0 text-text-on-dark-faint text-sm" />
                <div>
                  <p className="text-xs text-text-on-dark-faint mb-0.5">Adresse</p>
                  <p className="text-sm font-medium text-text-on-dark">Østensbuveien 80</p>
                  <p className="text-sm text-text-on-dark-muted">4848 Arendal</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Map */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <IconLocation aria-hidden="true" className="text-sm text-text-on-dark-faint" />
            <SectionHeading>Finn oss</SectionHeading>
          </div>
          <div className="rounded-lg overflow-hidden w-full h-48 sm:h-56 md:h-64 opacity-90 hover:opacity-100 transition-opacity duration-200">
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
            className="text-text-on-dark-faint inline-block mt-2 text-xs hover:text-text-on-dark hover:underline transition-colors duration-150"
          >
            Åpne i kart ↗<span className="sr-only"> (åpnes i ny fane)</span>
          </a>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border-on-dark pt-6 flex flex-col gap-2 text-xs text-text-on-dark-faint">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <p>© {new Date().getFullYear()} Sam Eyde VGS · Bygg- og anleggsteknikk</p>
            <a
              href="https://sameyde.vgs.no/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-on-dark-faint hover:text-text-on-dark transition-colors duration-150"
            >
              sameyde.vgs.no ↗
            </a>
          </div>
          <p>
            Utviklet av:{' '}
            <a href="https://samit.sevgs.no/" className="text-text-on-dark-muted hover:text-text-on-dark transition-colors duration-150">Sam-IT UB</a>
            {' · '}
            <a href="https://www.linkedin.com/in/kristoffer-lesteberg-724a6537a/" className="text-text-on-dark-muted hover:text-text-on-dark transition-colors duration-150">Kristoffer Lesteberg</a>
            {' · '}
            <a href="https://www.linkedin.com/in/yehor-maksiuchenko/" className="text-text-on-dark-muted hover:text-text-on-dark transition-colors duration-150">Yehor Maksiuchenko</a>
          </p>
        </div>

      </div>
    </footer>
  );
}
