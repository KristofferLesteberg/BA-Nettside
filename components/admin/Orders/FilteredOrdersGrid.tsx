import { ProductOrder } from "@/generated/prisma"
import { Status } from "@/generated/prisma"

interface Props {
  orders: ProductOrder
}

export type OrderStatus = Status | 'ALL'

const STATUS_OPTIONS: { value: OrderStatus, label: string }[] = [
    { value: 'NEW', label: 'Ny'},
    { value: 'IN_PROGRESS', label: 'I Kontakt'},
    { value: 'COMPLETE', label: 'Ferdig'},
    { value: 'ALL', label: 'Alle'} 
  ]

export default function FilteredOrdersGrid( ) {


  

  return (
    <div></div>
  )
}