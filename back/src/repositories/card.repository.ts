import { appDataSource } from '@/dataSource/dataSource';
import { CardDto } from '@/dto/card.dto';
import { Card } from '@/entities/card.entity';
import { IUpdateCard } from '@/interfaces/IUpdateCard';
import { In, Repository } from 'typeorm';

export class CardRepository extends Repository<Card> {
  constructor() {
    super(Card, appDataSource.createEntityManager());
  }

  async getAllCards(name: string[]): Promise<Card[]> {
    return await this.find({
      where: {
        name: In(name),
      },
    });
  }

  async getCard(id: number) {
    return await this.findOne({ where: { id } });
  }

  async createCard(cardDto: CardDto) {
    return await this.save(cardDto);
  }

  async deleteCard(id: number) {
    return await this.delete(id);
  }

  async updateCard(params: IUpdateCard) {
    return await this.update(params.id, params.updateOptions);
  }
}