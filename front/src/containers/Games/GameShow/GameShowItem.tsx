import { Card } from 'antd';
// import imageNotAvalable from '../assets/images/image_not_available.jpg';
// import { apiUrl } from '../helpers/axiosApiClient';
import { useState } from 'react';
import { IShowCard } from './GameShow';

interface Props {
    card: IShowCard;
    check: (title: string) => void;
    status: boolean | null;
}

export function GameShowItem({ card, check, status }: Props) {
    const { title, image } = card;
    const [isActive, setIsActive] = useState(false);

    // let cardImage = imageNotAvalable;

    // if (image) {
    //     cardImage = image.startsWith('http') ? image : `${apiUrl}/uploads/${image}`;
    // }

    const handleClick = () => {
      setIsActive(true);
      check(title);
      setTimeout(() => {
        setIsActive(false);
      }, 1000);
  };

    return (
        <Card
            hoverable
            style={{
                width: 350,
                height: 280,
                marginRight: 50,
                backgroundColor: isActive && status === true ? '#4CAF50' : isActive  && status === false ? '#F44336' : 'white',
                border: isActive && status === true ? '5px solid #4CAF50' : isActive  && status === false ? '5px solid #F44336' : '5px solid #e8e8e8', // Add border to highlight the card
            }}
            cover={<img alt="example" src={image} style={{ height: 280 }} />}
            onClick={handleClick}
        >
        </Card>
    );
}