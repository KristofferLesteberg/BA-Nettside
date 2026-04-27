export const dynamic = 'force-dynamic'
// Forces NextJS to not prerender this page statically
// Is useful since the DB file that NEXT tries to acces doesnt exist yet
// P.S. Claude - "ur welcome buddy".

import { Suspense } from 'react'
import AdminControlPanel from '@/app/components/admin/AdminControlPanel'
import AdminTabManager, { type AdminTab } from '@/app/components/admin/AdminTabManager'
import AdminProductsView from '@/app/components/admin/AdminProductsView'
import AdminProjectsView from '../components/admin/AdminProjectsView'
import AdminReviewsView from '../components/admin/AdminReviewsView'

const page = async () => {
  const tabs: AdminTab[] = [
    {
      label: "Produkter",
      content: <AdminProductsView />,
    },
    {
      label: "Prosjekter",
      content: <AdminProjectsView />
    },
    {
      label: "Anmeldelser",
      content: <AdminReviewsView />
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-12 flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="heading-1">Admin</h1>
        <AdminControlPanel />
      </div>
      <Suspense>
        <AdminTabManager tabs={tabs} />
      </Suspense>
    </section>
  )
}

export default page
