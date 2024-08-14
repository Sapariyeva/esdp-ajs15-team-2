import { CopyOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Button, Modal } from 'antd';
import { nanoid } from 'nanoid';
import { ShareAltOutlined } from '@ant-design/icons';
import './Share.css'

// Компонент для поделиться ссылками
const Share = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const generateUrl = () => {
        const baseUrl = 'https://test.com';
        const uniqueId = nanoid(5);
        return `${baseUrl}/share/${uniqueId}`;
    };

    const url = generateUrl();
    const subject = encodeURIComponent('Статистика пациента');
    const body = encodeURIComponent(`Ссылка на статистику пациента: ${url}`);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            alert('Ссылка скопирована в буфер обмена!');
        } catch (err) {
            console.error('Не удалось скопировать ссылку: ', err);
        }
    };


    const sendEmail = (service: string) => {
        let mailUrl;
        switch (service) {
            case 'gmail':
                mailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${subject}&body=${body}`;
                break;
            case 'yandex':
                mailUrl = `https://mail.yandex.com/compose?to=&subj=${subject}&body=${body}`;
                break;
            case 'mail':
                mailUrl = `https://e.mail.ru/compose/?to=&subject=${subject}&body=${body}`;
                break;
            default:
                mailUrl = `mailto:?subject=${subject}&body=${body}`;
        }
        window.open(mailUrl, '_blank');
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Поделиться <ShareAltOutlined />
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Button type="primary" className='copy' onClick={copyToClipboard}>Скопировать ссылку <CopyOutlined /></Button>
                <Button type="primary" className='gmail' onClick={() => sendEmail('gmail')}>Gmail</Button>
                <Button type="primary" className='yandex' onClick={() => sendEmail('yandex')}>Yandex</Button>
                <Button type="primary" className='mail' onClick={() => sendEmail('mail')}>Mail.ru</Button>
            </Modal>
        </>
    );
};

export default Share;