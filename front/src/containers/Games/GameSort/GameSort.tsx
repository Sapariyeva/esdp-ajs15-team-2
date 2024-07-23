import { useEffect, useMemo, useRef, useState } from "react";
import shuffle from 'lodash/shuffle';
import { message } from "antd";
import Modal from "antd/es/modal/Modal";
import { useTranslation } from 'react-i18next';

import human from '@/assets/images/gameImg/images/human.png';
import jump from '@/assets/images/gameImg/images/jump.png';
import fly from '@/assets/images/gameImg/images/fly.png';
import shout from '@/assets/images/gameImg/images/shout.png';
import shouting from '@/assets/images/gameImg/images/shout.jfif';
import butterfly from '@/assets/images/gameImg/images/butterfly.avif'

import { ButtonNav } from "@/components/UI/ButtonNav/ButtonNav";
import { Button } from "@/components/UI/Button/Button";
import { useAppSelector } from '@/app/hooks';

import './GameSort.css';

// Интерфейс для карточки
export interface ICard {
    id: number;
    name: string;
    image: string;
    category: string;
}

// Интерфейс для зоны сброса карты
interface DropZone {
    category: string;
    image: string;
}

interface Props {
    endGame: () => void;
    restartGame: () => void;
}

export function GameSort({ endGame, restartGame }: Props) {
    const { t } = useTranslation();
    //Глобальные состояния 
    const isErrorlessLearning = useAppSelector((state) => state.configure.isErrorlessLearning);
    const rotation = useAppSelector((state) => state.configure.rotation);
    const interactiveEnd = useAppSelector((state) => state.configure.interactiveEnd);
    const encouragement = useAppSelector((state) => state.configure.encouragement);
    const encouragementSwitch = useAppSelector((state) => state.configure.encouragementSwitch);
    const audioRef = useRef<HTMLAudioElement>(null);
    const sound = useAppSelector((state) => state.configure.sound); 
    const hintsEnabled = useAppSelector((state) => state.configure.hints);
    const hintsLimit = useAppSelector((state) => state.configure.hintsLimit);
    const autoHints = useAppSelector((state) => state.configure.autoHints);
    const cardPosition = useAppSelector((state) => state.configure.cardPosition);
    const successCriterion = useAppSelector((state) => state.configure.successCriterion);

    // Локальные состояния 
    const [currentCard, setCurrentCard] = useState<ICard | null>(null); // Текущая перетаскиваемая карточка
    const [correct, setCorrect] = useState<number>(0);  // Количество правильных ответов
    const [incorrect, setIncorrect] = useState<number>(0); // Количество неправильных ответов
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // модальное окно
    const [showAnimation, setShowAnimation] = useState<boolean>(false); // Показ анимации в конце игры
    const [highlightCategory, setHighlightCategory] = useState<string | null>(null); // Подсвеченная категория для подсказки
    const [highlightIncorrectCategory, setHighlightIncorrectCategory] = useState<string | null>(null); // Подсвеченная неправильная категория
    const [hintCount, setHintCount] = useState<number>(0); // Количество использованных подсказок
    const [hints, setHints] = useState<boolean>(hintsEnabled); // включены ли подсказки
    const [dropZones, setDropZones] = useState<DropZone[]>([
        { category: t('jump'), image: jump },
        { category: t('shout'), image: shout },
        { category: t('fly'), image: fly }
    ]); // Начальные зоны для сброса карт
    const [successMessage, setSuccessMessage] = useState<string>(""); // Сообщение о критерии успешности 
    const [showGif, setShowGif] = useState<string | null>(null); //Анимация GIF

    // Гифки поощерений 
    const encouragementImages: { [key: string]: string } = {
        'Смайл': '../../../../public/gif/smile.gif',
        'Звезда': '../../../../public/gif/star.gif',
        'Аплодисменты': '../../../../public/gif//applause.gif',
    };

    // Отслеживание звука
    useEffect(() => {
        console.log('Звук:', sound === true ? 'включен' : 'выключен');
        if (audioRef.current) {
          audioRef.current.muted = !sound;
        }
    }, [sound]);

    // Карточки
    const initialCards: ICard[] = [
      { id: 1, name: 'butterfly', image: butterfly, category: t('fly') },
      { id: 2, name: 'human', image: human, category: t('jump') },
      { id: 3, name: 'shouting', image: shouting, category: t('shout') },
    ];

    // Дублируем карточки в зависимости от настроек РОТАЦИИ
    const duplicatedCards: ICard[] = useMemo(() => {
        let cards: ICard[] = [];
        for (let i = 0; i < rotation; i++) {
            cards = cards.concat(initialCards);
        }
        return shuffle(cards);
    }, [rotation]);

    // state карточек
    const [cards, setCards] = useState<ICard[]>(duplicatedCards);

    // обновление состояние карточек если включена ротация 
    useEffect(() => {
        setCards(duplicatedCards);
    }, [duplicatedCards]);

    // Завершение игры
    useEffect(() => {
        if (cards.length === 0) {
            const successPercentage = calculateSuccessPercentage(correct, incorrect); // Расчет процента успешности
            if (interactiveEnd) { // Если включена интерактивная концовка
                setShowAnimation(true);
                setTimeout(() => {
                    setShowAnimation(false);
                    setIsModalVisible(true); // Модальное окно о резултате игры
                }, 2000); 
            } else {
                setIsModalVisible(true);
            }

            // сообщение об КУ в зависимости от процента успешности
            if (successPercentage >= successCriterion) {
                setSuccessMessage(t('success_criterion_achieved'));
            } else {
                setSuccessMessage(t('success_criterion_not_achieved'));
            }
        }
    }, [cards, interactiveEnd, correct, incorrect, successCriterion]);

    // Функция для расчета процента успешности
    function calculateSuccessPercentage(correct: number, incorrect: number) {
        const total = correct + incorrect;
        return total === 0 ? 0 : (correct / total) * 100;
    }

    // Обработчик начала перетаскивания карточки
    function dragStartHandler(e: React.DragEvent<HTMLDivElement>, card: ICard) {
        console.log(e);
        setCurrentCard(card);
        setHighlightCategory(null);
        setHighlightIncorrectCategory(null);
    }

    // Обработчик завершения перетаскивания карточки
    function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.style.background = 'white';
    }

    // Обработчик перетаскивания карточки над зоной сброса
    function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.currentTarget.style.background = 'lightgray';
    }

    // Обработчик сброса карточки в зону сброса
    function dropHandler(e: React.DragEvent<HTMLDivElement>, category: string) {
        e.preventDefault();
        if (currentCard) {
            if (currentCard.category === category) {
                // Если включены поощерения
                if (encouragementSwitch && encouragementImages[encouragement]) {
                    setShowGif(encouragementImages[encouragement]);
                    setTimeout(() => setShowGif(null), 1000);
                } else {
                    message.success(t('right')); // Если нет поощерений
                }

                setCorrect(prev => prev + 1);  // счетчик правильных ответов
                setCards(prevCards => {
                    const cardIndex = prevCards.findIndex(card => card.id === currentCard.id); // Находим индекс текущей карточки
                    return prevCards.filter((_, index) => index !== cardIndex); // Удаляем текущую карточку из массива
                });
            } else { 
                // Если категория карточки не совпадает с категорией зоны сброса
                setIncorrect(prev => { 
                    const newIncorrect = prev + 1; //счетчик неправильных ответов
                    if (hints && newIncorrect >= autoHints) { // Если включены подсказки и количество неправильных ответов достигает порога для автоподсказок
                        setHighlightCategory(currentCard.category); // Подсвечивается правильная категория
                        setHintCount(hintCount + 1); // счетчик использованных подсказок

                        if (hintCount + 1 >= hintsLimit) {
                            setHints(false); // Отключаем подсказки, если достигнут лимит
                        }
                    }

                    // Если включено безошибочное изучение и Изменение положения карточки при ошибке, меняем местами зоны сброса
                    if (cardPosition && isErrorlessLearning) {
                        // Обновляем состояние dropZones, чтобы поменять местами зоны сброса
                        setDropZones(prevDropZones => { 
                            // Создаем копию текущих зон сброса
                            const newDropZones = [...prevDropZones];
                            //индекс зоны сброса, соответствующей категории текущей карточки
                            const currentZoneIndex = newDropZones.findIndex(zone => zone.category === currentCard.category);
                              // массив зон сброса, которые не соответствуют категории текущей карточки
                            const otherZones = newDropZones.filter(zone => zone.category !== currentCard.category);
                            // случайный индекс для выбора одной из других зон сброса
                            const randomIndex = Math.floor(Math.random() * otherZones.length);
                             // индекс другой зоны сброса, выбранной случайным образом
                            const otherZoneIndex = newDropZones.findIndex(zone => zone.category === otherZones[randomIndex].category);

                            // Меняем местами текущую зону сброса и случайно выбранную другую зону сброса
                            const temp = newDropZones[currentZoneIndex];
                            newDropZones[currentZoneIndex] = newDropZones[otherZoneIndex];
                            newDropZones[otherZoneIndex] = temp;

                            return newDropZones;
                        });
                    }

                    setHighlightIncorrectCategory(category); // Подсвечиваем неправильную категорию
                    setTimeout(() => setHighlightIncorrectCategory(null), 1000);

                    return newIncorrect;
                });

                // Если обучение с ошибками, удаляем карточку после неправильного ответа
                if (!isErrorlessLearning) {
                    setCards(prevCards => {
                        const cardIndex = prevCards.findIndex(card => card.id === currentCard.id);
                        return prevCards.filter((_, index) => index !== cardIndex);
                    });
                }
            }
        }
        e.currentTarget.style.background = 'white';
    }

    // Обработчик закрытия модального окна
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Обработчик подсказки
    const handleHint = () => {
        if (cards.length > 0) { 
            const nextCard = cards.find(card => !highlightCategory || card.category !== highlightCategory);// Находим следующую карточку
            if (nextCard) {
                setHighlightCategory(nextCard.category); // Подсвечиваем правильную категорию следующей карточки
                setHintCount(prev => { 
                    const newHintCount = prev + 1; // счетчик использованных подсказок
    
                    if (newHintCount >= hintsLimit) {
                        setHints(false); 
                    }
    
                    return newHintCount;
                });
            }
        }
    };

    return (
        <div className="game">
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
            <div className="drop-zones">
                {dropZones.map((zone, index) => (
                    <div
                        key={index}
                        className={`drop-zone ${highlightCategory === zone.category ? 'highlight' : ''} ${highlightIncorrectCategory === zone.category ? 'highlight-incorrect' : ''}`}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDrop={(e) => dropHandler(e, zone.category)}
                        onDragLeave={(e) => dragEndHandler(e)}
                        onDragEnd={(e) => dragEndHandler(e)}
                    >
                        <img src={zone.image} alt={zone.category} />
                    </div>
                ))}
            </div>
            <div className="card-deck">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        draggable={true}
                        onDragStart={(e) => dragStartHandler(e, card)}
                        onDragLeave={(e) => dragEndHandler(e)}
                        onDragEnd={(e) => dragEndHandler(e)}
                        onDragOver={(e) => dragOverHandler(e)}
                        className="card"
                    >
                        <img src={card.image} alt={card.name} />
                    </div>
                ))}
            </div>
            <Modal
                open={showAnimation}
                footer={null}
                closable={false}
                style={{width:'500px', height: '500px'}}
            >
                <img src= "../../../public/gif/unicorn.gif" style={{width:'400px', height: '400px'}}/> 
            </Modal>
            <Modal
                title={t('game_ended')}
                open={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button size="md" type="primary" key="endGame" onClick={endGame} title={t('end_game')}></Button>,
                    <Button size="md" type="default" key="restartGame" onClick={restartGame} title={t('restart_game')}></Button>
                ]}
            >
                <p>{t('correct_placements')}: {correct}</p>
                <p>{t('incorrect_placements')}: {incorrect}</p>
                <p>{t('percentage_of_correct_answers')}: {calculateSuccessPercentage(correct, incorrect).toFixed(2)}%</p>
                <p>{successMessage}</p>
            </Modal>
        </div>
    );
}
