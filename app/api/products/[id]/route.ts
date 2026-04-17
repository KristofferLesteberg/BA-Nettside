
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from "../../../lib/prisma";
import { getToken } from 'next-auth/jwt';


export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const token = await getToken({ req })
    if(!token) {
        return NextResponse.json({ error: "No valid token" }, { status: 401 })
    }
    try {
        //extract the id form the paramters
        const { id } = await context.params

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
