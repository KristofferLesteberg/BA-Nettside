import type { MetadataRoute } from 'next'
import { getAllProducts } from '@/actions/products'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = process.env.NEXTAUTH_URL!.replace(/\/$/, '')
  const products = await getAllProducts()

  const productUrls: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/produkter/${product.id}`,
    lastModified: product.publishedAt ? new Date(product.publishedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/produkter`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/prosjekter`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/kontakt-oss`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...productUrls,
  ]
}
