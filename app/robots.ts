import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/prosjekter/', '/produkter/*/bestill'],
    },
    sitemap: 'https://bat.elev13.sevgs.no/sitemap.xml',
  }
}
