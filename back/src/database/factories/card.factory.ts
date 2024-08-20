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
        {
            title: 'happy',
            image: 'https://avatars.dzeninfra.ru/get-zen_doc/3414159/pub_60221b10d1d01a0cf87f11dd_602611ddfa0bd9159a560b20/scale_1200',
            video: '123',
            category: 'Радоваться',
        },
        {
            title: 'laugh',
            image: 'https://st3.depositphotos.com/1857171/32584/i/450/depositphotos_325844722-stock-photo-portrait-of-joyful-positive-man.jpg',
            video: '123',
            category: 'Смеяться',
        },
        {
            title: 'walk',
            image: 'https://www.shutterstock.com/image-photo/full-length-profile-shot-young-260nw-2221881113.jpg',
            video: '123',
            category: 'Идти',
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