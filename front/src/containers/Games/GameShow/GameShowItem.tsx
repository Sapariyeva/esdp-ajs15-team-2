import { Card } from 'antd';
import { IShowCard } from './GameShow';

interface Props {
    card: IShowCard;
    check: (title: string) => void;
}

export function GameShowItem({ card, check }: Props) {
    const { image, category } = card;

    const handleClick = () => {
      check(category);
    }

    return (
        <Card
            hoverable
            style={{
                width: 350,
                height: 280,
                marginRight: 50,
            }}
            cover={<img alt="example" src={image} style={{ height: 280 }} />}
            onClick={handleClick}
        >
        </Card>
    );
}