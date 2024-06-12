import './ButtonNav.scss';

interface Props {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    size: 'sm' | 'md' | 'lg';
    type: 'back' | 'close';
    style?: React.CSSProperties;
}

const buttonNavSizeClassName = {
    'sm': "button-nav-size-sm",
    'md': "button-nav-size-md",
    'lg': "button-nav-size-lg",
}

export function ButtonNav({ onClick, size, type, style }: Props) {
    return (
        <button
            className={`button-nav ${buttonNavSizeClassName[size]} ${type}`}
            onClick={onClick}
            style={style}
        >
            {type === 'close' ? 'X' : '<'}
        </button>
    );
}