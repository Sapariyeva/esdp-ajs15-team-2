import { useState } from 'react';
import { Button, notification } from 'antd';
import { SmileOutlined, BellOutlined } from '@ant-design/icons';
import './NotificationMessage.css';

interface Notification {
    message?: string;
    description?: string;
    icon?: JSX.Element;
}

// Компонент для отображения уведомлений
const notifications: Notification[] = [
    {},
    {
        message: 'Notification 1',
        description: 'This is content notification 1',
        icon: <SmileOutlined style={{ color: 'rgb(57, 246, 120)' }} />,
    },
    {
        message: 'Notification 2',
        description: 'This is content notification 2',
        icon: <SmileOutlined style={{ color: 'rgb(57, 246, 120)' }} />,
    },
    {
        message: 'Notification 3',
        description: 'This is content notification 3',
        icon: <SmileOutlined style={{ color: 'rgb(57, 246, 120)' }} />,
    },
];

const NotificationMessage = () => {

    const filterNotifications = notifications.filter((notif) => notif.message);

    const [notificationCount, setNotificationCount] = useState(filterNotifications.length);

    const openNotification = () => {
        if (filterNotifications.length === 0) {
            notification.open({
                message: 'No notifications',
                description: 'There are no notifications to display',
                className: 'customNotification',
                icon: <SmileOutlined style={{ color: 'rgb(57, 246, 120)' }} />
            });
            return;
        }

        filterNotifications.forEach((notif) => {
            notification.open({
                message: notif.message,
                description: notif.description,
                icon: notif.icon,
                className: 'customNotification',
            });
        });

        setNotificationCount(filterNotifications.length);
    };

    return (
        <div>
            <Button className='btn' type="primary" onClick={openNotification}>
                Уведомление ({notificationCount})<BellOutlined />
            </Button>
        </div>
    );
};

export default NotificationMessage;

