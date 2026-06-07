import { getAllContacts } from "@/actions/contact"
import Link from "next/link"
import { IconPlus } from '@/app/lib/icons'
import ContactPersonCard from "./ContactPersonCard"


export default async function ContactPersonView() {
  const contactPersons = await getAllContacts()

  return (
    <div>
      <div className="flex flex-row justify-between mb-10">
      <div></div>
        <div className="">
          <Link href={"/admin/ny-kontakt"} className="btn btn-primary gap-1.5">
            <IconPlus className="text-base" />
            Ny kontakt person
          </Link>
        </div>
      </div>
      <div>
        <div className="w-full grid grid-cols-1 gap-3">
        {contactPersons.map((project) => (
          <ContactPersonCard person={project} key={project.id} />
        ))}
      </div>

      </div>
    </div>
    
    
  )

}