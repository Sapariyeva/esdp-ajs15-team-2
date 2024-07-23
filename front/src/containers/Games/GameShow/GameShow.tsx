import { useEffect, useState } from 'react';
import { Flex, Typography } from 'antd';
import { message } from "antd";
import Modal from "antd/es/modal/Modal";
import _ from 'lodash';
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchCards } from '@/features/showCardSlice';
import { ButtonNav } from '@/components/UI/ButtonNav/ButtonNav';
import { Button } from '@/components/UI/Button/Button';
import { GameShowItem } from './GameShowItem';

const { Title } = Typography;
  
interface Props {
  endGame: () => void;
  restartGame: () => void;
}

export function GameShow({ endGame, restartGame }: Props) {
  const dispatch = useAppDispatch();
  const interactiveEnd = useAppSelector((state) => state.configure.interactiveEnd);
  const encouragement = useAppSelector((state) => state.configure.encouragement);
  const encouragementSwitch = useAppSelector((state) => state.configure.encouragementSwitch);
  const hintsEnabled = useAppSelector((state) => state.configure.hints);
  const hintsLimit = useAppSelector((state) => state.configure.hintsLimit);
  const autoHints = useAppSelector((state) => state.configure.autoHints);
  const successCriterion = useAppSelector((state) => state.configure.successCriterion);

  const [hints, setHints] = useState<boolean>(hintsEnabled); 
  const [title, setTitle] = useState<string>("");
  const [status, setStatus] = useState<boolean | null>(null);
  const [correct, setCorrect] = useState<number>(0);
  const [incorrect, setIncorrect] = useState<number>(0);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [showGif, setShowGif] = useState<string | null>(null);
  const [hintCount, setHintCount] = useState<number>(0); 
  const [currentIndex, setCurrentIndex] = useState(0);
  //TODO: Удален setStateCards как неиспользуемый. Ошибка при npm run build
  const [stateCards] = useState<IShowCard[][]>([
    [
      {
        id: 1,
        image: "https://bober.ru/sites/default/files/styles/large_keep_aspect/public/news/2020-08/shutterstock_157245107.jpg?itok=49HBznby",
        title: "Кричать",
      },
      {
        id: 2,
        image: "https://ss.sport-express.ru/userfiles/materials/199/1995178/volga.jpg",
        title: "Плакать",
      },
      {
        id: 3,
        image: "https://media.istockphoto.com/id/1388204068/ru/%D1%84%D0%BE%D1%82%D0%BE/%D1%81%D1%87%D0%B0%D1%81%D1%82%D0%BB%D0%B8%D0%B2%D1%8B%D0%B9-%D0%BC%D0%BE%D0%BB%D0%BE%D0%B4%D0%BE%D0%B9-%D0%B1%D0%B8%D0%B7%D0%BD%D0%B5%D1%81%D0%BC%D0%B5%D0%BD-%D0%BF%D1%80%D1%8B%D0%B3%D0%B0%D0%B5%D1%82.jpg?s=612x612&w=0&k=20&c=dYJ82FzrHpZaggVQ-rsVZFgtTvlUVV9Y5YLPnKlePd8=",
        title: "Прыгать",
      },
    ],
    [
      {
        id: 1,
        image: "https://media.istockphoto.com/id/1388204068/ru/%D1%84%D0%BE%D1%82%D0%BE/%D1%81%D1%87%D0%B0%D1%81%D1%82%D0%BB%D0%B8%D0%B2%D1%8B%D0%B9-%D0%BC%D0%BE%D0%BB%D0%BE%D0%B4%D0%BE%D0%B9-%D0%B1%D0%B8%D0%B7%D0%BD%D0%B5%D1%81%D0%BC%D0%B5%D0%BD-%D0%BF%D1%80%D1%8B%D0%B3%D0%B0%D0%B5%D1%82.jpg?s=612x612&w=0&k=20&c=dYJ82FzrHpZaggVQ-rsVZFgtTvlUVV9Y5YLPnKlePd8=",
        title: "Прыгать",
      },
      {
        id: 2,
        image: "https://bober.ru/sites/default/files/styles/large_keep_aspect/public/news/2020-08/shutterstock_157245107.jpg?itok=49HBznby",
        title: "Кричать",
      },
      {
        id: 3,
        image: "https://cdn.pixabay.com/photo/2020/11/16/09/42/bird-5748517_1280.jpg",
        title: "Летать",
      },
    ],
    [
      {
        id: 1,
        image: "https://bober.ru/sites/default/files/styles/large_keep_aspect/public/news/2020-08/shutterstock_157245107.jpg?itok=49HBznby",
        title: "Кричать",
      },
      {
        id: 2,
        image: "https://ss.sport-express.ru/userfiles/materials/199/1995178/volga.jpg",
        title: "Плакать",
      },
      {
        id: 3,
        image: "https://vesti.kz/userdata/news/2023/news_324927/crop_b/photo_192682.jpg",
        title: "Бегать",
      },
    ],
    [
      {
        id: 1,
        image: "https://media.istockphoto.com/id/1388204068/ru/%D1%84%D0%BE%D1%82%D0%BE/%D1%81%D1%87%D0%B0%D1%81%D1%82%D0%BB%D0%B8%D0%B2%D1%8B%D0%B9-%D0%BC%D0%BE%D0%BB%D0%BE%D0%B4%D0%BE%D0%B9-%D0%B1%D0%B8%D0%B7%D0%BD%D0%B5%D1%81%D0%BC%D0%B5%D0%BD-%D0%BF%D1%80%D1%8B%D0%B3%D0%B0%D0%B5%D1%82.jpg?s=612x612&w=0&k=20&c=dYJ82FzrHpZaggVQ-rsVZFgtTvlUVV9Y5YLPnKlePd8=",
        title: "Прыгать",
      },
      {
        id: 2,
        image: "https://cdn.pixabay.com/photo/2020/11/16/09/42/bird-5748517_1280.jpg",
        title: "Летать",
      },
      {
        id: 3,
        image: "https://ss.sport-express.ru/userfiles/materials/199/1995178/volga.jpg",
        title: "Плакать",
      },
    ],
    [
      {
        id: 1,
        image: "https://vesti.kz/userdata/news/2023/news_324927/crop_b/photo_192682.jpg",
        title: "Бегать",
      },
      {
        id: 2,
        image: "https://ss.sport-express.ru/userfiles/materials/199/1995178/volga.jpg",
        title: "Плакать",
      },
      {
        id: 3,
        image: "https://cdn.pixabay.com/photo/2020/11/16/09/42/bird-5748517_1280.jpg",
        title: "Летать",
      },
    ]
  ]);

  const encouragementImages: { [key: string]: string } = {
    'Смайл': '../../../../public/gif/smile.gif',
    'Звезда': '../../../../public/gif/star.gif',
    'Аплодисменты': '../../../../public/gif//applause.gif',
  };

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  useEffect(() => {
    const randomCard = _.sample(stateCards[currentIndex]);
    if (randomCard) {
      setTitle(randomCard.title);
    }
    if (stateCards.length === 0) {
      const successPercentage = calculateSuccessPercentage(correct, incorrect);
      if (interactiveEnd) {
        setShowAnimation(true);
        setTimeout(() => {
          setShowAnimation(false);
          setIsModalVisible(true);
        }, 2000);
      } else {
        setIsModalVisible(true);
      }

      if (successPercentage >= successCriterion) {
        setSuccessMessage("Критерий успешности достигнут");
      } else {
        setSuccessMessage("Критерий успешности не достигнут");
      }
    }
  }, [stateCards, interactiveEnd, correct, incorrect, successCriterion]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleNextArray = () => {
    if (currentIndex < stateCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsModalVisible(true);
    }
  };

  const check = (cardTitle: string) => {
    if (title === cardTitle) {
      if (encouragementSwitch && encouragementImages[encouragement]) {
        setShowGif(encouragementImages[encouragement]);
        setTimeout(() => setShowGif(null), 1000);
      } else {
        message.success('Верно');
      }
      setStatus(true);
      setCorrect(prev => prev + 1);
      handleNextArray();
    } else {
      setStatus(false);
      setIncorrect(prev => {
        const newIncorrect = prev + 1;
        if (hints && newIncorrect >= autoHints) {
          setHintCount(hintCount + 1); 
          if (hintCount + 1 >= hintsLimit) {
            setHints(false); 
          }
        }
        return newIncorrect;
      });
    }
  }
  
  function calculateSuccessPercentage(correct: number, incorrect: number) {
    const total = correct + incorrect;
    return total === 0 ? 0 : (correct / total) * 100;
  }
  
  return (
    <>
      <div className='game'>
        <div className="game-buttons">
          <ButtonNav style={{ marginLeft: 30 }} type="close" onClick={endGame} size="sm"></ButtonNav>
            {hints && (
              <Button 
                style={{ marginRight: 100, width: 136, height: 53 }} 
                type="default" size="md" title="Подсказка"
              ></Button>
            )}
        </div>
        {showGif && (
          <div className="gif-container">
            <img src={showGif} alt="encouragement" className="encouragement-gif" />
          </div>
        )}
        <Flex justify='center'>
          <Title>{title}</Title>
        </Flex>
        <Flex wrap="wrap" gap="large" justify="center">
          {stateCards[currentIndex].map((card) => (
            <GameShowItem 
              key={card.id} 
              card={card} 
              check={check}
              status={status}
            />
          ))}
        </Flex>
        <Modal
          open={showAnimation}
          footer={null}
          closable={false}
          style={{width:'500px', height: '500px'}}
        >
          <img src='../../../public/gif/unicorn.gif' style={{width:'400px', height: '400px'}}/>
        </Modal>
        <Modal
          title="Игра завершена!"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button size="md" type="primary" key="endGame" onClick={endGame} title="Завершить игру"></Button>,
            <Button size="md" type="default" key="restartGame" onClick={restartGame} title="Перезапустить игру"></Button>
          ]}
        >
          <p>Верных размещений: {correct}</p>
          <p>Неверных размещений: {incorrect}</p>
          <p>Процент правильных ответов:{calculateSuccessPercentage(correct, incorrect).toFixed(2)}%
          </p>
          <p>{successMessage}</p>
        </Modal>
      </div>
    </>
  );
}

export interface IShowCard {
  id: number;
  title: string;
  image: string;
}