
import { useRouter } from "next/navigation"
import { FaArrowAltCircleLeft } from "react-icons/fa";

export default function RegretBtn({ isAdmin }: {isAdmin: boolean}) {
  const router = useRouter()

  const handleButton = () => {
    if(isAdmin) {
      router.push("/admin")
    } else {
      router.push("/")
    }
  }
  return (
    <button className="btn btn-primary" onClick={handleButton}><FaArrowAltCircleLeft /></button>

  )

}