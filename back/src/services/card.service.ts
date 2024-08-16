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

  getUniqueCards(cards: Card[], count: number): Card[] {
    const uniqueCardIds = new Set<number>();
    const uniqueCards: Card[] = [];

    for (const card of cards) {
      if (uniqueCards.length >= count) break;
      if (!uniqueCardIds.has(card.id)) {
        uniqueCards.push(card);
        uniqueCardIds.add(card.id);
      }
    }

    return uniqueCards;
  }

  getShowCards = async (category: string[]): Promise<Card[][]> => {
   
    const allCards = await this.repository.find();
    
    const categoryCards = category.map(categories => 
      allCards.filter(card => card.category === categories)
    );

    const excludeCategories = new Set(category);
    const filteredCards = allCards.filter(card => !excludeCategories.has(card.category));

    if (filteredCards.length < 2 * category.length) {
      throw new Error('Не хватает карточек для выполнения запроса');
    }

    const shuffledFilteredCards = filteredCards.sort(() => 0.5 - Math.random());

    const result: Card[][] = [];

    for (const categoryCardList of categoryCards) {
      const neededRandomCount = 3 - categoryCardList.length;
      const randomCards = this.getUniqueCards(shuffledFilteredCards, neededRandomCount);
      const uniqueCards = this.getUniqueCards([...categoryCardList, ...randomCards], 3);

      result.push(uniqueCards);

      shuffledFilteredCards.splice(0, neededRandomCount);
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