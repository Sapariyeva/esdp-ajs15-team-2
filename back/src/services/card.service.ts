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

  getShowCards = async (category: string[]): Promise<Card[][]> => {
    const matchedCards = await this.repository.getAllCardsByTitle(category);

    const getCards = async () => {
      const randomCards = await this.repository.getShowCards();
      return randomCards;
    };

    const result: Card[][] = [];

    for (const card of matchedCards) {
      const randomCards = await getCards();

      const cardSet = [
        { id: randomCards[0].id, image: randomCards[0].image, title: randomCards[0].title, category: randomCards[0].category, video: randomCards[0].video },
        { id: randomCards[1].id, image: randomCards[1].image, title: randomCards[1].title, category: randomCards[1].category, video: randomCards[1].video },
        { id: card.id, image: card.image, title: card.title, category: card.category, video: card.video },
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

  async createOptions(data: CardDto): Promise<Card> {
    const errors = await validate(plainToInstance(CardDto, data), {
        whitelist: true,
        validationError: { target: false, value: false },
    });

    if (errors.length > 0) {
        throw formatErrors(errors);
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

  updateCard = async (params: IUpdateCard) => {
    const updatePlace = await this.repository.getCard(params.id);
    if (!updatePlace) {
      throw new Error('Invalid id');
    }
    const errors = await validate(params.updateOptions, {
      whitelist: true,
      validationError: { value: false, target: false },
    });
    if (errors?.length) {
      throw formatErrors(errors);
    }
    await this.repository.updateCard(params);
    return this.repository.getCard(params.id);
  };
}