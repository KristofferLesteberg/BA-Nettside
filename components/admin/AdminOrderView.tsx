import { getAllOrders } from "@/actions/orderProduct"
import Link from "next/link"
import { HiOutlinePlusSm } from "react-icons/hi"
import OrderProductCard from './OrderProductCard'

export default async function Orders() {
  const orders = await getAllOrders()


  return (
     <div>
      <div className="flex flex-row justify-between">
        <h1 className="heading-1 mb-10">Bestillinger</h1>
      </div>
      <div>
        <div className="w-6xl ml-auto mr-auto grid grid-cols-1 gap-5">
        {orders.map((order, key) => (
          <OrderProductCard order={order} key={key}/>
        ))}
      </div>
      </div>
    </div>

  )
}