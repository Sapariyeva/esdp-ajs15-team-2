// Функция для отправки писем на почту

import nodemailer from 'nodemailer';

export const sendMessageByMail = async (from: string, to: string, subject: string, text: string, html: string): Promise<void> => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: '474da4dfe02b65',
            pass: '06753b19b9cfc5'
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