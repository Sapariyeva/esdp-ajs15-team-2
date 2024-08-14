import { MouseEventHandler } from "react"
import vkIcon from '@/assets/images/social-icons/vk-icon.svg'
import facebookIcon from '@/assets/images/social-icons/facebook-icon.svg'
import appleIcon from '@/assets/images/social-icons/apple-icon.svg'
import googleIcon from '@/assets/images/social-icons/google-icon.svg'
import yandexIcon from '@/assets/images/social-icons/yandex-icon.svg'
import './ButtonSocial.scss'


interface Props {
    onClick: MouseEventHandler<HTMLButtonElement>
    size: 'sm' | 'md' | 'lg',
    type: 'apple' | 'vk' | 'google' | 'facebook' | 'yandex'
    style?: React.CSSProperties
}

const buttonSocialSizeClassName = {
    'sm': "button-social-size-sm",
    'md': "button-social-size-md",
    'lg': "button-social-size-lg",
}

const buttonSocialTypeClassName = {
    'apple': "button-type-apple",
    'vk': "button-type-vk",
    'google': "button-type-google",
    'facebook': "button-type-facebook",
    'yandex': "button-type-yandex",
}

const getIcon = (type: string) => {
    switch (type) {
        case 'vk':
            return vkIcon;
        case 'facebook':
            return facebookIcon;
        case 'apple':
            return appleIcon;
        case 'google':
            return googleIcon;
        case 'yandex':
            return yandexIcon;
        default:
            return null;
    }
};

export function ButtonSocial({ onClick, size, type, style }: Props) {
    const iconSrc = getIcon(type);

    return (
        <button
            className={`button-social ${buttonSocialSizeClassName[size]} ${buttonSocialTypeClassName[type]}`}
            onClick={onClick}
            style={style}
        >
            {iconSrc && <img src={iconSrc} alt={`${type}-icon`} className="button-icon" />}
        </button>
    );
}