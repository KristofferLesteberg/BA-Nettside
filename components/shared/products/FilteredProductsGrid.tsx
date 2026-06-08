"use client"

import { useMemo, useEffect } from 'react'
import type { ProductCardData } from '@/app/lib/types'
import ProductsGrid from './ProductsGrid'
import { EducationField } from '@/generated/prisma'
import { EDUCATION_FIELD_OPTIONS, CATEGORY_TO_URL, CATEGORY_FROM_URL } from '@/app/lib/education-fields'
import { useSearchParams, useRouter } from 'next/navigation'
import Pagination from '../Pagination'
import FilterPanel, { FilterOption } from '@/components/shared/FilterPanel'

export type SortOption = 'newest' | 'oldest' | 'price-asc' | 'price-desc'
export type CategoryFilter = EducationField | 'ALL'
export type StatusFilter = 'ALL' | 'DRAFT' | 'PUBLISHED'

const SORT_FROM_URL: Record<string, SortOption> = {
  nyeste:     'newest',
  eldste:     'oldest',
  'pris-opp': 'price-asc',
  'pris-ned': 'price-desc',
}

const STATUS_FROM_URL: Record<string, StatusFilter> = {
  alle:      'ALL',
  utkast:    'DRAFT',
  publisert: 'PUBLISHED',
}

const STATUS_TO_URL: Record<StatusFilter, string> = {
  ALL:       'alle',
  DRAFT:     'utkast',
  PUBLISHED: 'publisert',
}

const STATUS_OPTIONS: { value: StatusFilter; urlValue: string; label: string }[] = [
  { value: 'ALL',       urlValue: 'alle',      label: 'Alle' },
  { value: 'DRAFT',     urlValue: 'utkast',    label: 'Utkast' },
  { value: 'PUBLISHED', urlValue: 'publisert', label: 'Publisert' },
]

const CATEGORY_OPTIONS: { value: CategoryFilter; urlValue: string; label: string }[] = [
  { value: 'ALL', urlValue: 'alle', label: 'Alle' },
  ...EDUCATION_FIELD_OPTIONS.map(o => ({ value: o.value, urlValue: CATEGORY_TO_URL[o.value], label: o.label })),
]

const SORT_OPTIONS: { value: SortOption; urlValue: string; label: string }[] = [
  { value: 'newest',     urlValue: 'nyeste',   label: 'Nyeste' },
  { value: 'oldest',     urlValue: 'eldste',   label: 'Eldste' },
  { value: 'price-asc',  urlValue: 'pris-opp', label: 'Pris ↑' },
  { value: 'price-desc', urlValue: 'pris-ned', label: 'Pris ↓' },
]

interface Props {
  products: ProductCardData[]
  isAdmin: boolean
  headerAction?: React.ReactNode
}

export default function FilteredProductsGrid({ products, isAdmin, headerAction }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const categoryParam = searchParams.get('linje') ?? 'alle'
  const selectedCategories: EducationField[] = categoryParam === 'alle'
    ? []
    : categoryParam.split(',').map(v => CATEGORY_FROM_URL[v]).filter((v): v is EducationField => !!v && v !== 'ALL')

  const statusParam = searchParams.get('status') ?? 'alle'
  const selectedStatuses: Array<'DRAFT' | 'PUBLISHED'> = (!isAdmin || statusParam === 'alle')
    ? []
    : statusParam.split(',').map(v => STATUS_FROM_URL[v]).filter((v): v is 'DRAFT' | 'PUBLISHED' => !!v && v !== 'ALL')

  const sort = SORT_FROM_URL[searchParams.get('sort') ?? 'nyeste'] ?? 'newest'

  useEffect(() => {
    const hasFilters = ['linje', 'status', 'sort', 'sideAntall'].some(k => searchParams.get(k))
    if (!hasFilters) {
      const saved = sessionStorage.getItem('tabFilters_produkter')
      if (saved) {
        const params = new URLSearchParams(saved)
        if (!isAdmin) params.delete('status')
        router.replace('?' + params.toString() + '&tab=produkter')
      }
    }
  }, [])

  function toggleStatus(opt: StatusFilter) {
    if (opt === 'ALL') { setFilter('status', 'alle'); return }
    const next = selectedStatuses.includes(opt as 'DRAFT' | 'PUBLISHED')
      ? selectedStatuses.filter(s => s !== opt)
      : [...selectedStatuses, opt as 'DRAFT' | 'PUBLISHED']
    setFilter('status', next.length === 0 ? 'alle' : next.map(s => STATUS_TO_URL[s]).join(','))
  }

  function toggleCategory(opt: CategoryFilter) {
    if (opt === 'ALL') { setFilter('linje', 'alle'); return }
    const next = selectedCategories.includes(opt as EducationField)
      ? selectedCategories.filter(c => c !== opt)
      : [...selectedCategories, opt as EducationField]
    setFilter('linje', next.length === 0 ? 'alle' : next.map(c => CATEGORY_TO_URL[c]).join(','))
  }

  function setFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set(key, value)
    params.set('side', '1')
    const qs = params.toString()
    const forStorage = new URLSearchParams(qs)
    forStorage.delete('tab')
    sessionStorage.setItem('tabFilters_produkter', forStorage.toString())
    router.replace('?' + qs)
  }

  const filtered = useMemo(() => {
    const base = isAdmin ? products : products.filter(p => !p.draft)
    const statusResult = base.filter(p => {
      if (selectedStatuses.length === 0) return true
      return selectedStatuses.some(s => p.draft === (s === 'DRAFT'))
    })
    const result = statusResult.filter(p => {
      if (selectedCategories.length === 0) return true
      return p.educationField !== null && selectedCategories.includes(p.educationField as EducationField)
    })
    switch (sort) {
      case 'newest':     result.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)); break
      case 'oldest':     result.sort((a, b) => a.publishedAt.localeCompare(b.publishedAt)); break
      case 'price-asc':  result.sort((a, b) => a.price - b.price); break
      case 'price-desc': result.sort((a, b) => b.price - a.price); break
    }
    return result
  }, [products, selectedCategories, sort, selectedStatuses])

  const currentPage = Number(searchParams.get('side') ?? '1')
  const pageSize = Number(searchParams.get('sideAntall') ?? '10')
  const maxPage = Math.ceil(filtered.length / pageSize)
  
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const categoryActiveCount = selectedCategories.length
  const statusActiveCount = selectedStatuses.length
  const activeFilterCount = categoryActiveCount + (isAdmin ? statusActiveCount : 0)

  const categories = [
    ...(isAdmin ? [{
      label: 'Status',
      activeCount: statusActiveCount,
      controls: STATUS_OPTIONS.map(opt => (
        <FilterOption
          key={opt.value}
          active={opt.value === 'ALL' ? selectedStatuses.length === 0 : selectedStatuses.includes(opt.value as 'DRAFT' | 'PUBLISHED')}
          onClick={() => toggleStatus(opt.value)}
        >
          {opt.label}
        </FilterOption>
      )),
    }] : []),
    {
      label: 'Linje',
      activeCount: categoryActiveCount,
      controls: CATEGORY_OPTIONS.map(opt => (
        <FilterOption
          key={opt.value}
          active={opt.value === 'ALL' ? selectedCategories.length === 0 : selectedCategories.includes(opt.value as EducationField)}
          onClick={() => toggleCategory(opt.value)}
        >
          {opt.label}
        </FilterOption>
      )),
    },
    {
      label: 'Sorter',
      controls: SORT_OPTIONS.map(opt => (
        <FilterOption
          key={opt.value}
          active={sort === opt.value}
          onClick={() => setFilter('sort', opt.urlValue)}
        >
          {opt.label}
        </FilterOption>
      )),
    },
  ]

  return (
    <FilterPanel categories={categories} activeFilterCount={activeFilterCount}>
      {headerAction && (
        <div className="flex justify-end">
          {headerAction}
        </div>
      )}
      {filtered.length > 0 ? (
        <>
          <div className="flex items-center justify-between px-3 py-2 rounded-sm">
            <div className="flex items-center gap-2 small-text text-muted">
              <span>{filtered.length} {filtered.length === 1 ? 'produkt' : 'produkter'}</span>
              <span>·</span>
              <span>Side {currentPage} av {maxPage}</span>
            </div>
            <select
              value={pageSize}
              onChange={e => setFilter('sideAntall', e.target.value)}
              className="input w-auto py-1 text-sm cursor-pointer"
            >
              {[10, 20, 30, 40, 50].map(n => (
                <option key={n} value={n}>{n} per side</option>
              ))}
            </select>
          </div>
          <ProductsGrid products={paginated} isAdmin={isAdmin} />
          <div className="mx-auto mt-10">
            <Pagination currentPage={currentPage} maxPages={maxPage} />
          </div>
        </>
      ) : (
        <p className="mx-auto">Ingen produkter funnet</p>
      )}
    </FilterPanel>
  )
}
