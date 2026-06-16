import fs from "fs/promises"
import path from "path"
import type { NextRequest } from "next/server"

const IMAGES_DIR = path.join(process.cwd(), "images")
const FILENAME_PATTERN = /^[a-zA-Z0-9-]+\.webp$/

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  if (!FILENAME_PATTERN.test(id)) {
    return new Response("Not found", { status: 404 })
  }

  try {
    const buffer = await fs.readFile(path.join(IMAGES_DIR, id))
    return new Response(buffer, {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch {
    return new Response("Not found", { status: 404 })
  }
}
