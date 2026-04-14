import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../lib/prisma"
import {
  uploadProductImage,
  deleteProductImage,
  getProductImages
} from "../../lib/images"

const TEST_PRODUCT_ID = 1

// Ensure test product exists — no-op if already created
async function ensureTestProduct() {
  await prisma.product.upsert({
    where: { id: TEST_PRODUCT_ID },
    update: {},
    create: {
      id: TEST_PRODUCT_ID,
      title: "Test Product",
      description: "Auto-created for image testing",
      price: 0,
      amount: 0,
      educationField: "BUILDING",
    },
  })
}

// GET — fetch all images for the test product
export async function GET() {
  await ensureTestProduct()
  const images = await getProductImages(TEST_PRODUCT_ID)
  return NextResponse.json(images)
}

// POST — upload an image for the test product
export async function POST(req: NextRequest) {
  await ensureTestProduct()

  const formData = await req.formData()
  const file = formData.get("file")

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 })
  }

  try {
    const id = await uploadProductImage(file, TEST_PRODUCT_ID)
    return NextResponse.json({ id })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed"
    return NextResponse.json({ error: message }, { status: 400 })
  }
}

// DELETE — delete a single image by id
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "No id provided" }, { status: 400 })
  }

  try {
    await deleteProductImage(id)
    return NextResponse.json({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Delete failed"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}