import { Card } from 'antd';
import imageNotAvalable from '../assets/images/image_not_available.jpg';
import { ICard } from './Cards';
import { apiUrl } from '../helpers/axiosApiClient';

interface Props {
    card: ICard;
    check: () => void;
}

export function CardItem({ card, check }: Props) {
  const { image } = card;

  let cardImage = imageNotAvalable;

  if (image) {
    cardImage = image.startsWith('http') ? image : `${apiUrl}/uploads/${image}`;
  }

  return (
            <Card
                hoverable
                style={{ width: 350, height: 280, marginRight: 50 }}
                cover={<img alt="example" src={cardImage} style={{ height: 280 }}/>}
                onClick={check}
            >
            </Card>
    );
}