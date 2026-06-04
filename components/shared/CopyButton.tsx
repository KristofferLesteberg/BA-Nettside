import { useEffect, useState } from "react"

import { IconCopy, IconCheck } from "@/app/lib/icons";

export default function CopyButton ({valueToCopy}: {valueToCopy: string}) {
  const [copied, setCopied] = useState<boolean>(false)

  async function writeClipboardText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error: any) {
      console.error(error.message);
      return false;
    }
  }

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 3000)
    return () => {
      clearTimeout(timer);
    }
  }, [copied])

  return (
    <button
      type="button"
      aria-label={copied ? "Kopiert!" : "Kopier"}
      aria-live="polite"
      className="btn btn-icon relative"
      onClick={() => {
        writeClipboardText(valueToCopy).then((success) => {
          if (success) setCopied(true);
        });
      }}
    >
      <span className={`transition-opacity duration-150 ${copied ? "opacity-0" : "opacity-100"}`}>
        <IconCopy aria-hidden="true" />
      </span>
      <span className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${copied ? "opacity-100" : "opacity-0"}`}>
        <IconCheck aria-hidden="true" />
      </span>
    </button>
  )
}