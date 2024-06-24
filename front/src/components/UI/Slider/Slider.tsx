// src/components/Slider.tsx

import React, { useState, useRef, useEffect } from 'react';
import './Slider.scss';

interface Props {
    min: number;
    max: number;
    value?: number;
    step?: number;
    onChange?: (value: number) => void;
    disabled?: boolean;
    style?: React.CSSProperties;
}

export function Slider ({ min, max, value, step = 1, onChange, disabled, style }: Props) {
    const [currentValue, setCurrentValue] = useState(value || min);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (value !== undefined) {
            setCurrentValue(value);
        }
    }, [value]);

    const handleChange = (newValue: number) => {
        if (!disabled) {
            setCurrentValue(newValue);
            if (onChange) {
                onChange(newValue);
            }
        }
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (sliderRef.current) {
            const { left, width } = sliderRef.current.getBoundingClientRect();
            const newValue = Math.min(max, Math.max(min, min + ((event.clientX - left) / width) * (max - min)));
            handleChange(Math.round(newValue / step) * step);
        }
    };

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleMouseDown = () => {
        if (!disabled) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
    };

    const percentage = ((currentValue - min) / (max - min)) * 100;

    return (
        <div className={`slider ${disabled ? 'slider-disabled' : ''}`} style={style}>

            <div className="slider-track" ref={sliderRef} onMouseDown={handleMouseDown}>
                <div className="slider-progress" style={{ width: `${percentage}%` }}></div>
                <div className="slider-thumb" style={{ left: `${percentage}%` }}>
                    <div className="slider-value">{currentValue}</div>
                </div>
            </div>
            <div className="slider-labels">
                <span className='slider-min-max'>{min}</span>
                <span className='slider-min-max'>{max}</span>
            </div>
        </div>
    );
};

