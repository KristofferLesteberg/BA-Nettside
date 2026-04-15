


import { NextRequest, NextResponse } from 'next/server'
import { prisma } from "../../lib/prisma";
import { getToken } from 'next-auth/jwt';
import { EducationField } from '@/generated/prisma';

import {
    uploadProductImage
} from '../../lib/images'


export async function POST(req: NextRequest)  {
    const token = await getToken({ req })
    if(!token) {
        return NextResponse.json({ error: "No valid token" }, { status: 401 })
    }
   
    try {
        const formData = await req.formData()

        const educationField = formData.get("educationField") as EducationField
        const title          = formData.get("title") as string
        const description    = formData.get("description") as string
        const price          = Number(formData.get("price"))
        const measures       = JSON.parse(formData.get("measures") as string)
        const amount         = Number(formData.get("amount"))
        const image          = formData.get("image") as File
         
        const product = await prisma.product.create({
            data: {
                educationField,
                title,
                description,
                price,
                measures,
                amount
            }
        })
        if(image) {
            await uploadProductImage(image, product.id, 0)
        }
        return NextResponse.json("Product: " + product)


    } catch(error: any) {
        console.error("SERVER ERROR:", error)
        return NextResponse.json(error)
    }

  
}


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const token = await getToken({ req })
    if(!token) {
        return NextResponse.json({ error: "No valid token" }, { status: 401 })
    }
    try {
        const deleteProduct = await prisma.product.delete({
            where: {
                id: Number(params.id)
            }
        })

        return NextResponse.json(deleteProduct)

    } catch(error: any) {
        console.error(error)
        return NextResponse.json(error)
    }
    
}


