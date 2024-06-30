import { useEffect, useState } from "react";
import shuffle from 'lodash/shuffle';
import { message, Modal, Button } from "antd";
import cabinetImage from '@/assets/images/sortingGameImg/cabinet.jpg';
import iphoneImage from '@/assets/images/sortingGameImg/iphone.jpg';
import tvImage from '@/assets/images/sortingGameImg/tv.jpg';
import appleImage from '@/assets/images/sortingGameImg/apple.jpg';
import pineappleImage from '@/assets/images/sortingGameImg/pineapple.jpg';
import closetImage from '@/assets/images/sortingGameImg/closet.jpg';
import './SortingGame.css';

export interface ICard {
    id: number;
    order: number;
    name: string;
    image: string;
    category: string;
}

interface Props {
    endGame: () => void;
    restartGame: () => void;
}

export function SortingGame({ endGame, restartGame }: Props) {
    const [cards, setCards] = useState<ICard[]>([
        {id: 1, order: 1, name: 'iPhone', image: iphoneImage, category: 'Электроника'},
        {id: 2, order: 2, name: 'Телевизор', image: tvImage, category: 'Электроника'},
        {id: 3, order: 3, name: 'Яблоко', image: appleImage, category: 'Фрукты'},
        {id: 4, order: 4, name: 'Ананас', image: pineappleImage, category: 'Фрукты'},
        {id: 5, order: 5, name: 'Шкаф', image: closetImage, category: 'Мебель'},
        {id: 6, order: 6, name: 'Тумба', image: cabinetImage, category: 'Мебель'}
    ]);
    const [currentCard, setCurrentCard] = useState<ICard | null>(null);
    const [correct, setCorrect] = useState<number>(0);
    const [incorrect, setIncorrect] = useState<number>(0);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    useEffect(() => {
        setCards(prevCards => shuffle(prevCards)); 
    }, []); 

    useEffect(() => {
        if (cards.length === 0) {
            setIsModalVisible(true);
        }
    }, [cards]);

    function dragStartHandler(e: React.DragEvent<HTMLDivElement>, card: ICard) {
        //TODO: Добавлен console.log(e) как решение проблемы. Ошибка при npm run build
        console.log(e)
        setCurrentCard(card);
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
                message.success('Верно');
                setCorrect(prev => prev + 1);
            } else {
                message.error('Неверно');
                setIncorrect(prev => prev + 1);
            }

            setCards(prevCards => {
                const newCards = [...prevCards];
                newCards.pop();
                return newCards;
            });
        }
        e.currentTarget.style.background = 'white';
    }

    const lastCard = cards[cards.length - 1];

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="game">
            <div className="drop-zones">
                <div
                    className="drop-zone"
                    onDragOver={(e) => dragOverHandler(e)}
                    onDrop={(e) => dropHandler(e, 'Мебель')}
                    onDragLeave={(e) => dragEndHandler(e)}
                    onDragEnd={(e) => dragEndHandler(e)}
                >
                    <img src="../../../public/images/sortingGameImg/furniture.jpg" alt="Мебель" />
                </div>
                <div
                    className="drop-zone"
                    onDragOver={(e) => dragOverHandler(e)}
                    onDrop={(e) => dropHandler(e, 'Фрукты')}
                    onDragLeave={(e) => dragEndHandler(e)}
                    onDragEnd={(e) => dragEndHandler(e)}
                >
                    <img src="../../../public/images/sortingGameImg/fruits.jpg" alt="Фрукты" />
                </div>
                <div
                    className="drop-zone"
                    onDragOver={(e) => dragOverHandler(e)}
                    onDrop={(e) => dropHandler(e, 'Электроника')}
                    onDragLeave={(e) => dragEndHandler(e)}
                    onDragEnd={(e) => dragEndHandler(e)}
                >
                    <img src="../../public/images/sortingGameImg/gadgets.jpg" alt="Электроника" />
                </div>
            </div>
            <div className="card-deck">
                {lastCard && (
                    <div
                        key={lastCard.id}
                        draggable={true}
                        onDragStart={(e) => dragStartHandler(e, lastCard)}
                        onDragLeave={(e) => dragEndHandler(e)}
                        onDragEnd={(e) => dragEndHandler(e)}
                        onDragOver={(e) => dragOverHandler(e)}
                        className="card-game"
                    >
                        <img src={lastCard.image} alt={lastCard.name} />
                    </div>
                )}
            </div>
            <Modal
                title="Игра завершена!"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button type="primary" key="endGame" onClick={endGame}>
                        Завершить игру
                    </Button>,
                    <Button type="default" key="restartGame" onClick={restartGame}>
                        Перезапустить игру
                    </Button>
                ]}
            >
                <p>Верных размещений: {correct}</p>
                <p>Неверных размещений: {incorrect}</p>
            </Modal>
        </div>
    );
}