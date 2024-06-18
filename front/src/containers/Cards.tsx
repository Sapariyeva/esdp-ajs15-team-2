import { Button, Flex } from 'antd';
import { CardItem } from './CardItem';
import { useState } from 'react';

export function Cards() {

  const [status, setStatus] = useState<boolean>(false);
  const [array, setArray] = useState<ICard[]>([
    {
      id: 1,
      title: "Бегать",
      image: "https://vesti.kz/userdata/news/2023/news_336752/crop_b/photo_205206.jpg",
      video: "https://pixabay.com/videos/running-bridge-mountains-27539/"
    },
    {
      id: 2,
      title: "Прыгать",
      image: "https://img.freepik.com/free-photo/dreamy-male-model-with-brown-skin-fooling-around-indoor-shot-african-guy-bright-clothes-jumping_197531-20200.jpg",
      video: "https://pixabay.com/videos/running-bridge-mountains-27539/"
    },
    {
      id: 3,
      title: "Кричать",
      image: "https://img.championat.com/i/b/w/1678362114239235117.jpg",
      video: "https://pixabay.com/videos/running-bridge-mountains-27539/"
    }
  ]);

  const changeStatus = () => {
    if (status === false) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }

  return (
    <>
    <Flex justify='center'>
        <Button onClick={changeStatus}>Stop video</Button>
    </Flex>
      <Flex wrap="wrap" gap="large" justify="center">
        {array.map((card) => (
          <CardItem key={card.id} card={card} status={status}/>
        ))}
      </Flex>
    </>
  );
}

export interface ICard {
    id: number;
    title: string;
    image: string;
    video: string;
}