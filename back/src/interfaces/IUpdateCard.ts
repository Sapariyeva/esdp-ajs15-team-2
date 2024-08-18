import { CardDto } from '../dto/card.dto';

export interface IUpdateCard {
  id: number;
  updateOptions: CardDto;
}
