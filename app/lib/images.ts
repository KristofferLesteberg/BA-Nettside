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
  const outputPathHigh = path.join(process.cwd(), "public", "images", "high-res", `${id}.webp`)
  const outputPathMed = path.join(process.cwd(), "public", "images", "med-res", `${id}.webp`)
  const outputPathLow = path.join(process.cwd(), "public", "images", "low-res", `${id}.webp`)

  await fs.mkdir(path.dirname(outputPathHigh), { recursive: true })
  await fs.mkdir(path.dirname(outputPathMed), { recursive: true })
  await fs.mkdir(path.dirname(outputPathLow), { recursive: true })

  await sharp(buffer)
    .webp({ quality: 80 })
    .toFile(outputPathHigh)

  await sharp(buffer)
    .resize(800, 800, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(outputPathMed)

  await sharp(buffer)
    .resize(400, 400, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(outputPathLow)

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

export async function getProductThumbnail(productId: number) {
  const image = await prisma.productImage.findFirst({
    where: { productId, sortOrder: 0 },
  })

  return image ? {
    id: image.id,
    url: `/images/low-res/${image.id}.webp`
  } : null
}

export async function getProductImagesHighRes(productId: number) {
  const images = await prisma.productImage.findMany({
    where: { productId: productId },
    orderBy: { sortOrder: "asc" }
  })

  return images.map(img => ({
    id: img.id,
    url: `/images/high-res/${img.id}.webp`
  }))
}

export async function getProductImagesMedRes(productId: number) {
  const images = await prisma.productImage.findMany({
    where: { productId: productId },
    orderBy: { sortOrder: "asc" }
  })

  return images.map(img => ({
    id: img.id,
    url: `/images/med-res/${img.id}.webp`
  }))
}

export async function getProductImagesLowRes(productId: number) {
  const images = await prisma.productImage.findMany({
    where: { productId: productId },
    orderBy: { sortOrder: "asc" }
  })

  return images.map(img => ({
    id: img.id,
    url: `/images/low-res/${img.id}.webp`
  }))
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
  const filePathHigh = path.join(process.cwd(), "public", "images", "high-res", `${imageId}.webp`)
  const filePathMed = path.join(process.cwd(), "public", "images", "med-res", `${imageId}.webp`)
  const filePathLow = path.join(process.cwd(), "public", "images", "low-res", `${imageId}.webp`)

  await fs.unlink(filePathHigh).catch(() => {})
  await fs.unlink(filePathMed).catch(() => {})
  await fs.unlink(filePathLow).catch(() => {})

  await prisma.productImage.delete({
    where: { id: imageId }
  })
}

export async function deleteAllProductImages(productId: number) {
  const images = await prisma.productImage.findMany({
    where: { productId: productId }
  })

  for (const image of images) {
    const filePathHigh = path.join(process.cwd(), "public", "images", "high-res", `${image.id}.webp`)
    const filePathMed = path.join(process.cwd(), "public", "images", "med-res", `${image.id}.webp`)
    const filePathLow = path.join(process.cwd(), "public", "images", "low-res", `${image.id}.webp`)
    await fs.unlink(filePathHigh).catch(() => {})
    await fs.unlink(filePathMed).catch(() => {})
    await fs.unlink(filePathLow).catch(() => {})
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
  const outputPath = path.join(process.cwd(), "public", "images", `${id}.webp`)

  await fs.mkdir(path.dirname(outputPath), { recursive: true })

  await sharp(buffer)
    .resize(400, 400, { fit: "cover", position: "center" })
    .webp({ quality: 85 })
    .toFile(outputPath)

  return id
}

export async function deleteReviewImage(imageId: string) {
  const filePath = path.join(process.cwd(), "public", "images", `${imageId}.webp`)
  await fs.unlink(filePath).catch(() => {})
}