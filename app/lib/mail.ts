import nodemailer from "nodemailer"

interface MailProps {
  body: string
  subject: string
  email: string
}

export async function sendMail({ body, subject, email }: MailProps) {
  const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})
const mailOptions = {
  from: process.env.MAIL_USER,
  to: email,
  subject,
  text: body,
}
try {
  await transporter.sendMail(mailOptions)
  console.log(mailOptions)
} catch(error) {
  throw new Error("Kunne ikke sende mail")
}
}