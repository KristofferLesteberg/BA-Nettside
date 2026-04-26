
import { ContactPerson } from "@/generated/prisma";

type ContactFormData = Omit<ContactPerson, 'id' | 'products'>

export default function UpdateContact( {params }: { params: {id: number }}) {


  const handleUpdate = async (data: ContactFormData) => {

  }
  return (
    <>test</>
  )

}