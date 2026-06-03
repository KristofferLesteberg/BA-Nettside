"use client"
import { EducationField, Status } from "@/generated/prisma"
import { useEffect, useMemo, useState } from "react"
import { FaSliders, FaXmark } from "react-icons/fa6"
import ProjectCard, { type SerializedProject } from "./ProjectCard"
import ProjectDrawer from "./ProjectDrawer"
import PriceRange from "@/components/shared/input/price-range"
import { EDUCATION_FIELD_OPTIONS } from "@/app/lib/education-fields"
import { useSearchParams, useRouter } from "next/navigation"
import Pagination from "@/components/shared/Pagination"


export type ProjectStatus = Status | 'ALL'
export type SortOptions = 'NEWEST' | 'OLDEST' | 'PRICE_ASC' | 'PRICE_DESC'
export type Category = EducationField | 'ALL'

const STATUS_OPTIONS: { value: ProjectStatus, label: string}[] = [
  { value: 'ALL', label: "Alle" },
  { value: 'NEW', label: "Ny" },
  { value: 'IN_PROGRESS', label: "Pågående" },
  { value: 'COMPLETE', label: "Ferdig" }
]

const CATEGORY_OPTIONS: { value: Category; label: string }[] = [
  { value: 'ALL', label: 'Alle' },
  ...EDUCATION_FIELD_OPTIONS,
]

const SORT_OPTIONS: { value: SortOptions, label: string }[] = [
  { value: 'NEWEST', label: 'Nyeste' },
  { value: 'OLDEST', label: 'Eldste' },
]

const DEFAULT_MIN = 0
const DEFAULT_MAX = 500000

interface Props {
  projects: SerializedProject[]
}

export default function FilteredProjectGrid({ projects }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const status = (searchParams.get('status') as ProjectStatus) ?? 'ALL'
  const category = (searchParams.get('category') as Category) ?? 'ALL'
  const sort = (searchParams.get('sort') as SortOptions) ?? 'NEWEST'
  const minPrice = Number(searchParams.get('minPrice') ?? DEFAULT_MIN)
  const maxPrice = Number(searchParams.get('maxPrice') ?? DEFAULT_MAX)
  const [drawerOpen, setDrawerOpen] = useState(false)
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
    const categoryResult = projects.filter((project) => {
      if (category === 'ALL') return true
      return category === project.educationField
    })

    const statusResult = categoryResult.filter((project) => {
      if (status === 'ALL') return true
      return status === project.status
    })

    const priceActive = minPrice !== DEFAULT_MIN || maxPrice !== DEFAULT_MAX
    const priceRangeResult = statusResult.filter((project) => {
      if (!priceActive) return true
      return project.minPrice <= maxPrice && project.maxPrice >= minPrice
    })

    switch (sort) {
      case 'NEWEST': priceRangeResult.sort((a, b) => b.createdAt.localeCompare(a.createdAt)); break
      case 'OLDEST': priceRangeResult.sort((a, b) => a.createdAt.localeCompare(b.createdAt)); break
    }
    return priceRangeResult
  }, [status, category, minPrice, maxPrice, sort, projects])


  const currentPage = Number(searchParams.get('page') ?? '1')
  const pageSize = Number(searchParams.get('pageSize') ?? '10')
  const maxPage = Math.ceil(filtered.length / pageSize)
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const priceActive = minPrice !== DEFAULT_MIN || maxPrice !== DEFAULT_MAX
  const activeFilterCount = (status !== 'ALL' ? 1 : 0) + (category !== 'ALL' ? 1 : 0) + (priceActive ? 1 : 0)

  const controlPanel = (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className="label">Status</span>
        <div className="flex flex-col gap-1.5">
          {STATUS_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setFilter('status', opt.value)}
              className={`btn w-full justify-start ${status === opt.value ? "btn-primary" : "btn-outline"}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="label">Kategori</span>
        <div className="flex flex-col gap-1.5">
          {CATEGORY_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setFilter('category', opt.value)}
              className={`btn w-full justify-start ${category === opt.value ? "btn-primary" : "btn-outline"}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <PriceRange
        value={[minPrice, maxPrice]}
        onCommit={(lo, hi) => setFilters({ minPrice: String(lo), maxPrice: String(hi) })}
      />

      <hr className="border-border" />

      <div className="flex flex-col gap-2">
        <span className="label">Sorter</span>
        <div className="flex flex-col gap-1.5">
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setFilter('sort', opt.value)}
              className={`btn w-full justify-start ${sort === opt.value ? "btn-secondary" : "btn-outline"}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-border" />

      <button onClick={resetAllFilters} className="btn btn-outline w-full">
        Tilbakestill alle filtre
      </button>
    </div>
  )

  return (
    <>
    <div className="flex gap-8 items-start">

      <div className="flex-1 min-w-0 flex flex-col gap-4">
        <div className="flex items-center justify-between lg:hidden">
          <p className="small-text">
            {filtered.length} {filtered.length === 1 ? "prosjekt" : "prosjekter"}
          </p>
          <button onClick={() => setDrawerOpen(true)} className="btn btn-outline gap-2">
            <FaSliders />
            Filtre{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 small-text text-muted">
            <span>{filtered.length} prosjekter</span>
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
          {paginated.map((project) => (
            <ProjectCard project={project} key={project.id} onView={setSelectedProject} />
          ))}
        </div>
        <div className="mx-auto mt-10">
          <Pagination currentPage={currentPage} maxPages={maxPage} />
        </div>
      </div>

      <aside className="hidden lg:flex flex-col gap-0 w-56 shrink-0 sticky top-28 card">
        {controlPanel}
      </aside>

      <div
        onClick={() => setDrawerOpen(false)}
        className={`fixed inset-0 z-59 bg-black/40 lg:hidden transition-opacity duration-300 ${drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      <aside
        className={`fixed top-0 right-0 h-full w-72 z-60 bg-bg border-l border-border shadow-xl flex flex-col gap-0 overflow-y-auto lg:hidden transition-transform duration-300 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
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

    <ProjectDrawer project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  )
}
