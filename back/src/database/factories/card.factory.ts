import { setSeederFactory } from 'typeorm-extension';
import { Card } from '@/entities/card.entity';

let currentIndex = 0;

export const CardFactory = setSeederFactory(Card, async() => {

    const cards = [
        {
            title: 'bird',
            image: 'https://t3.ftcdn.net/jpg/00/01/67/22/360_F_1672292_MKhwogQwoY49XYQwJwLIoC4ngPIoBY.jpg',
            video: '123',
            category: 'Летать',
        },
        {
            title: 'cry',
            image: 'https://ss.sport-express.ru/userfiles/materials/199/1995178/volga.jpg',
            video: '123',
            category: 'Плакать',
        },
        {
            title: 'run',
            image: 'https://vesti.kz/userdata/news/2023/news_324927/crop_b/photo_192682.jpg',
            video: '123',
            category: 'Бегать',
        },
        {
            title: 'jump',
            image: 'https://ss.sport-express.ru/userfiles/materials/188/1883295/volga.jpg',
            video: '123',
            category: 'Прыгать',
        },
        {
            title: 'scream',
            image: 'https://bober.ru/sites/default/files/styles/large_keep_aspect/public/news/2020-08/shutterstock_157245107.jpg?itok=49HBznby',
            video: '123',
            category: 'Кричать',
        },
        {
            title: 'sleep',
            image: 'https://ss.sport-express.ru/userfiles/materials/186/1869607/volga.jpg',
            video: '123',
            category: 'Спать',
        },
        {
            title: 'sad',
            image: 'https://kartinki.pics/uploads/posts/2022-03/1646531460_1-kartinkin-net-p-kartinki-devushka-grustit-1.jpg',
            video: '123',
            category: 'Грустить',
        },
    ]

    if (currentIndex >= cards.length) {
        throw new Error("Все карты из массива были созданы.");
    }

    const cardData = cards[currentIndex];
    const card = new Card();
    card.title = cardData.title;
    card.category = cardData.category;
    card.image = cardData.image;
    card.video = cardData.video;

    currentIndex += 1;

    return card;

});