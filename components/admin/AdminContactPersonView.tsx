import { prisma } from "@/app/lib/prisma"
import Link from "next/link"
import { HiOutlinePlusSm } from 'react-icons/hi'
import ContactPersonCard from "./ContactPersonCard"


export default async function ContactPersonView() {
  const contactPersons = await prisma.contactPerson.findMany()

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1 className="heading-1 mb-10">Kontakt personer - {contactPersons.length}</h1>
        <div className="">
          <Link href={"/admin/ny-kontakt"} className="btn btn-primary gap-1.5">
            <HiOutlinePlusSm className="text-base" />
            Ny kontakt person
          </Link>
        </div>
      </div>
      <div>
        <div className="w-6xl ml-auto mr-auto grid grid-cols-1 gap-5">
        {contactPersons.map((project) => (
          <ContactPersonCard person={project} key={project.id} />
        ))}
      </div>

      </div>
    </div>
    
    
  )

}