'use server'

import { sendMail } from '@/app/lib/mail'
import { prisma } from '@/app/lib/prisma'
import { formatPrice } from '@/app/lib/product-utils'
import { emailShell, emailSection, emailRow, emailParagraph, emailDivider, emailSignOff } from '@/app/lib/email-templates'

interface sendOrderEmailProps {
  clientName: string
  clientEmail: string
  clientPhone: string
  amount: number
  extraDetails?: string
  productId: number
  orderId: number
}

interface sendProjectEmailProps {
  projectId: string
  clientForename: string
  clientSurname: string
  clientEmail: string
  clientPhone: string
  title: string
  description: string
  minPrice: number
  maxPrice: number
}

async function getNotificationEmails(): Promise<string[]> {
  const recipients = await prisma.notificationRecipient.findMany({ orderBy: { createdAt: 'asc' } })
  return recipients.map((r) => r.email)
}

// ─── Order email ──────────────────────────────────────────────────────────────

export async function sendOrderEmail(order: sendOrderEmailProps) {
  const product = await prisma.product.findUnique({
    where: { id: order.productId },
    include: { contactPerson: true },
  })

  const contactEmail = product?.contactPerson?.email
  const adminRecipients = contactEmail ? [contactEmail] : await getNotificationEmails()
  const productTitle = product?.title ?? `Produkt #${order.productId}`
  const pricePerUnit = product ? Number(product.price) : 0
  const total = pricePerUnit * order.amount

  const orderRows = [
    emailRow('Referansenummer', `#${order.orderId}`),
    emailRow('Produkt', productTitle),
    emailRow('Antall', `${order.amount} stk`),
    emailRow('Pris/stk', formatPrice(pricePerUnit)),
    emailRow('Totalt', formatPrice(total), true),
    ...(order.extraDetails ? [emailRow('Tilleggsinfo', order.extraDetails)] : []),
  ].join('')

  const clientRows = [
    emailRow('Navn', order.clientName),
    emailRow('E-post', `<a href="mailto:${order.clientEmail}" style="color:#1a5276;">${order.clientEmail}</a>`),
    emailRow('Telefon', `<a href="tel:${order.clientPhone}" style="color:#1a5276;">${order.clientPhone}</a>`),
  ].join('')

  const contactRows = product?.contactPerson ? [
    emailRow('Navn', product.contactPerson.name),
    emailRow('E-post', `<a href="mailto:${product.contactPerson.email}" style="color:#1a5276;">${product.contactPerson.email}</a>`),
    emailRow('Telefon', product.contactPerson.phone
      ? `<a href="tel:${product.contactPerson.phone}" style="color:#1a5276;">${product.contactPerson.phone}</a>`
      : '—'),
  ].join('') : null

  if (adminRecipients.length > 0) {
    const adminBody = [ 
      emailParagraph('Du har mottatt en ny produktbestilling.'),
      emailSection('Ordreoversikt', orderRows),
      emailSection('Kundeinformasjon', clientRows),
      ...(contactRows ? [emailSection('Kontaktperson', contactRows)] : []),
      emailDivider(),
      emailParagraph(`<a href="${process.env.NEXTAUTH_URL}admin" style="color:#1a5276;">Gå til administrasjonspanelet →</a>`),
    ].join('')

    await Promise.all(adminRecipients.map((email) =>
      sendMail({
        email,
        subject: `Ny produktbestilling – ${order.clientName}`,
        html: emailShell(`Ny bestilling: ${productTitle}`, adminBody),
      })
    ))
  }

  const clientBody = [
    emailParagraph(`Hei ${order.clientName},`),
    emailParagraph('Takk for din bestilling! Vi har mottatt den og vil ta kontakt med deg så snart som mulig.'),
    emailSection('Ordreoversikt', orderRows),
    emailSection('Dine opplysninger', clientRows),
    ...(contactRows ? [emailSection('Din kontaktperson', contactRows)] : []),
    emailDivider(),
    emailParagraph(`Oppgi referansenummer <strong>#${order.orderId}</strong> om du kontakter oss angående bestillingen.`),
    emailSignOff(),
  ].join('')

  await sendMail({
    email: order.clientEmail,
    subject: 'Bekreftelse på din bestilling',
    html: emailShell('Bestilling mottatt!', clientBody),
  })
}

// ─── Project email ────────────────────────────────────────────────────────────

export async function sendProjectEmail(project: sendProjectEmailProps) {
  const adminRecipients = await getNotificationEmails()
  const clientName = `${project.clientForename} ${project.clientSurname}`

  const projectRows = [
    emailRow('Referansenummer', `#${project.projectId}`),
    emailRow('Tittel', project.title),
    emailRow('Beskrivelse', project.description),
    emailRow('Budsjett', `${project.minPrice.toLocaleString('nb-NO')} – ${project.maxPrice.toLocaleString('nb-NO')} kr`),
  ].join('')

  const clientRows = [
    emailRow('Navn', clientName),
    emailRow('E-post', `<a href="mailto:${project.clientEmail}" style="color:#1a5276;">${project.clientEmail}</a>`),
    emailRow('Telefon', `<a href="tel:${project.clientPhone}" style="color:#1a5276;">${project.clientPhone}</a>`),
  ].join('')

  if (adminRecipients.length > 0) {
    const adminBody = [
      emailParagraph('Du har mottatt en ny prosjektforespørsel.'),
      emailSection('Prosjektdetaljer', projectRows),
      emailSection('Kundeinformasjon', clientRows),
      emailDivider(),
      emailParagraph(`<a href="${process.env.NEXTAUTH_URL}admin" style="color:#1a5276;">Gå til administrasjonspanelet →</a>`),
    ].join('')

    await Promise.all(adminRecipients.map((email) =>
      sendMail({
        email,
        subject: `Ny prosjektforespørsel – ${project.title}`,
        html: emailShell(`Ny forespørsel: ${project.title}`, adminBody),
      })
    ))
  }

  const clientBody = [
    emailParagraph(`Hei ${project.clientForename},`),
    emailParagraph('Takk for at du tok kontakt! Vi har mottatt din prosjektforespørsel og vil komme tilbake til deg så snart som mulig.'),
    emailSection('Prosjektdetaljer', projectRows),
    emailSection('Dine opplysninger', clientRows),
    emailDivider(),
    emailParagraph('Du kan se og redigere forespørselen din via lenken nedenfor. Bruk samme e-postadresse og navn som du registrerte.'),
    emailParagraph(`<a href="${process.env.NEXTAUTH_URL}prosjekter/${project.projectId}" style="display:inline-block;padding:10px 20px;background:#1a5276;color:#ffffff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:600;">Se prosjektforespørselen →</a>`),
    emailSignOff(),
  ].join('')

  await sendMail({
    email: project.clientEmail,
    subject: 'Vi har mottatt din prosjektforespørsel',
    html: emailShell('Forespørsel mottatt!', clientBody),
  })
}
