
import { useRouter } from "next/navigation"
import { FaArrowAltCircleLeft } from "react-icons/fa";

export default function RegretBtn() {
  const router = useRouter()

  return (
    <button type='button' className="btn btn-primary" onClick={() => router.back()}><FaArrowAltCircleLeft /></button>
  )
} 