"use client"
import { EducationField, Status } from "@/generated/prisma"
import { useMemo, useState } from "react"
import { FaSliders, FaXmark } from "react-icons/fa6"
import ProjectCard, { type SerializedProject } from "./ProjectCard"
import PriceRange from "@/components/shared/input/price-range"


export type ProjectStatus = Status | 'ALL'
export type SortOptions = 'NEWEST' | 'OLDEST' | 'PRICE_ASC' | 'PRICE_DESC'
export type Category = EducationField | 'ALL'
export type PriceOptions = 'MAX_PRICE' | 'MIN_PRICE'

const STATUS_OPTIONS: { value: ProjectStatus, label: string}[] = [
  { value: 'ALL', label: "Alle" },
  { value: 'NEW', label: "Ny" },
  { value: 'IN_PROGRESS', label: "Pågående" },
  { value: 'COMPLETE', label: "Ferdig" }
]

const CATEGORY_OPTIONS: { value: Category, label: string }[] = [
  { value: 'ALL', label: 'Alle' },
  { value: 'BUILDING', label: 'Bygg' },
  { value: 'CONSTRUCTION', label: 'Anlegg' },
]

const SORT_OPTIONS: { value: SortOptions, label: string }[] = [
  { value: 'NEWEST', label: 'Nyeste' },
  { value: 'OLDEST', label: 'Eldste' },
]

const PRICE_OPTIONS: { value: PriceOptions, label: string }[] = [
  { value: 'MAX_PRICE', label: "Maks pris" },
  { value: 'MIN_PRICE', label: "Minimum pris"}
]

interface Props {
  projects: SerializedProject[]
}

export default function FilteredProjectGrid({ projects }: Props) {

  const [status, setStatus] = useState<ProjectStatus>('ALL')
  const [category, setCategory] = useState<Category>('ALL')
  const [sort, setSort] = useState<SortOptions>('NEWEST')
  const [minPrice, setMinPrice] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(500000)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const filtered = useMemo(() => {
    console.log("Minpris" + minPrice)
    console.log("Maxpris" + maxPrice)
    const categoryResult = projects.filter((project) => {
      if(category === 'ALL') return true
      if(category !== project.educationField) return false
      return true
    })

    const statusResult = categoryResult.filter((project) => {
      if(status === 'ALL') return true
      if(status !== project.status) return false
      return true
    })

    const priceRangeResult = statusResult.filter((project) => {
      if(minPrice === 0 && maxPrice === 500000) return true
      if(Number(project.minPrice) > minPrice) return false
      if(Number(project.maxPrice) < maxPrice) return false
      return true
    })
/*
    switch(sort) {
      case 'NEWEST':     priceRangeResult.sort((a, b) => b.createdAt.localeCompare(a.createdAt)); break
      case 'OLDEST':     priceRangeResult.sort((a, b) => a.createdAt.localeCompare(b.createdAt)); break
      case 'PRICE_ASC':  priceRangeResult.sort((a, b) => a.minPrice - b.minPrice); break
      case 'PRICE_DESC': priceRangeResult.sort((a, b) => b. - a.price); break
    }
      */

    return priceRangeResult
  }, [status, category, minPrice, maxPrice, sort, projects])


  const activeFilterCount = (status !== 'ALL' ? 1 : 0) + (category !== 'ALL' ? 1 : 0)
  const controlPanel = (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className="label">Status</span>
        <div className="flex flex-col gap-1.5">
          {STATUS_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setStatus(opt.value)}
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
              onClick={() => setCategory(opt.value)}
              className={`btn w-full justify-start ${category === opt.value ? "btn-primary" : "btn-outline"}`}
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
              className={`btn w-full justify-start ${sort === opt.value ? "btn-secondary" : "btn-outline"}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      
    </div>
  )

  return (
    <>
     <div className="flex flex-col gap-2">
        <span className="label">Pris</span>
        <PriceRange min={minPrice.toString()} max={maxPrice.toString()} onChange={(lo, hi) => { setMinPrice(Number(lo)); setMaxPrice(Number(hi)) }} />
      </div>
    
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

        <div className="flex flex-col gap-5">
          {filtered.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
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
    </ >
  )
}