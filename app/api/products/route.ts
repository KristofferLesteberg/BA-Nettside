

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from "../../lib/prisma";
import { getToken } from 'next-auth/jwt';


export default async function handler(req: NextRequest)  {
    const token = await getToken({ req })

    if(!token) {
        return NextResponse.json({ error: "No valid token" }, { status: 401 })
    }
    
    if(req.method === 'POST') {
        const { educationField, title, description, price,  measures, amount } = await req.json()

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
     return NextResponse.json(product)
    }
  
}


