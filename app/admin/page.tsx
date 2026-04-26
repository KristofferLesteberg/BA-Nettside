import AdminControlPanel from '@/app/components/admin/AdminControlPanel'
import AdminTabManager, { type AdminTab } from '@/app/components/admin/AdminTabManager'
import AdminProductsView from '@/app/components/admin/AdminProductsView'
import AdminProjectsView from '../components/admin/AdminProjectsView'

const page = async () => {
  const tabs: AdminTab[] = [
    {
      label: "Produkter",
      content: <AdminProductsView />,
    },
    {
      label: "Prosjekter",
      content: <AdminProjectsView />
    }
    // Add more tabs here as admin sections are built out:
    // { label: "Prosjekter", content: <AdminProjectsView /> },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-12 flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="heading-1">Admin</h1>
        <AdminControlPanel />
      </div>
      <AdminTabManager tabs={tabs} />
    </section>
  )
}

export default page
