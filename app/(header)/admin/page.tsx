export const dynamic = 'force-dynamic'
// Forces NextJS to not prerender this page statically
// Is useful since the DB file that NEXT tries to acces doesnt exist yet
// P.S. Claude - "ur welcome buddy".

import { Suspense } from 'react'
import AdminControlPanel from '@/components/admin/AdminControlPanel'
import AdminTabManager, { type AdminTab } from '@/components/admin/AdminTabManager'
import AdminProductsView from '@/components/admin/AdminProductsView'
import AdminProjectsView from '@/components/admin/Projects/AdminProjectsView'
import AdminReviewsView from '@/components/admin/AdminReviewsView'
import AdminContactPersonView from '@/components/admin/AdminContactPersonView'
import AdminOrderView from '@/components/admin/Orders/AdminOrderView'
import { getAllOrders } from '@/actions/orderProduct'
import { getAllProjects } from '@/actions/projects'
import { getAllProducts } from '@/actions/products'
import { getAllReviews } from '@/actions/reviews'
import { getAllContacts } from '@/actions/contact'

const page = async () => {
  const orders = (await getAllOrders()).length
  const projects = (await getAllProjects()).length
  const products = (await getAllProducts()).length
  const reviews = (await getAllReviews()).length
  const contactPersons = (await getAllContacts()).length
  
  const tabs: AdminTab[] = [
    {
      label: "produkter",
      content: <AdminProductsView />,
      count: products
    },
    {
      label: "prosjekter",
      content: <AdminProjectsView />,
      count: projects
    },
    {
      label: "anmeldelser",
      content: <AdminReviewsView />,
      count: reviews
    },
    {
      label: "kontakt personer",
      content: <AdminContactPersonView />,
      count: contactPersons
    },
    {
      label: "bestillinger",
      content: <AdminOrderView />,
      count: orders
    }
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