import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import closeEye from '@/assets/images/icons/close-eye.png';
import openEye from '@/assets/images/icons/open-eye.png';
import copy from '@/assets/images/icons/copy.svg';
import './Input.scss';

interface Props {
  type: 'password' | 'email' | 'name' | 'date' | 'id';
  placeholder?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> 
  style?: React.CSSProperties;
  disabled?: boolean;
  required?: boolean;
  name?: string;
}

export function Input({ type, placeholder, value, onChange, style, disabled, required, name }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCopy = () => {
    if (value) {
      navigator.clipboard.writeText(value);
      alert('ID скопирован в буфер обмена');
    }
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    input = input.replace(/\D/g, '');

    if (input.length > 2) {
      input = input.slice(0, 2) + ' / ' + input.slice(2);
    }
    if (input.length > 7) {
      input = input.slice(0, 7) + ' / ' + input.slice(7);
    }
    onChange?.({ ...e, target: { ...e.target, value: input } });
  };

  return (
    <div className={`input-wrapper ${disabled ? 'disabled' : ''}`} style={style}>
      <input
        className={`input ${type === 'date' ? 'date-input' : ''} ${type === 'id' ? 'id-input' : ''}`}
        type={type === 'password' && showPassword ? 'text' : type === 'date' ? 'text' : type}
        placeholder={type === 'date' ? 'DD / MM / YY' : placeholder}
        value={value}
        onChange={type === 'date' ? handleDateChange : onChange}
        disabled={disabled}
        required={required}
        name={name}
      />
      {type === 'password' && (
        <span className="password-toggle" onClick={handleTogglePassword}>
          <img src={showPassword ? openEye : closeEye} alt="eye icon" />
        </span>
      )}
      {type === 'id' && (
        <span className="copy-icon" onClick={handleCopy}>
          <img src={copy} alt="copy icon" />
        </span>
      )}
    </div>
  );
}
