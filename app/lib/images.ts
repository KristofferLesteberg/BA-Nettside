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

const IMAGES_DIR = path.join(process.cwd(), "images")

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
  const outputPath = path.join(IMAGES_DIR, `${id}.webp`)

  await fs.mkdir(IMAGES_DIR, { recursive: true })

  await sharp(buffer)
    .resize(2000, 2000, { fit: "inside", withoutEnlargement: true })
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
    await uploadProductImage(
      img.file,
      productId,
      sortOrder,
      img.id
    );
    sortOrder++;
  }
}

export async function syncProductImages(
  orderedIds: string[],
  newFiles: File[],
  productId: number
) {
  const current = await prisma.productImage.findMany({ where: { productId } })
  const currentIdSet = new Set(current.map(img => img.id))
  const keepSet = new Set(orderedIds)

  for (const img of current) {
    if (!keepSet.has(img.id)) {
      await deleteProductImage(img.id)
    }
  }

  let fileIndex = 0
  for (let i = 0; i < orderedIds.length; i++) {
    const imgId = orderedIds[i]
    if (currentIdSet.has(imgId)) {
      await prisma.productImage.update({
        where: { id: imgId },
        data: { sortOrder: i }
      })
    } else {
      const file = newFiles[fileIndex++]
      if (file) {
        await uploadProductImage(file, productId, i, imgId)
      }
    }
  }
}

export async function deleteProductImage(imageId: string) {
  await fs.unlink(path.join(IMAGES_DIR, `${imageId}.webp`)).catch(() => {})

  await prisma.productImage.delete({
    where: { id: imageId }
  })
}

export async function deleteAllProductImages(productId: number) {
  const images = await prisma.productImage.findMany({
    where: { productId: productId }
  })

  for (const image of images) {
    await fs.unlink(path.join(IMAGES_DIR, `${image.id}.webp`)).catch(() => {})
  }

  await prisma.productImage.deleteMany({
    where: { productId: productId }
  })
}

export async function uploadReviewImage(file: File, staticId?: string): Promise<string> {
  if (!isSupportedType(file.type)) {
    throw new Error(`Unsupported image type: ${file.type}. Supported types: ${SUPPORTED_TYPES.join(", ")}`)
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const id = staticId ?? randomUUID()
  const outputPath = path.join(IMAGES_DIR, `${id}.webp`)

  await fs.mkdir(IMAGES_DIR, { recursive: true })

  await sharp(buffer)
    .resize(400, 400, { fit: "cover", position: "center" })
    .webp({ quality: 85 })
    .toFile(outputPath)

  return id
}

export async function deleteReviewImage(imageId: string) {
  await fs.unlink(path.join(IMAGES_DIR, `${imageId}.webp`)).catch(() => {})
}