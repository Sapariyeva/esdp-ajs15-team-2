// Функция для отправки писем на почту

import nodemailer from 'nodemailer';

export const sendMessageByMail = async (from: string, to: string, subject: string, text: string, html: string): Promise<void> => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: '2b1c8245a8b186',
            pass: '5990d81b834eb0'
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