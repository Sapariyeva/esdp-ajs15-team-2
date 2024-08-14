// Функция для отправки писем на почту

import nodemailer from 'nodemailer';

export const sendMessageByMail = async (from: string, to: string, subject: string, text: string, html: string): Promise<void> => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.yandex.ru',
        port: 465,
        secure: true,
        auth: {
            user: 'igro.vuz',
            pass: 'xbxkdaeqqoadptwz'
        }
    });

    const mailOptions = {
        from, //адрес отправителя
        to, // адрес получателя
        subject, // тема письма
        text, // текст письма
        html, // html письма
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};