import sharp from "sharp"
import { randomUUID } from "crypto"
import { prisma } from "./prisma"
import path from "path"
import fs from "fs/promises"

const SUPPORTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
] as const

type SupportedMimeType = typeof SUPPORTED_TYPES[number]

function isSupportedType(type: string): type is SupportedMimeType {
  return SUPPORTED_TYPES.includes(type as SupportedMimeType)
}

export async function uploadProductImage(
  file: File, 
  productId: number, 
  sortOrder: number = 0,
  staticId?: string
) {
  if (!isSupportedType(file.type)) {
    throw new Error(`Unsupported image type: ${file.type}. Supported types: ${SUPPORTED_TYPES.join(", ")}`)
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const id = staticId ?? randomUUID()
  const outputPath = path.join(process.cwd(), "public", "images", `${id}.webp`)

  await fs.mkdir(path.dirname(outputPath), { recursive: true })

  await sharp(buffer)
    .webp({ quality: 80 })
    .toFile(outputPath)

  await prisma.productImage.create({
    data: { id, productId, sortOrder }
  })

  return id
}

export async function uploadProductImages(
  images: { id: string, file: File }[],
  productId: number
) {
  let sortOrder = 0;
  for (const img of images) {
    uploadProductImage(
      img.file,
      productId,
      sortOrder,
      img.id
    );
    sortOrder++;
  }
}

export async function changeProductImages(
  images: { id: string, file: File }[],
  productId: number
) {
  deleteAllProductImages(productId);
  let sortOrder = 0;
  for (const img of images) {
    uploadProductImage(
      img.file,
      productId,
      sortOrder,
      img.id
    );
    sortOrder++;
  }
}

export async function deleteProductImage(imageId: string) {
  const filePath = path.join(process.cwd(), "public", "images", `${imageId}.webp`)
  
  await fs.unlink(filePath)
  
  await prisma.productImage.delete({
    where: { id: imageId }
  })
}

export async function deleteAllProductImages(productId: number) {
  const images = await prisma.productImage.findMany({
    where: { productId: productId }
  })

  for (const image of images) {
    const filePath = path.join(process.cwd(), "public", "images", `${image.id}.webp`)
    await fs.unlink(filePath)
  }

  await prisma.productImage.deleteMany({
    where: { productId: productId }
  })
}

export async function getProductImages(productId: number) {
  const images = await prisma.productImage.findMany({
    where: { productId: productId },
    orderBy: { sortOrder: "asc" }
  })

  return images.map(img => ({
    id: img.id,
    url: `/images/${img.id}.webp`
  }))
}