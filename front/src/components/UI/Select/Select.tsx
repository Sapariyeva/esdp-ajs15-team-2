import  { useState } from 'react';
import './Select.scss';

interface Option {
  value: string;
  label: string;
}

interface Props {
  options: Option[];
  defaultValue: string;
  onChange: (value: string) => void;
  type?: 'default' | 'inline';
  style?: React.CSSProperties
}

export function Select({ options, defaultValue, onChange, type = 'default', style }:Props)  {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onChange(value);
    if (type === 'default') {
      setIsOpen(false);
    }
  };

  return (
    <div className={`select-container ${type}`} style={style}>
      {type === 'default' ? (
        <>
          <div
            className={`select-header ${isOpen ? 'active' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>{selectedValue}</span>
            <span className="arrow">{isOpen ? '▲' : '▼'}</span>
          </div>
          {isOpen && (
            <ul className="select-options">
              {options.map(option => (
                <li
                  key={option.value}
                  className={`select-option ${option.value === selectedValue ? 'selected' : ''}`}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <div className="inline-select">
          {options.map(option => (
            <div
              key={option.value}
              className={`select-option ${option.value === selectedValue ? 'selected' : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.value === selectedValue && <span className="check-icon"></span>}
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

