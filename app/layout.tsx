
import type { Metadata } from "next";
import "@/app/globals.css";

import Providers from '@/components/shared/providers';
import AppToaster from '@/components/shared/AppToaster';
import "react-phone-number-input/style.css";
import "rc-slider/assets/index.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const metadata: Metadata = {
  metadataBase: new URL('https://bat.elev13.sevgs.no'),
  title: {
    template: '%s – Bygg & Anlegg Sam Eyde VGS',
    default: 'Bygg & Anlegg – Sam Eyde VGS',
  },
  description: 'Kjøp håndverkede produkter eller bestill et prosjekt fra elever på bygg- og anleggsteknikk ved Sam Eyde videregående skole.',
  openGraph: {
    title: 'Bygg & Anlegg – Sam Eyde VGS',
    description: 'Kjøp håndverkede produkter eller bestill et prosjekt fra elever på bygg- og anleggsteknikk ved Sam Eyde videregående skole.',
    url: 'https://bat.elev13.sevgs.no',
    siteName: 'Bygg & Anlegg – Sam Eyde VGS',
    images: [{ url: '/static-images/fp-img1.jpg', width: 1200, height: 630 }],
    locale: 'nb_NO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bygg & Anlegg – Sam Eyde VGS',
    description: 'Kjøp håndverkede produkter eller bestill et prosjekt fra elever på bygg- og anleggsteknikk ved Sam Eyde videregående skole.',
    images: ['/static-images/fp-img1.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body className="flex flex-col min-h-screen">
        <Providers>
          {children}
        </Providers>
        <AppToaster />
      </body>
    </html>
  );
}
