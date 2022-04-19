import nodemailer from "nodemailer";

export const sendActivationMail = async (to, link) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.SMTP_USER,
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
