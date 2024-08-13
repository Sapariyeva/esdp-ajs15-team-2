import { Card } from 'antd';
import { IShowCard } from './GameShow';
import './GameShow.css';

interface Props {
    card: IShowCard;
    check: (title: string) => void;
    highlight?: boolean;
}

export function GameShowItem({ card, check, highlight }: Props) {
    const { image, category } = card;

    const handleClick = () => {
      check(category);
    }

    return (
        <Card
            hoverable
            className={`game-show-item-${highlight ? 'highlight' : ''}`}
            cover={<img alt="example" src={image} style={{ height: 280 }} />}
            onClick={handleClick}
            style={{
                width: 350,
                height: 280,
                marginRight: 50,
            }}
        >
        </Card>
    );
}