import { ContactPerson } from "@/generated/prisma";
import Link from "next/link";

interface Props {
  person: ContactPerson
}

export default function ContactPersonCard( { person } : Props) {

  return (
    <div className="card card-subtle flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <h1 className="heading-1">{person.name}</h1>
  
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link href={`/admin/updateContact/${person.id}`} className="btn btn-outline">
           <p>Redigere</p>
          </Link>
          <button className="btn btn-error">Fjern</button>
        </div>
      </div>

      <div className="grid grid-cols-3">
        <div>
          <label className="label">Mail:</label>
          <p>{person.email}</p>
        </div>
        <div>
          <label className="label">Telefon:</label>
          <p>{person.phone}</p>
        </div>
        <div>
          <label className="label">Tittel:</label>
          <p>{person.title}</p>
        </div>
        
      </div>

    </div>
  )

}