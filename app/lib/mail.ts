import nodemailer from "nodemailer"


interface MailProps {
  body: string
  subject: string
  email: string
}

export async function sendMail({ body, subject, email }: MailProps) {
  const transporter = nodemailer.createTransport({
  host: "mail.sevgs.no",
  port: 587,
  secure: false,
  auth: {
    user: "bat-noreply@sevgs.no",
    pass: "hrrEiPkNMrp7ey25Ikh8pQcR"
  },
})
const mailOptions = {
  from: 'bat-noreply@sevgs.no',
  to: `${email}`,
  subject: `${subject}`,
  text: `${body}`
}
try {
  await transporter.sendMail(mailOptions)
  console.log(mailOptions)
} catch(error) {
  throw new Error("Kunne ikke sende mail")
}
}



