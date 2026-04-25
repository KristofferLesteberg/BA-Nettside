"use client"

import { useState, useMemo } from 'react'
import type { ProductCardData } from '@/app/lib/types'
import ProductsGrid from '@/app/components/product/ProductsGrid'

import { EducationField } from '@/generated/prisma'

export type SortOption = 'newest' | 'oldest' | 'price-asc' | 'price-desc'
export type CategoryFilter = EducationField | 'ALL' // Allows for future changes in EducationFiled variations with no big tweaks


interface Props {
  products: ProductCardData[]
  isAdmin: boolean
  extraControls?: React.ReactNode
  extraFilters?: ((p: ProductCardData) => boolean)[]
}

export default function FilteredProductsGrid({ products, isAdmin, extraControls, extraFilters = [] }: Props) {
  const [category, setCategory] = useState<CategoryFilter>('ALL')
  const [sort, setSort] = useState<SortOption>('newest')

  const filtered = useMemo(() => {
    const result = products.filter(p => {
      if (category !== 'ALL' && p.educationField !== category) return false
      for (const fn of extraFilters) if (!fn(p)) return false
      return true
    })

    switch (sort) {
      case 'newest':  result.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)); break
      case 'oldest':  result.sort((a, b) => a.publishedAt.localeCompare(b.publishedAt)); break
      case 'price-asc':  result.sort((a, b) => a.price - b.price); break
      case 'price-desc': result.sort((a, b) => b.price - a.price); break
    }

    return result
  }, [products, category, sort, extraFilters])

  return (
    <div>
      <div className="flex gap-2 flex-wrap items-center mb-4">
        <button onClick={() => setCategory('ALL')}          className={`btn ${category === 'ALL'          ? 'btn-primary' : 'btn-outline'}`}>Alle</button>
        <button onClick={() => setCategory('BUILDING')}     className={`btn ${category === 'BUILDING'     ? 'btn-primary' : 'btn-outline'}`}>Bygg</button>
        <button onClick={() => setCategory('CONSTRUCTION')} className={`btn ${category === 'CONSTRUCTION' ? 'btn-primary' : 'btn-outline'}`}>Anlegg</button>

        <span className="border-l h-6 mx-1" />

        <button onClick={() => setSort('newest')}     className={`btn ${sort === 'newest'     ? 'btn-secondary' : 'btn-outline'}`}>Nyeste</button>
        <button onClick={() => setSort('oldest')}     className={`btn ${sort === 'oldest'     ? 'btn-secondary' : 'btn-outline'}`}>Eldste</button>
        <button onClick={() => setSort('price-asc')}  className={`btn ${sort === 'price-asc'  ? 'btn-secondary' : 'btn-outline'}`}>Pris ↑</button>
        <button onClick={() => setSort('price-desc')} className={`btn ${sort === 'price-desc' ? 'btn-secondary' : 'btn-outline'}`}>Pris ↓</button>

        {extraControls}
      </div>

      <ProductsGrid products={filtered} isAdmin={isAdmin} />
    </div>
  )
}
