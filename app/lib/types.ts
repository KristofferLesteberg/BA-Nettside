import { Product, ProductImage } from "@/generated/prisma"

export type ProductCardData = Omit<Product, 'price' | 'publishedAt'> & {
  price: number
  publishedAt: string
  image: ProductImage | null
}
