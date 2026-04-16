
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from "../../../lib/prisma";
import { getToken } from 'next-auth/jwt';
import { EducationField } from '@/generated/prisma';
import { changeProductImages, deleteAllProductImages } from '@/app/lib/images';

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const token = await getToken({ req })
  if(!token) {
    return NextResponse.json({ error: "No valid token" }, { status: 401 })
  }
  try {
    const { id } = await context.params     
    
    const product = await prisma.product.findUnique({
        where: {id: Number(id)},
        include: {images: true}
    })

    if(!product) {
        return NextResponse.json({ error: "No product with the matchin id"}, { status: 404})
    }
    return NextResponse.json(product)

  } catch(error) {
    console.error(error)
    return NextResponse.json(error)
  }

}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const token = await getToken({ req })
  if (!token) {
    return NextResponse.json({ error: "No valid token" }, { status: 401 })
  }
  try {
    //extract the id form the paramters
    const { id } = await context.params

    await deleteAllProductImages(parseInt(id));

    const deleteProduct = await prisma.product.delete({
      where: {
        id: Number(id)
      }
    })
    return NextResponse.json(deleteProduct)

  } catch(error: any) {
    console.error(error)
    return NextResponse.json(error)
  }
}

export async function PATCH(req: NextRequest, context: { params: Promise<{id: string }> }) {
  const token = await getToken({ req })
  if(!token) {
    return NextResponse.json({ error: "No valid token" }, { status: 401 })
  }

  try {
    const { id } = await context.params

    const formData = await req.formData()   
    const educationField = formData.get("educationField") as EducationField
    const title          = formData.get("title") as string
    const description    = formData.get("description") as string
    const price          = Number(formData.get("price"))
    const measures       = JSON.parse(formData.get("measures") as string)
    const amount         = Number(formData.get("amount"))
    const imageIds       = formData.getAll("imageIds") as string[]
    const imageFiles     = formData.getAll("imageFiles") as File[]

    const updatedProduct = await prisma.product.update({
      where: {id: Number(id)},
      data: {
        educationField,
        title,
        description,
        price,
        measures,
        amount
      }   
    })

    const images = imageFiles.map((file, id) => ({
      file,
      id: imageIds[id]
    }))

    if (images && images.length > 0) {
      await changeProductImages(images, updatedProduct.id);
    }

    return NextResponse.json(updatedProduct)
  } catch(error) {
    console.error(error)
    NextResponse.json(error)
  }
}