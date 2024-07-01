import { validate } from 'class-validator';
import { formatErrors } from '../helpers/formatErrors';
import { Card } from '../entities/card.entity';
import { CardDto } from '../dto/card.dto';
import { CardRepository } from '../repositories/card.repository';

export class CardService {
  private repository: CardRepository;

  constructor() {
    this.repository = new CardRepository();
  }

  getCards = async (): Promise<Card[]> => {
    const res = await this.repository.getCards();
    return res;
  };

  createCard = async (data: CardDto): Promise<Card> => {
    const errors = await validate(data, {
      whitelist: true, 
      validationError:{value: false, target: false}
    });
    if (errors?.length) {
      throw formatErrors(errors);
    }
    return await this.repository.createCard(data);
  };
}