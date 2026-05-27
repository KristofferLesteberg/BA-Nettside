import nodemailer from "nodemailer"
import { prisma } from "@/app/lib/prisma"

interface MailProps {
  body: string
  subject: string
  email: string
}

function createTransporter() {
  const port = Number(process.env.MAIL_PORT ?? 587)
  return nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  })
}

async function deliver(queueId: string, to: string, subject: string, body: string) {
  const transporter = createTransporter()
  await transporter.sendMail({ from: process.env.MAIL_USER, to, subject, text: body })
  await prisma.emailQueue.update({
    where: { id: queueId },
    data: { status: "SENT", lastAttemptAt: new Date() },
  })
}

export async function sendMail({ body, subject, email }: MailProps) {
  const queued = await prisma.emailQueue.create({
    data: { to: email, subject, body },
  })

  try {
    await deliver(queued.id, email, subject, body)
    // SMTP is up — opportunistically flush any previously stuck emails
    flushEmailQueue().catch((err) => console.error("flushEmailQueue failed:", err))
  } catch (err) {
    await prisma.emailQueue.update({
      where: { id: queued.id },
      data: { attempts: { increment: 1 }, lastAttemptAt: new Date() },
    })
    console.error(`Mail queued (id=${queued.id}), SMTP unavailable:`, err)
  }
}

export async function flushEmailQueue() {
  const MAX_ATTEMPTS = 5
  const pending = await prisma.emailQueue.findMany({
    where: { status: "PENDING", attempts: { lt: MAX_ATTEMPTS } },
    orderBy: { createdAt: "asc" },
  })

  for (const item of pending) {
    try {
      await deliver(item.id, item.to, item.subject, item.body)
    } catch (err) {
      const nextAttempts = item.attempts + 1
      await prisma.emailQueue.update({
        where: { id: item.id },
        data: {
          attempts: nextAttempts,
          lastAttemptAt: new Date(),
          status: nextAttempts >= MAX_ATTEMPTS ? "FAILED" : "PENDING",
        },
      })
      console.error(`Retry failed for queued mail id=${item.id}:`, err)
    }
  }
}
