
import { useRouter } from "next/navigation"

export default function BackBtn({handleOnClick, text}: {handleOnClick?: () => void; text?: string}) {
  const router = useRouter()
  return (
    <button
      type="button"
      onClick={handleOnClick ?? (() => router.back())}
      className="btn btn-outline px-3 text-sm cursor-pointer"
    >
      {text || '← Tilbake'}
    </button>  
  )
} 