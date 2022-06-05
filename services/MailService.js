import nodemailer from "nodemailer";

export const sendActivationMail = async (to, link) => {
    const transporter = nodemailer.createTransport({
        host: "email-smtp.us-east-1.amazonaws.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        }
    })

    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: `Активація акаунту на SOCIAL NETWORK`,
        text: '',
        html: `
            <div>
                <h1>Для активації акаунту перейдіть за посиланням:</h1>
                <a href="${link}">${link}</a>
            </div>
        `,
    })
}
