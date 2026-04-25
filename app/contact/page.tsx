import { FaEnvelope, FaFacebook, FaGlobe, FaLocationDot } from 'react-icons/fa6';
import { IconType } from 'react-icons';

interface ContactItem {
  Icon: IconType;
  label: string;
  value: string;
  href: string;
}

const contactItems: ContactItem[] = [
  {
    Icon: FaEnvelope,
    label: 'Trine Nicolaisen, avdelingsleder Bygg- og anleggsteknikk',
    value: 'Trine.Nicolaisen@sameyde.vgs.no',
    href: 'mailto:Trine.Nicolaisen@sameyde.vgs.no',
  },
  {
    Icon: FaEnvelope,
    label: 'Dagfinn Rike, avdelingsleder Anleggsteknikk',
    value: 'dagfinn.brokka.rike@sameyde.vgs.no',
    href: 'mailto:dagfinn.brokka.rike@sameyde.vgs.no',
  },
  {
    Icon: FaEnvelope,
    label: 'Skolens E-post',
    value: 'kontakt@sameyde.vgs.no',
    href: 'mailto:elever@sameyde.vgs.no',
  },
  {
    Icon: FaFacebook,
    label: 'Facebook',
    value: 'Sam Eyde VGS',
    href: 'https://www.facebook.com/sameydevgs',
  },
  {
    Icon: FaGlobe,
    label: 'Nettside',
    value: 'sameyde.vgs.no',
    href: 'https://sameyde.vgs.no/',
  },
];

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

      {/* Page header */}
      <div className="mb-10">
        <p className="label mb-2">Sam Eyde VGS</p>
        <h1 className="heading-1 mb-3">Kontakt oss</h1>
        <p className="body-text">
          Ta gjerne kontakt med oss – vi svarer så raskt vi kan.
        </p>
      </div>

      {/* Contact options */}
      <section className="card mb-12 pb-1.5">
        <div className="flex items-center gap-2 mb-6">
          <FaLocationDot className="text-primary text-lg" />
          <h2 className="heading-3">Kontaktinformasjon</h2>
        </div>

        <ul className="divide-y divide-border">
          {contactItems.map(({ Icon, label, value, href }) => (
            <li key={href}>
              <a
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-4 py-4 group"
              >
                {/* Icon bubble */}
                <span className="shrink-0 w-10 h-10 rounded-full bg-surface-sunken flex items-center justify-center text-primary text-base transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <Icon />
                </span>

                {/* Text */}
                <div className="min-w-0">
                  <p className="small-text mb-0.5">{label}</p>
                  <p className="font-medium text-text truncate transition-colors duration-150 group-hover:text-primary">
                    {value}
                  </p>
                </div>

                {/* Arrow */}
                <span className="ml-auto mr-5 text-text-faint opacity-0 -translate-x-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0 text-2xl">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Map */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <FaLocationDot className="text-primary text-lg" />
          <h2 className="heading-3">Finn oss</h2>
        </div>
        <p className="body-text mb-4">Østensbuveien 80, 4848 Arendal</p>
        <div className="rounded-lg overflow-hidden border border-border shadow-sm w-full h-80 sm:h-96">
          <iframe
            title="Kart – Sam Eyde VGS"
            src="https://www.openstreetmap.org/export/embed.html?bbox=8.71721148490906%2C58.4796235209966%2C8.727253675460817%2C58.4839534441894&amp;layer=mapnik"
            className="w-full h-full"
            loading="lazy"
          />
        </div>
        <p className="small-text mt-2">
          <a
            href="https://www.openstreetmap.org/?#map=17/58.481789/8.722233"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Åpne i kart ↗
          </a>
        </p>
      </section>

    </main>
  );
}
