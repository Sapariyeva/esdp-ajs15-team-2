import { useEffect, useState } from 'react';
import { Flex, Typography } from 'antd';
import _ from 'lodash';
import { GameShowItem } from './GameShowItem';
import { fetchCards } from '@/features/showCardSlice';
import { useAppDispatch } from '@/app/hooks';

const { Title } = Typography;

export function GameShow() {
  const dispatch = useAppDispatch();
  // const { cards } = useAppSelector((state) => state.showCards);
  const [array, setArray] = useState<IShowCard[]>([]);
  const [title, setTitle] = useState<string>("");
  const [status, setStatus] = useState<boolean | null>(null);
  const [correct, setCorrect] = useState<number>(0);
  const [incorrect, setIncorrect] = useState<number>(0);
  const [attemptsLeft, setAttemptsLeft] = useState<number>(11);

  //TODO: Удален setStateCards как неиспользуемый. Ошибка при npm run build
  const [stateCards] = useState<IShowCard[]>([
    {
      id: 1,
      image: "https://bober.ru/sites/default/files/styles/large_keep_aspect/public/news/2020-08/shutterstock_157245107.jpg?itok=49HBznby",
      title: "Кричать",
    },
    {
      id: 2,
      image: "https://media.istockphoto.com/id/1388204068/ru/%D1%84%D0%BE%D1%82%D0%BE/%D1%81%D1%87%D0%B0%D1%81%D1%82%D0%BB%D0%B8%D0%B2%D1%8B%D0%B9-%D0%BC%D0%BE%D0%BB%D0%BE%D0%B4%D0%BE%D0%B9-%D0%B1%D0%B8%D0%B7%D0%BD%D0%B5%D1%81%D0%BC%D0%B5%D0%BD-%D0%BF%D1%80%D1%8B%D0%B3%D0%B0%D0%B5%D1%82.jpg?s=612x612&w=0&k=20&c=dYJ82FzrHpZaggVQ-rsVZFgtTvlUVV9Y5YLPnKlePd8=",
      title: "Прыгать",
    },
    {
      id: 3,
      image: "https://vesti.kz/userdata/news/2023/news_324927/crop_b/photo_192682.jpg",
      title: "Бегать",
    },
    {
      id: 4,
      image: "https://cdn.pixabay.com/photo/2020/11/16/09/42/bird-5748517_1280.jpg",
      title: "Летать",
    },
    {
      id: 5,
      image: "https://ss.sport-express.ru/userfiles/materials/199/1995178/volga.jpg",
      title: "Плакать",
    },
  ]);

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  useEffect(() => {
    if (stateCards.length > 0) {
      loadNewCards();
    }
  }, [stateCards]);

  const loadNewCards = () => {
    const randomCards = getRandomElements(stateCards, 3);
    setArray(randomCards);
    const randomCard = _.sample(randomCards);
    if (randomCard) {
      setTitle(randomCard.title);
    }
    setStatus(null);
  };

  const getRandomElements = (array: IShowCard[], sum: number): IShowCard[] => {
    const shuffle = array.slice().sort(() => 0.5 - Math.random());
    return shuffle.slice(0, sum); 
  };

  const check = (cardTitle: string) => {
    if (title === cardTitle) {
        setStatus(true);
        setCorrect(prev => prev + 1);
        setTimeout(loadNewCards, 1000);
        setAttemptsLeft(prev => prev - 1);
    } else {
        setStatus(false);
        setIncorrect(prev => prev + 1);
    }
    if (attemptsLeft - 1 === 0) {
      alert(`Игра окончена! \nПравильных ответов - ${correct} \nНеправильных - ${incorrect}`);
      setAttemptsLeft(11);
    }
  }

  return (
    <>
      <Flex justify='center'>
        <Title>{title}</Title>
      </Flex>
      <Flex wrap="wrap" gap="large" justify="center">
        {array.map((card) => (
          <GameShowItem 
            key={card.id} 
            card={card} 
            check={check}
            status={status}/>
        ))}
      </Flex>
      <Flex justify='center'>
        {status === true ? <h2>Ты молодец!</h2> : status === false ? <h2>Попробуй еще раз</h2>: null}
      </Flex>
    </>
  );
}

export interface IShowCard {
  id: number;
  title: string;
  image: string;
}