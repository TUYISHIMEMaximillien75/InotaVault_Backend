import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { htmlMessage } from './html.message.ts';

dotenv.config();

const transport = nodemailer.createTransport({
    host: process.env['SMTP_HOST'],
    port: Number(process.env['SMTP_PORT']),
    secure: false, // Use true for port 465, false for 587 (TLS)
    auth: {
        user: process.env['SMTP_USER'],
        pass: process.env['SMTP_PASS'],
    },
});
const verifyLink = `http://localhost:5500/inotavault/vi/api/verify/`;
export const sendEmail = async (receiver: string, userId: string) => {
    const mailOptions = {
        from: process.env['SENDER_EMAIL'],
        to: receiver,
        subject: "InotaVault Confirmation link",
        html: htmlMessage(verifyLink + userId),
    }

    try {
        const info = await transport.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// 21a8b618-2a45-4a18-9307-dd34edb399e5

// sendEmail()