"use client"

import { useState, useMemo } from 'react'
import type { ProductCardData } from '@/app/lib/types'
import ProductsGrid from './ProductsGrid'
import { EducationField } from '@/generated/prisma'
import { FaSliders, FaXmark } from 'react-icons/fa6'


export type SortOption = 'newest' | 'oldest' | 'price-asc' | 'price-desc'
export type CategoryFilter = EducationField | 'ALL'// Allows for future changes in EducationField variations with no big tweaks
export type StatusFilter = 'ALL' | 'DRAFT' | 'PUBLISHED'
interface Props {
  products: ProductCardData[]
  isAdmin: boolean
  sidebarAction?: React.ReactNode
  extraControls?: React.ReactNode
  extraFilters?: ((p: ProductCardData) => boolean)[]
}

const STATUS_OPTIONS: { value: StatusFilter; label: string; }[] = [
  { value: 'ALL', label: 'Alle' },
  { value: 'DRAFT', label: 'Utkast'},
  { value: 'PUBLISHED', label: 'Publisert' }
]
const CATEGORY_OPTIONS: { value: CategoryFilter; label: string }[] = [
  { value: 'ALL',          label: 'Alle'   },
  { value: 'BUILDING',     label: 'Bygg'   },
  { value: 'CONSTRUCTION', label: 'Anlegg' },
]

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest',     label: 'Nyeste' },
  { value: 'oldest',     label: 'Eldste' },
  { value: 'price-asc',  label: 'Pris ↑' },
  { value: 'price-desc', label: 'Pris ↓' },
]

export default function FilteredProductsGrid({ products, isAdmin, sidebarAction, extraControls, extraFilters = [] }: Props) {
  const [category, setCategory] = useState<CategoryFilter>('ALL')
  const [sort, setSort] = useState<SortOption>('newest')
  const [status, setStatus] = useState<StatusFilter>('ALL')
  const [drawerOpen, setDrawerOpen] = useState(false)



  const filtered = useMemo(() => {
    const statusResult = products.filter(p => {
      const productDraft = status === 'DRAFT' ? true : false
      if (status !== 'ALL' && p.draft !== productDraft) return false
      return true
    })

    const result = statusResult.filter(p => {
      if (category !== 'ALL' && p.educationField !== category) return false
      for (const fn of extraFilters) if (!fn(p)) return false
      return true
    })

    switch (sort) {
      case 'newest':     result.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)); break
      case 'oldest':     result.sort((a, b) => a.publishedAt.localeCompare(b.publishedAt)); break
      case 'price-asc':  result.sort((a, b) => a.price - b.price); break
      case 'price-desc': result.sort((a, b) => b.price - a.price); break
    }

    return result
  }, [products, category, sort, extraFilters, status])

  const activeFilterCount = category !== 'ALL' ? 1 : 0

  const controlPanel = (
    <div className="flex flex-col gap-5">      
    {isAdmin && (
       <div className='flex flex-col gap-2'>
        <span className='label'>Produkt status</span>
        <div className='flex flex-col gap-1.5'>
          {STATUS_OPTIONS.map((stat) => (
            <button
              key={stat.value}
              onClick={() => setStatus(stat.value)}
              className={`btn w-full justify-start ${status === stat.value ? 'btn-primary' : 'btn-outline'}`}
              >
              {stat.label}
            </button>

          ))}
        </div>
        
      </div>
    )}
    {isAdmin && (
       <hr className='border-border' />
    )}
    
    

      <div className="flex flex-col gap-2">
        <span className="label">Kategori</span>
        <div className="flex flex-col gap-1.5">
          {CATEGORY_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setCategory(opt.value)}
              className={`btn w-full justify-start ${category === opt.value ? 'btn-primary' : 'btn-outline'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-border" />

      <div className="flex flex-col gap-2">
        <span className="label">Sorter</span>
        <div className="flex flex-col gap-1.5">
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setSort(opt.value)}
              className={`btn w-full justify-start ${sort === opt.value ? 'btn-secondary' : 'btn-outline'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {extraControls && (
        <>
          <hr className="border-border" />
          <div className="flex flex-col gap-2">
            <span className="label">Ekstra</span>
            <div className="flex flex-col gap-1.5">{extraControls}</div>
          </div>
        </>
      )}

    </div>
  )

  return (
    <div className="flex gap-8 items-start">

      {/* Grid area */}
      <div className="flex-1 min-w-0 flex flex-col gap-4">

        {/* Mobile controls — hidden on desktop */}
        <div className="flex flex-col gap-2 lg:hidden">
          {sidebarAction}
          <div className="flex items-center justify-between">
            <p className="small-text">{filtered.length} {filtered.length === 1 ? 'produkt' : 'produkter'}</p>
            <button onClick={() => setDrawerOpen(true)} className="btn btn-outline gap-2">
              <FaSliders />
              Filtre{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
            </button>
          </div>
        </div>

        <ProductsGrid products={filtered} isAdmin={isAdmin} />
      </div>

      {/* Desktop sidebar — hidden on mobile */}
      <aside className="hidden lg:flex flex-col gap-0 w-56 shrink-0 sticky top-28 card">
        {sidebarAction && (
          <>
            {sidebarAction}
            <hr className="border-border my-5" />
          </>
        )}
        {controlPanel}
      </aside>

      {/* Mobile backdrop */}
      <div
        onClick={() => setDrawerOpen(false)}
        className={`fixed inset-0 z-59 bg-black/40 lg:hidden transition-opacity duration-300 ${drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Mobile drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 z-60 bg-bg border-l border-border shadow-xl flex flex-col gap-0 overflow-y-auto lg:hidden transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-bg">
          <h2 className="heading-4">Filtre</h2>
          <button onClick={() => setDrawerOpen(false)} className="btn btn-ghost w-8 h-8 p-0">
            <FaXmark />
          </button>
        </div>
        <div className="p-5 flex-1">
          {controlPanel}
        </div>
      </aside>

    </div>
  )
}
