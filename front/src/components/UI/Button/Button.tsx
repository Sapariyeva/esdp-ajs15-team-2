import { MouseEventHandler } from "react"
import './Button.scss'

interface Props {
    title?: string
    onClick?: MouseEventHandler<HTMLButtonElement>
    size?: 'sm' | 'md' | 'lg',
    type?: 'primary' | 'default'
    style?: React.CSSProperties
    className?: string
}

const buttonSizeClassName = {
    'sm': "button-size-sm",
    'md': "button-size-md",
    'lg': "button-size-lg",
}

const buttonTypeClassName = {
    'primary': "button-type-primary",
    'default': "button-type-default",
}

export function Button({title, onClick, size, type, style, className}: Props) {
    return (
        <button 
            className={`button ${buttonSizeClassName[size!]} ${buttonTypeClassName[type!]} ${className}`} 
            onClick={onClick}
            style={style}>
            <span className="button-title">{title}</span>
        </button>
    )
}