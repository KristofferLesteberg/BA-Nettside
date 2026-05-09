'use server'

import { sendMail } from '@/app/lib/mail'
import { email } from 'zod'

const adminEmail = 'kristoffer.ihme.lesteberg@gmail.com'

interface sendOrderEmailProps {
  clientName: string
  clientEmail: string
  clientPhone: string
  amount: number
  extraDetails?: string
  productId: number
}

interface sendProjectEmailProps {
  clientForename: string
  clientSurname: string
  clientEmail: string
  clientPhone: string
  title: string
  description: string
  minPrice: number
  maxPrice: number
}



export async function sendOrderEmail(order: sendOrderEmailProps){
  //To Admin
  await sendMail({
    email: adminEmail,
    subject: 'Ny produktbestilling',
    body: `
      Ny bestilling mottatt:
      Navn: ${order.clientName}
      E-post: ${order.clientEmail}
      Telefon: ${order.clientPhone}
      Produkt ID: ${order.productId}
      Antall: ${order.amount}
      ${order.extraDetails ? `Ekstra detaljer: ${order.extraDetails}` : ''}
    `.trim(),
  })
  //To client
  await sendMail({
    email: `${order.clientEmail}`,
    subject: "Takk for din bestilling!",
    body: `
      Bekreft din bestilling:
      Navn: ${order.clientName}
      E-post: ${order.clientEmail}
      Telefon: ${order.clientPhone}
      Produkt ID: ${order.productId}
      Antall: ${order.amount}
      ${order.extraDetails ? `Ekstra detaljer: ${order.extraDetails}` : ''}
    `.trim(),
  })
}


export async function sendProjectEmail(project: sendProjectEmailProps) {
  console.log("test")
  await sendMail({
    email: adminEmail,
    subject: 'Ny prosjektforespørsel',
    body: `
      Ny prosjektforespørsel mottatt:

      Navn: ${project.clientForename} ${project.clientSurname}
      E-post: ${project.clientEmail}
      Telefon: ${project.clientPhone}
      Tittel: ${project.title}
      Beskrivelse: ${project.description}
      Budsjett: ${project.minPrice} - ${project.maxPrice} kr
    `.trim()
  })
  await sendMail({
    email: project.clientEmail,
    subject: "Takk for ditt bestilling!",
    body: `
      Bekreft din informasjon her:
      Navn: ${project.clientForename} ${project.clientSurname}
      E-post: ${project.clientEmail}
      Telefon: ${project.clientPhone}
      Tittel: ${project.title}
      Beskrivelse: ${project.description}
      Budsjett: ${project.minPrice} - ${project.maxPrice} kr
    `.trim()
  })
}