import { prisma } from "@/app/lib/prisma"
import Link from "next/link"
import { HiOutlinePlusSm } from 'react-icons/hi'


export default async function ContactPersonView() {
  const contactPersons = await prisma.contactPerson.findMany()

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1 className="heading-1">Kontakt person - {contactPersons.length}</h1>
        <div className="">
          <Link href={"/admin/newContact"} className="btn btn-primary gap-1.5">
            <HiOutlinePlusSm className="text-base" />
            Ny kontakt person
          </Link>
        </div>
      </div>
    </div>
    
    
  )

}