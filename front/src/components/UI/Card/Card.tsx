import './Card.scss';

interface Props {
    title?: string;
    image: string;
    style?: React.CSSProperties
}

export function Card({ title, image, style }: Props) {
    return (
        <div className="card" >
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
