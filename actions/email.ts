'use server'

import { sendMail } from '@/app/lib/mail'
import { prisma } from '@/app/lib/prisma'

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

export async function sendOrderEmail(order: sendOrderEmailProps) {
  const getProduct = await prisma.product.findUnique({ where: { id: order.productId }, include: { contactPerson: true }})

  //To admins
  await sendMail({
    email: String(getProduct?.contactPerson?.email),
    subject: `Ny produktbestilling – ${order.clientName}`,
    body: `
  Du har mottatt en ny produktbestilling.

  Kundeinformasjon:
    Navn:     ${order.clientName}
    E-post:   ${order.clientEmail}
    Telefon:  ${order.clientPhone}

  Bestillingsdetaljer:
    Antall:      ${order.amount}
  ${order.extraDetails ? `  Tilleggsinfo: ${order.extraDetails}` : ''}

  Logg inn i administrasjonspanelet for å følge opp bestillingen.
    `.trim(),
  })

  //To Clents
  await sendMail({
    email: order.clientEmail,
    subject: 'Bekreftelse på din bestilling',
    body: `
  Hei ${order.clientName},

  Takk for din bestilling! Vi har mottatt forespørselen din og vil ta kontakt med deg så snart som mulig.

  Dine opplysninger:
      Navn:     ${order.clientName}
      E-post:   ${order.clientEmail}
      Telefon:  ${order.clientPhone}
      Antall:   ${order.amount}
    ${order.extraDetails ? `  Tilleggsinfo: ${order.extraDetails}` : ''}

  Har du spørsmål i mellomtiden, er du velkommen til å kontakte oss.

  Med vennlig hilsen 
    `.trim(),
  })
}

export async function sendProjectEmail(project: sendProjectEmailProps) {
  //To admins
  await sendMail({
    email: adminEmail,
    subject: `Ny prosjektforespørsel – ${project.title}`,
    body: `
  Du har mottatt en ny prosjektforespørsel.

  Kundeinformasjon:
    Navn:     ${project.clientForename} ${project.clientSurname}
    E-post:   ${project.clientEmail}
    Telefon:  ${project.clientPhone}

    Prosjektdetaljer:
      Tittel:      ${project.title}
      Beskrivelse: ${project.description}
      Budsjett:    ${project.minPrice} – ${project.maxPrice} kr

    Logg inn i administrasjonspanelet for å følge opp forespørselen.
    `.trim(),
  })

  //to clients
  await sendMail({
    email: project.clientEmail,
    subject: 'Vi har mottatt din prosjektforespørsel',
    body: `
      Hei ${project.clientForename},

      Takk for at du tok kontakt! Vi har mottatt din prosjektforespørsel og vil se nærmere på den og komme tilbake til deg så snart som mulig.

      Dine opplysninger:
        Navn:        ${project.clientForename} ${project.clientSurname}
        E-post:      ${project.clientEmail}
        Telefon:     ${project.clientPhone}
        Tittel:      ${project.title}
        Beskrivelse: ${project.description}
        Budsjett:    ${project.minPrice} – ${project.maxPrice} kr

      Har du spørsmål i mellomtiden, er du velkommen til å kontakte oss.

    Med vennlig hilsen
    `.trim(),
  })
}