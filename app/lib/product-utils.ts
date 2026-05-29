export function isProductPublishable(product: {
  educationField?: string | null
  title?: string | null
  description?: string | null
}): boolean {
  return !!product.educationField && !!product.title?.trim() && !!product.description?.trim()
}

export function formatPrice(price: number | string): string {
  return `NOK ${Number(price).toLocaleString('nb-NO')}`
}
