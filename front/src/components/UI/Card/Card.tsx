import { MouseEventHandler } from 'react';
import './Card.scss';

interface Props {
    title?: string;
    image: string;
    style?: React.CSSProperties
    onClick?: MouseEventHandler<HTMLDivElement>
    isClicked?: boolean
}

export function Card({ title, image, style, onClick, isClicked }: Props) {
    return (
        <div className={`card ${isClicked ? 'clicked' : ''}`} onClick={onClick}>
            <div className="card-image-container">
                <img src={image} alt={title} className="card-image" />
            </div>
            {title && (
                <div className="card-content" style={style}>
                    <h2 className="card-title">{title}</h2>
                </div>
            )}
        </div>
    );
}
