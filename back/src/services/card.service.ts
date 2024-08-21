import { CardDto } from '@/dto/card.dto';
import { Card } from '@/entities/card.entity';
import { formatErrors } from '@/helpers/formatErrors';
import { IUpdateCard } from '@/interfaces/IUpdateCard';
import { CardRepository } from '@/repositories/card.repository';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export class CardService {
  private repository: CardRepository;

  constructor() {
    this.repository = new CardRepository();
  }

  getAllCardsByCategory = async (category: string[]): Promise<Card[]> => {
    return await this.repository.getAllCardsByTitle(category);
  };

  getAllCards = async (): Promise<Card[]> => {
    return await this.repository.getAllCards();
  };

  shuffleArray<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
  }

  getShowCards = async (titles: string[]): Promise<any[]> => {
    const cardsPerSet = 3;
    const matchedCards = await this.repository.getAllCardsByTitle(titles);
    const allCards = await this.repository.getShowCards();
    const result: any[] = [];

    for (const card of matchedCards) {
        const remainingCards = allCards.filter(c => c.id !== card.id);
        if (remainingCards.length < cardsPerSet - 1) {
            throw new Error('Недостаточно карточек в базе данных для формирования набора');
        }

        const randomCards = this.shuffleArray(remainingCards).slice(0, cardsPerSet - 1);

        const cardSet = [
            { id: card.id, image: card.image, title: card.title, category: card.category },
            ...randomCards.map(randomCard => ({
                id: randomCard.id,
                image: randomCard.image,
                title: randomCard.title,
                category: randomCard.category,
            }))
        ];

        result.push(cardSet);
    }

    return result;
  };

  getCard = async (id: number): Promise<Card> => {
    const card = await this.repository.getCard(id);
    if (!card) {
      throw new Error('Invalid id');
    }
    return card;
  };

  async createOptions(data: CardDto, lang: string): Promise<Card> {
    const errors = await validate(plainToInstance(CardDto, data), {
      whitelist: true,
      validationError: { target: false, value: false },
    });

    if (errors.length > 0) {
      throw formatErrors(errors, lang);
    }
    return await this.repository.createOptions(data);
}

  deleteCard = async (id: number) => {
    const oldCard = await this.repository.getCard(id);
    if (!oldCard) {
      throw new Error('Invalid id');
    }
    await this.repository.deleteCard(id);
    return oldCard;
  };

  updateCard = async (params: IUpdateCard, lang: string) => {
    const updatePlace = await this.repository.getCard(params.id);
    if (!updatePlace) {
      throw new Error('Invalid id');
    }
    const errors = await validate(params.updateOptions, {
      whitelist: true,
      validationError: { value: false, target: false },
    });
    if (errors?.length) {
      throw formatErrors(errors, lang);
    }
    await this.repository.updateCard(params);
    return this.repository.getCard(params.id);
  };
}