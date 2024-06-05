import { useEffect, useState } from 'react';
import { Flex, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { fetchCards } from '../features/CardSlice';
import { CardItem } from './CardItem';
import _ from 'lodash';

const { Title } = Typography;

export function Cards() {
  const dispatch = useAppDispatch();
  const { cards } = useAppSelector((state) => state.cards);
  const [array, setArray] = useState<ICard[]>([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<boolean>();

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  useEffect(() => {
      const randomCards = _.sampleSize(cards, 3);
      setArray(randomCards);
      const randomCard = _.sample(randomCards);
      if (randomCard) {
        setTitle(randomCard.title);
      }
  }, [cards]);

  const check = (cardTitle: string) => {
    if (title === cardTitle) {
        setStatus(true);
    } else {
        setStatus(false);
    }
  }

  return (
    <>
    <Flex justify='center'>
        <Title>{title}</Title>
    </Flex>
      <Flex wrap="wrap" gap="large" justify="center">
        {array.map((card) => (
          <CardItem key={card.id} card={card} check={check}/>
        ))}
      </Flex>
      <Flex justify='center'>
        {status === true ? <h2>Ты молодец!</h2> : status === false ? <h2>Попробуй еще раз</h2>: null}
      </Flex>
    </>
  );
}

export interface ICard {
    id: number;
    title: string;
    image: string;
}