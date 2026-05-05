'use server'

import { z } from 'zod'
import { Resend } from 'resend';
import { getProductById } from './products';


const EmailCreateSchema = z.object({
  amount: z.coerce.number().min(1, "Du må minst bestille en av produktet"),
  fullName: z.string().min(1, "Navn er påkrevd"),
  email: z.email("Ugyldig e-postadresse"),
  phone: z.string().default(""),
  extraDetails: z.string().optional()
})

const resend = new Resend(process.env.EMAIL_APIKEY)

export async function sendEmail(data: unknown, productId:number) {
  const product = await getProductById(productId)
  const parsed = EmailCreateSchema.parse(data)

  try {
    //Email to the admins
    await resend.emails.send({
        from: '',
        to: `${product?.contactPerson?.email}`,
        replyTo: `${parsed.email}`,
        subject: `Ny bestilling på produkt ${product?.title} fra ${parsed.fullName}`,
        html: ""
    })

    //Email back to the client
    await resend.emails.send({
        from: '',
        to: `${parsed.email}`,
        subject: `Takk for din bestilling! Du vil snart få tilbakemelding fra en av våre administratorer`,
        html: ""
    })

  } catch(error) {

  }
  
}
