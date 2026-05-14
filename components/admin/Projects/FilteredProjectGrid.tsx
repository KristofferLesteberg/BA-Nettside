"use client"
import { EducationField, Status } from "@/generated/prisma"
import { useMemo, useState } from "react"
import ProjectCard, { type SerializedProject } from "./ProjectCard"


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

]

const SORT_OPTIONS: { value: SortOptions, label: string }[] = [

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

  const filtered = useMemo(() => {
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
      if(minPrice === 0 && maxPrice === 50000) return true
      if(Number(project.minPrice) > minPrice || Number(project.maxPrice) < maxPrice) return true
      return false
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


  const filters = (
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
    <div>

      {filters}
      <div>
        {filtered.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>
    </div>
  )
}