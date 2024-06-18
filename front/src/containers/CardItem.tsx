import { Card } from 'antd';
// import imageNotAvalable from '../assets/images/image_not_available.jpg';
import { ICard } from './Cards';
import apiUrl from '../api/axiosApi';

interface Props {
    card: ICard;
    status: boolean;
}

export function CardItem({ card, status }: Props) {
  const { image, video } = card;

  let cardImage = "imageNotAvalable";

  if (image) {
    cardImage = image.startsWith('http') ? image : `${apiUrl}/uploads/${image}`;
  }

  return (
    status === false ? 
      <Card
        hoverable
        style={{ width: 350, height: 280, marginRight: 50 }}
        cover={<video autoPlay muted loop>
          <source src={video} type='video/webm'/>
        </video>}>
      </Card> :
      <Card
        hoverable
        style={{ width: 350, height: 280, marginRight: 50 }}
        cover={<img alt="example" src={cardImage} style={{ height: 280 }}/>}>
      </Card>
    );
}