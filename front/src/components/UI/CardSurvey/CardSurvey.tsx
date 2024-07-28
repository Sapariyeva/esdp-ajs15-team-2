import { MouseEventHandler } from 'react';
import './CardSurvey.scss';

interface Props {
    title?: string;
    image: string;
    style?: React.CSSProperties
    onClick?: MouseEventHandler<HTMLDivElement>
    isClicked?: boolean
}

export function CardSurvey({ title, image, style, onClick, isClicked }: Props) {
    return (
        <div className={`cardSurvey ${isClicked ? 'cardSurvey-clicked' : ''}`} onClick={onClick}>
            <div className="cardSurvey-image-container">
                <img src={image} alt={title} className="card-image" />
            </div>
            {title && (
                <div className="cardSurvey-content" style={style}>
                    <h2 className="cardSurvey-title">{title}</h2>
                </div>
            )}
        </div>
    );
}