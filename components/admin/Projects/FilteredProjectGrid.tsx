"use client"

import { EducationField, Status } from "@/generated/prisma"
import { useEffect, useMemo, useState } from "react"
import ProjectCard, { type SerializedProject } from "./ProjectCard"
import ProjectDrawer from "./ProjectDrawer"
import PriceRange from "@/components/shared/input/price-range"
import { EDUCATION_FIELD_OPTIONS, CATEGORY_TO_URL, CATEGORY_FROM_URL } from "@/app/lib/education-fields"
import { useSearchParams, useRouter } from "next/navigation"
import Pagination from "@/components/shared/Pagination"
import FilterPanel, { FilterOption } from "@/components/shared/FilterPanel"

export type ProjectStatus = Status | 'ALL'
export type SortOption = 'nyeste' | 'eldste'
export type Category = EducationField | 'ALL'

const STATUS_OPTIONS: { value: ProjectStatus; urlValue: string; label: string }[] = [
  { value: 'ALL',         urlValue: 'alle',     label: 'Alle' },
  { value: 'NEW',         urlValue: 'ny',       label: 'Ny' },
  { value: 'IN_PROGRESS', urlValue: 'pågående', label: 'Pågående' },
  { value: 'COMPLETE',    urlValue: 'ferdig',   label: 'Ferdig' },
]

const STATUS_FROM_URL: Record<string, ProjectStatus> = {
  alle:     'ALL',
  ny:       'NEW',
  pågående: 'IN_PROGRESS',
  ferdig:   'COMPLETE',
}

const CATEGORY_OPTIONS: { value: Category; urlValue: string; label: string }[] = [
  { value: 'ALL', urlValue: 'alle', label: 'Alle' },
  ...EDUCATION_FIELD_OPTIONS.map(o => ({ value: o.value, urlValue: CATEGORY_TO_URL[o.value], label: o.label })),
]

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'nyeste', label: 'Nyeste' },
  { value: 'eldste', label: 'Eldste' },
]

const DEFAULT_MIN = 0
const DEFAULT_MAX = 500000

interface Props {
  projects: SerializedProject[]
}

export default function FilteredProjectGrid({ projects }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const status = STATUS_FROM_URL[searchParams.get('status') ?? 'alle'] ?? 'ALL'
  const category = CATEGORY_FROM_URL[searchParams.get('category') ?? 'alle'] ?? 'ALL'
  const sort = (searchParams.get('sort') as SortOption) ?? 'nyeste'
  const minPrice = Number(searchParams.get('minPrice') ?? DEFAULT_MIN)
  const maxPrice = Number(searchParams.get('maxPrice') ?? DEFAULT_MAX)

  const [selectedProject, setSelectedProject] = useState<SerializedProject | null>(null)

  function setFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set(key, value)
    const qs = params.toString()
    const forStorage = new URLSearchParams(qs)
    forStorage.delete('tab')
    sessionStorage.setItem('tabFilters_prosjekter', forStorage.toString())
    router.replace('?' + qs)
  }

  function setFilters(pairs: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(pairs).forEach(([k, v]) => params.set(k, v))
    const qs = params.toString()
    const forStorage = new URLSearchParams(qs)
    forStorage.delete('tab')
    sessionStorage.setItem('tabFilters_prosjekter', forStorage.toString())
    router.replace('?' + qs)
  }

  function resetAllFilters() {
    const tab = searchParams.get('tab')
    const params = new URLSearchParams()
    if (tab) params.set('tab', tab)
    sessionStorage.removeItem('tabFilters_prosjekter')
    router.replace('?' + params.toString())
  }

  useEffect(() => {
    const hasFilters = ['status', 'category', 'sort', 'minPrice', 'maxPrice'].some(k => searchParams.get(k))
    if (!hasFilters) {
      const saved = sessionStorage.getItem('tabFilters_prosjekter')
      if (saved) router.replace('?' + saved + '&tab=prosjekter')
    }
  }, [])

  const filtered = useMemo(() => {
    const categoryResult = projects.filter(p => category === 'ALL' || p.educationField === category)
    const statusResult = categoryResult.filter(p => status === 'ALL' || p.status === status)
    const priceActive = minPrice !== DEFAULT_MIN || maxPrice !== DEFAULT_MAX
    const priceResult = statusResult.filter(p => {
      if (!priceActive) return true
      return p.minPrice <= maxPrice && p.maxPrice >= minPrice
    })
    if (sort === 'eldste') priceResult.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    else priceResult.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    return priceResult
  }, [status, category, minPrice, maxPrice, sort, projects])

  const currentPage = Number(searchParams.get('page') ?? '1')
  const pageSize = Number(searchParams.get('pageSize') ?? '10')
  const maxPage = Math.ceil(filtered.length / pageSize)
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const priceActive = minPrice !== DEFAULT_MIN || maxPrice !== DEFAULT_MAX
  const statusActiveCount = status !== 'ALL' ? 1 : 0
  const categoryActiveCount = category !== 'ALL' ? 1 : 0
  const priceActiveCount = priceActive ? 1 : 0
  const activeFilterCount = statusActiveCount + categoryActiveCount + priceActiveCount

  const categories = [
    {
      label: 'Status',
      activeCount: statusActiveCount,
      controls: STATUS_OPTIONS.map(opt => (
        <FilterOption
          key={opt.value}
          active={status === opt.value}
          onClick={() => setFilter('status', opt.urlValue)}
        >
          {opt.label}
        </FilterOption>
      )),
    },
    {
      label: 'Kategori',
      activeCount: categoryActiveCount,
      controls: CATEGORY_OPTIONS.map(opt => (
        <FilterOption
          key={opt.value}
          active={category === opt.value}
          onClick={() => setFilter('category', opt.urlValue)}
        >
          {opt.label}
        </FilterOption>
      )),
    },
    {
      label: 'Prisområde',
      activeCount: priceActiveCount,
      controls: (
        <div className="px-1 pt-1">
          <PriceRange
            value={[minPrice, maxPrice]}
            onCommit={(lo, hi) => setFilters({ minPrice: String(lo), maxPrice: String(hi) })}
          />
        </div>
      ),
    },
    {
      label: 'Sorter',
      controls: SORT_OPTIONS.map(opt => (
        <FilterOption
          key={opt.value}
          active={sort === opt.value}
          onClick={() => setFilter('sort', opt.value)}
        >
          {opt.label}
        </FilterOption>
      )),
    },
  ]

  return (
    <>
      <FilterPanel categories={categories} activeFilterCount={activeFilterCount} onReset={resetAllFilters}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 small-text text-muted">
              <span>{filtered.length} {filtered.length === 1 ? 'prosjekt' : 'prosjekter'}</span>
              <span>·</span>
              <span>Side {currentPage} av {maxPage}</span>
            </div>
            <select
              value={pageSize}
              onChange={e => setFilter('pageSize', e.target.value)}
              className="input w-auto py-1 text-sm cursor-pointer"
            >
              {[10, 20, 30, 40, 50].map(n => (
                <option key={n} value={n}>{n} per side</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-3">
            {paginated.map(project => (
              <ProjectCard project={project} key={project.id} onView={setSelectedProject} />
            ))}
          </div>
          <div className="mx-auto mt-10">
            <Pagination currentPage={currentPage} maxPages={maxPage} />
          </div>
        </div>
      </FilterPanel>
      <ProjectDrawer project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  )
}
