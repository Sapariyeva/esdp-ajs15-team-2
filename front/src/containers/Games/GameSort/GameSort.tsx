import React, { useEffect, useMemo, useRef, useState } from "react";
import './GameSort.css';
import shuffle from 'lodash/shuffle';
import { message } from "antd";

import jump from './../../public/images/human.png';
import fly from './../../public/images/fly.png';
import shout from './../../public/images/shout.png';
import musicLogo from '../../public/images/music_cast.png'
import Modal from "antd/es/modal/Modal";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { ButtonNav } from "@/components/UI/ButtonNav/ButtonNav";
import { Button } from "@/components/UI/Button/Button";
import { fetchCards } from "@/features/configureSlice";

export interface ICard {
    id: number;
    name: string;
    image: string;
    category: string;
}

interface DropZone {
    category: string;
    image: string;
}

interface Props {
    endGame: () => void;
    restartGame: () => void;
}

export function GameSort({ endGame, restartGame }: Props) {
    const dispatch = useAppDispatch();
    const cardsServer = useAppSelector((state) => state.configure.cards);
    const selectedCategories = useAppSelector((state) => state.configure.selectedCategories);
    const isLoading = useAppSelector((state) => state.configure.loading);
    const error = useAppSelector((state) => state.configure.error);

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
    const errorHandling = useAppSelector((state) => state.configure.errorHandling);

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
        { category: 'jump', image: jump },
        { category: 'shout', image: shout },
        { category: 'fly', image: fly }
    ]); 
    const [successMessage, setSuccessMessage] = useState<string>(""); 
    const [showGif, setShowGif] = useState<string | null>(null); 

    const encouragementImages: { [key: string]: string } = {
        'Смайлик': '../../public/gif/smile.gif',
        'Звезда': '../../public/gif/star.gif',
        'Аплодисменты': '../../public/gif/applause.gif',
    };

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

    useEffect(() => {
        if (cards.length === 0) {
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
    }, [cards, interactiveEnd, correct, incorrect, successCriterion]);

    function calculateSuccessPercentage(correct: number, incorrect: number) {
        const total = correct + incorrect;
        return total === 0 ? 0 : (correct / total) * 100;
    }

    function dragStartHandler(e: React.DragEvent<HTMLDivElement>, card: ICard) {
        console.log(e);
        setCurrentCard(card);
        setHighlightCategory(null);
        setHighlightIncorrectCategory(null);
    }

    function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.style.background = 'white';
    }

    function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.currentTarget.style.background = 'lightgray';
    }

    function dropHandler(e: React.DragEvent<HTMLDivElement>, category: string) {
        e.preventDefault();
        if (currentCard) {
            if (currentCard.category === category) {
                if (encouragementSwitch && encouragementImages[encouragement]) {
                    setShowGif(encouragementImages[encouragement]);
                    setTimeout(() => setShowGif(null), 1000);
                } else {
                    message.success('Верно');
                }
    
                setCorrect(prev => prev + 1);
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
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    }

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
                <p>Верных размещений: {correct}</p>
                <p>Неверных размещений: {incorrect}</p>
                <p>Процент правильных ответов: {calculateSuccessPercentage(correct, incorrect).toFixed(2)}%</p>
                <p>{successMessage}</p>
            </Modal>
        </div>
    );
}
