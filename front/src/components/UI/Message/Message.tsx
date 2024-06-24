import React, { useEffect, useState } from 'react';
import './Message.scss'; 

interface Props {
  content: string;
  type: 'success' | 'info' | 'warning' | 'error';
  style?: React.CSSProperties
}

export function Message ({ type, content, style }: Props) {
    const [isVisible, setIsVisible] = useState<boolean>(true);
    

    useEffect(() => {
        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 1000);
    }, []);
  
    return (
      <div style={style} className={`message message-${type} ${isVisible ? 'show' : ''}`}>
        <p>{content}</p>
      </div>
    );
};



