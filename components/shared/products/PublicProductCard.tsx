import type { ProductCardData } from "@/app/lib/types"
import Image from 'next/image'
import Link from 'next/link'
import { EDUCATION_FIELD_LABELS } from "@/app/lib/education-fields"
import { formatPrice } from "@/app/lib/product-utils"

const FIELD_BADGE: Record<string, string> = {
  PLUMBER:      'badge-secondary',
  CONCRETE:     'badge-neutral',
  CARPENTER:    'badge-info',
  CONSTRUCTION: 'badge-primary',
}

interface Props {
  product: ProductCardData
  priority?: boolean
}

export default function PublicProductCard({ product, priority }: Props) {
  return (
    <Link
      href={`/produkter/${product.id}`}
      className="card group flex flex-col p-0 hover:border-primary transition-colors duration-200 hover:shadow-md"
    >
      <div className="relative w-full aspect-4/3 overflow-hidden rounded-t-lg bg-surface">
        {product.image ? (
          <Image
            src={`/images/${product.image.id}.webp`}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            priority={priority}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center small-text text-muted">
            Ingen bilde
          </div>
        )}

        {product.educationField && (
          <span className={`badge ${FIELD_BADGE[product.educationField]} absolute top-2 left-2`}>
            {EDUCATION_FIELD_LABELS[product.educationField]}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3 p-4">
        <span className="heading-4 group-hover:text-primary transition-colors duration-150 leading-snug">
          {product.title}
        </span>

        <div className="flex items-center justify-between">
          <span className="font-semibold text-text">
            {formatPrice(product.price)}
          </span>
          {product.amount > 0 ? (
            <span className="badge badge-neutral">{product.amount} stk</span>
          ) : (
            <span className="badge badge-error">Utsolgt</span>
          )}
        </div>
      </div>
    </Link>
  )
}
