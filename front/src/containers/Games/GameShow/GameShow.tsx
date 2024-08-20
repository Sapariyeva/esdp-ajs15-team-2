import { useEffect, useMemo, useState } from 'react';
import { Flex, Typography } from 'antd';
import { GameShowItem } from './GameShowItem';
import Modal from "antd/es/modal/Modal";
import { shuffle } from 'lodash';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchShowCards } from '@/features/showCardSlice';
import { ButtonNav } from '@/components/UI/ButtonNav/ButtonNav';
import { Button } from '@/components/UI/Button/Button';

const { Title } = Typography;

interface Props {
  endGame: () => void;
  restartGame: () => void;
}

export function GameShow({ endGame, restartGame }: Props) {
  const dispatch = useAppDispatch();
  const { showCards } = useAppSelector((state) => state.showCards);
  const isErrorlessLearning = useAppSelector((state) => state.configure.isErrorlessLearning);
  const rotation = useAppSelector((state) => state.configure.rotation);
  const interactiveEnd = useAppSelector((state) => state.configure.interactiveEnd);
  const encouragement = useAppSelector((state) => state.configure.encouragement);
  const encouragementSwitch = useAppSelector((state) => state.configure.encouragementSwitch);
  const hintsEnabled = useAppSelector((state) => state.configure.hints);
  const hintsLimit = useAppSelector((state) => state.configure.hintsLimit);
  const autoHints = useAppSelector((state) => state.configure.autoHints);
  const successCriterion = useAppSelector((state) => state.configure.successCriterion);
  const selectedCategories = useAppSelector((state) => state.configure.selectedCategories);

  const [hints, setHints] = useState<boolean>(hintsEnabled); 
  const [category, setCategory] = useState<string | null>(null);
  const [correct, setCorrect] = useState<number>(0);
  const [incorrect, setIncorrect] = useState<number>(0);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [showGif, setShowGif] = useState<string | null>(null);
  const [hintCount, setHintCount] = useState<number>(0); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [highlightCategory, setHighlightCategory] = useState<string | null>(null); 
  const [highlightIncorrectCategory, setHighlightIncorrectCategory] = useState<string | null>(null); 
  const [lastIndex, setLastIndex] = useState<number | null>(null);

  const encouragementImages: { [key: string]: string } = {
    'Смайлик': '../../public/gif/smile.gif',
    'Звезда': '../../public/gif/star.gif',
    'Аплодисменты': '../../public/gif/applause.gif',
  };

  useEffect(() => {
    dispatch(fetchShowCards(selectedCategories));
  }, [dispatch, selectedCategories]);

  const duplicatedCards: IShowCard[][] = useMemo(() => {
    let cards: IShowCard[][] = [];
    
    for (let i = 0; i < rotation; i++) {
        cards = cards.concat(showCards);
    }
        
    return cards;
  }, [rotation, showCards]);

  const [cards, setCards] = useState<IShowCard[][]>(duplicatedCards);

  useEffect(() => {
    if (duplicatedCards.length > 0) {
      let newCards = [...duplicatedCards];
      if (lastIndex !== null && newCards.length > 1) {
        const currentIndex = newCards.findIndex((_, index) => index !== lastIndex);
        newCards = [newCards[currentIndex], ...newCards.filter((_, index) => index !== currentIndex)];
      }
      setCards(newCards);
      setLastIndex(newCards.length > 0 ? 0 : null);
    }
  }, [duplicatedCards, lastIndex]);

  useEffect(() => {
    if (cards[currentIndex] && cards[currentIndex].length > 0) {
      const firstCardCategory = cards[currentIndex][0].category;
      setCategory(firstCardCategory);
    } else {
      setCategory(null);
    }

    if (cards.length === 0 && correct + incorrect < 0) {
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
  }, [cards, interactiveEnd, correct, incorrect, successCriterion, currentIndex]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleNextArray = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsModalVisible(true);
    }
  };

  const handleHint = () => {
    if (cards.length > 0) { 
        const nextCard = cards.find(card => !highlightCategory || card[currentIndex].category !== highlightCategory);
        if (nextCard) {
            setHighlightCategory(nextCard[currentIndex].category);
            setHintCount(prev => { 
                const newHintCount = prev + 1;

                if (newHintCount >= hintsLimit) {
                    setHints(false); 
                }

                return newHintCount;
            });
        }
    }
  };

  const check = (cardCategory: string) => {
    if (!isErrorlessLearning) {
      if (category === cardCategory) {
        if (encouragementSwitch && encouragementImages[encouragement]) {
            setShowGif(encouragementImages[encouragement]);
            setTimeout(() => setShowGif(null), 1000);
        }
        setHighlightCategory(cardCategory);
        setCorrect(prev => prev + 1);
        setTimeout(() => {
          handleNextArray();
          setHighlightCategory(null);
        }, 1000);
      } else {
        setHighlightIncorrectCategory(cardCategory);
          setIncorrect(prev => {
            const newIncorrect = prev + 1;
            if (hints && newIncorrect >= autoHints) {
              setHintCount(hintCount + 1); 
              if (hintCount + 1 >= hintsLimit) {
                setHints(false); 
              }
            }
            setTimeout(() => {
              handleNextArray();
              setHighlightIncorrectCategory(null);
            }, 1000);
            return newIncorrect;
          });
      }
    } else {
      if (category === cardCategory) {
        if (encouragementSwitch && encouragementImages[encouragement]) {
          setShowGif(encouragementImages[encouragement]);
          setTimeout(() => setShowGif(null), 1000);
        }
        setHighlightCategory(cardCategory);
        setCorrect(prev => prev + 1);
        setTimeout(() => {
          handleNextArray();
          setHighlightCategory(null);
        }, 1000);
      } else {
        setHighlightIncorrectCategory(cardCategory);
        setIncorrect(prev => {
          const newIncorrect = prev + 0;
          if (hints && newIncorrect >= autoHints) {
            setHintCount(hintCount + 1); 
            if (hintCount + 1 >= hintsLimit) {
              setHints(false); 
            }
          }
          setCards(prevCards => {
            const updatedCards = [...prevCards];
            const currentCategory = updatedCards[currentIndex][0].category;
            updatedCards[currentIndex] = shuffle(updatedCards[currentIndex].map(card => ({ ...card, category: currentCategory })));
            return updatedCards;
          });
          setHighlightIncorrectCategory(null);
          return newIncorrect;
        });
      }
    }
  };

  function calculateSuccessPercentage(correct: number, incorrect: number) {
    const total = correct + incorrect;
    return total === 0 ? 0 : (correct / total) * 100;
  }

  const shuffledCards = useMemo(() => {
    return cards[currentIndex]?.length > 0 
      ? shuffle(cards[currentIndex])
      : [];
  }, [cards, currentIndex]);

  return (
    <>
    <div className='game'>
      <div className="game-buttons">
                  <ButtonNav style={{ marginLeft: 30 }} type="close" onClick={endGame} size="sm"></ButtonNav>
                  {hints && (
                      <Button style={{ marginRight: 100, width: 136, height: 53 }} type="default" size="md" title="Подсказка" onClick={handleHint}></Button>
                  )}
              </div>
              {showGif && (
                  <div className="gif-container">
                      <img src={showGif} alt="encouragement" className="encouragement-gif" />
                  </div>
              )}
      <Flex justify='center'>
          <Title>{category}</Title>
        </Flex>
        <Flex wrap="wrap" gap="large" justify="center">
          {shuffledCards.map((card) => (
          <GameShowItem 
            key={card.id} 
            card={card} 
            check={check}
            isHighlighted={highlightCategory === card.category}
            isIncorrect={highlightIncorrectCategory === card.category}
          />
        ))}
        </Flex>
        <Modal
          open={showAnimation}
          footer={null}
          closable={false}
          style={{width:'500px', height: '500px'}}
        >
            <img src='../../public/gif/unicorn.gif' style={{width:'400px', height: '400px'}}/>
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
            <p>Верных ответов: {correct}</p>
            <p>Неверных ответов: {incorrect}</p>
            <p>Процент правильных ответов: {calculateSuccessPercentage(correct, incorrect).toFixed(2)}%</p>
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
  category: string;
  video: string;
}