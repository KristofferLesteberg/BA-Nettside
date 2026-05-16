import { getAllOrders } from "@/actions/orderProduct"

import FilteredOrdersGrid from "./FilteredOrdersGrid"
export default async function Orders() {
  const orders = await getAllOrders()
  return <FilteredOrdersGrid orders={orders} />
}