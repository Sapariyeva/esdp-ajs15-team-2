import React, { useEffect, useMemo, useRef, useState } from "react";
import shuffle from 'lodash/shuffle';
import { message } from "antd";
import Modal from "antd/es/modal/Modal";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useTranslation } from 'react-i18next';

import jump from '@/assets/images/gameImg/images/jump.png';
import fly from '@/assets/images/gameImg/images/fly.png';
import shout from '@/assets/images/gameImg/images/shout.png';
import musicLogo from '@/assets/images/gameImg/images/music_cast.png'

import { ButtonNav } from "@/components/UI/ButtonNav/ButtonNav";
import { Button } from "@/components/UI/Button/Button";
import { fetchCards } from "@/features/configureSlice";
import './GameSort.css';

// Инттерфейс для карточки
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

    const dispatch = useAppDispatch();
    const { selectedCategories, error, isErrorlessLearning, 
        rotation, interactiveEnd, encouragement, encouragementSwitch, 
        sound, hintsLimit, autoHints, cardPosition, successCriterion, errorHandling
    } = useAppSelector((state) => state.configure);
    const cardsServer = useAppSelector((state) => state.configure.cards);
    const isLoading = useAppSelector((state) => state.configure.loading);
    const hintsEnabled = useAppSelector((state) => state.configure.hints);

    const audioRef = useRef<HTMLAudioElement>(null);

    const [currentCard, setCurrentCard] = useState<ICard | null>(null);
    const [correct, setCorrect] = useState<number>(0);  
    const [incorrect, setIncorrect] = useState<number>(0); 
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false); 
    const [showAnimation, setShowAnimation] = useState<boolean>(false); 
    const [highlightCategory, setHighlightCategory] = useState<string | null>(null); 
    const [highlightIncorrectCategory, setHighlightIncorrectCategory] = useState<string | null>(null); 
    const [hintCount, setHintCount] = useState<number>(0); 
    const [hints, setHints] = useState<boolean>(hintsEnabled); 
    const [dropZones, setDropZones] = useState<DropZone[]>([
        { category: 'Прыгать', image: jump },
        { category: 'Кричать', image: shout },
        { category: 'Летать', image: fly }
    ]); // Начальные зоны для сброса карт
    const [successMessage, setSuccessMessage] = useState<string>(""); 
    const [showGif, setShowGif] = useState<string | null>(null); 

    // Гифки поощерений 
    const encouragementImages: { [key: string]: string } = {
        'Смайлик': '../../../../public/gif/smile.gif',
        'Звезда': '../../../../public/gif/star.gif',
        'Аплодисменты': '../../../../public/gif/applause.gif',
    };

    // Отслеживание звука
    useEffect(() => {
        console.log('Звук:', sound === true ? 'включен' : 'выключен');
        if (audioRef.current) {
          audioRef.current.muted = !sound;
        }
    }, [sound]);

    useEffect(() => {
        dispatch(fetchCards());
    }, [dispatch]);

    const duplicatedCards: ICard[] = useMemo(() => {
        let cards: ICard[] = [];
        for (let i = 0; i < rotation; i++) {
            cards = cards.concat(cardsServer);
        }
        return shuffle(cards);
    }, [rotation, cardsServer]);

    const [cards, setCards] = useState<ICard[]>(duplicatedCards);

    useEffect(() => {
        const filteredCards = duplicatedCards.filter(card => selectedCategories.includes(card.category));
        setCards(filteredCards);
    }, [duplicatedCards, selectedCategories]);

    // Завершение игры
    useEffect(() => {
        if (cards.length === 0) {
            const successPercentage = calculateSuccessPercentage(correct, incorrect);
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
                if (encouragementSwitch && encouragementImages[encouragement]) {
                    setShowGif(encouragementImages[encouragement]);
                    setTimeout(() => setShowGif(null), 1000);
                } else {
                    message.success(t('right')); // Если нет поощерений
                }
    
                setCorrect(prev => prev + 1); // счетчик правильных ответов
                setCards(prevCards => prevCards.filter(card => card.id !== currentCard.id));
            } else {
                setIncorrect(prev => {
                    const newIncorrect = prev + 1;
                    if (hints && newIncorrect >= autoHints) {
                        setHighlightCategory(currentCard.category);
                        setHintCount(hintCount + 1);
    
                        if (hintCount + 1 >= hintsLimit) {
                            setHints(false);
                        }
                    }
    
                    if (cardPosition) {
                        setDropZones(prevDropZones => {
                            const newDropZones = [...prevDropZones];
                            const currentZoneIndex = newDropZones.findIndex(zone => zone.category === currentCard.category);
                            const otherZones = newDropZones.filter(zone => zone.category !== currentCard.category);
                            const randomIndex = Math.floor(Math.random() * otherZones.length);
                            const otherZoneIndex = newDropZones.findIndex(zone => zone.category === otherZones[randomIndex].category);
    
                            const temp = newDropZones[currentZoneIndex];
                            newDropZones[currentZoneIndex] = newDropZones[otherZoneIndex];
                            newDropZones[otherZoneIndex] = temp;
    
                            return newDropZones;
                        });
                    }
    
                    setHighlightIncorrectCategory(category);
                    setTimeout(() => setHighlightIncorrectCategory(null), 1000);
    
                    if (errorHandling) {
                        setCards(prevCards => {
                            const sameCategoryCards = prevCards.filter(card => card.category === currentCard.category && card.id !== currentCard.id);
                            if (sameCategoryCards.length > 0) {
                                const newCard = sameCategoryCards[Math.floor(Math.random() * sameCategoryCards.length)];
                                const updatedCards = prevCards.map(card =>
                                    card.id === currentCard.id ? { ...newCard, id: card.id } : card
                                );
                                return updatedCards;
                            } else {
                                return prevCards;
                            }
                        });
                    } else {
                        setCards(prevCards => {
                            const cardIndex = prevCards.findIndex(card => card.id === currentCard.id);
                            const updatedCards = [...prevCards];
                            const [movedCard] = updatedCards.splice(cardIndex, 1);
                            updatedCards.push(movedCard);
                            return updatedCards;
                        });
                    }
    
                    return newIncorrect;
                });
    
                if (!isErrorlessLearning) {
                    setCards(prevCards => prevCards.filter(card => card.id !== currentCard.id));
                }
            }
        }
        e.currentTarget.style.background = 'white';
    }
    
    
    

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleHint = () => {
        if (cards.length > 0) { 
            const nextCard = cards.find(card => !highlightCategory || card.category !== highlightCategory);
            if (nextCard) {
                setHighlightCategory(nextCard.category);
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

    if (isLoading) {
        return <div>{t('loading')}</div>;
    }

    if (error) {
        return <div>{t('error')}: {error.message}</div>;
    }

    return (
        <div className="game">
            <div className="game-buttons">
                <ButtonNav style={{ marginLeft: 30, marginTop: 30 }} type="close" onClick={endGame} size="sm"></ButtonNav>
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
            <div className="deck">
            {sound && (
                    <div className="music-logo">
                        <img src={musicLogo} alt="Music Logo" />
                    </div>
                )}
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
            </div>
            <Modal
                open={showAnimation}
                footer={null}
                closable={false}
                style={{width:'500px', height: '500px'}}
            >
                <img src='../../../public/gif/unicorn.gif' style={{width:'400px', height: '400px'}}/>
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
