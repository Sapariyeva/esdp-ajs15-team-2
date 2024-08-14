import { useState } from 'react';
import './Switch.scss';

interface Props {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    size?: 'default';
    style?: React.CSSProperties;
}

export function Switch ({ checked = false, onChange, disabled = false, size = 'default', style }: Props) {
    const [isChecked, setIsChecked] = useState(checked);

    const handleClick = () => {
        if (!disabled) {
            const newChecked = !isChecked;
            setIsChecked(newChecked);
            if (onChange) {
                onChange(newChecked);
            }
        }
    };

    return (
        <button
            className={`switch ${isChecked ? 'switch-checked' : ''} ${disabled ? 'switch-disabled' : ''} switch-${size}`}
            onClick={handleClick}
            style={style}
            disabled={disabled}
        >
            <span className="switch-handle"></span>
        </button>
    );
};

export default Switch;
