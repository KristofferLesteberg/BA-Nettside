import { getAllOrders } from "@/actions/orderProduct"

import FilteredOrdersGrid from "./Orders/FilteredOrdersGrid"

export default async function Orders() {
  const orders = await getAllOrders()


  return (
     <div>
      <div className="flex flex-row justify-between">
        <h1 className="heading-1 mb-10">Bestillinger</h1>
      </div>
      <div>
        <FilteredOrdersGrid orders={orders} />
        <div className="w-6xl ml-auto mr-auto grid grid-cols-1 gap-5">
  
      </div>
      </div>
    </div>

  )
}