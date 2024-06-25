// Функция для отправки писем на почту

import nodemailer from 'nodemailer';

export const sendMessageByMail = async (from: string, to: string, subject: string, text: string, html: string): Promise<void> => {
    const transporter = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: '105e5bc7b19ec7',
            pass: '0041075008b41d'
        }
    });

    const mailOptions = {
        from, //адрес отправителя
        to, // адрес получателя
        subject, // тема письма
        text, // текст письма
        html, // html письма
    };

    await transporter.sendMail(mailOptions);
};