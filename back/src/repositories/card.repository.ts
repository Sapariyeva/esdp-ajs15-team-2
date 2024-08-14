import { appDataSource } from '@/dataSource/dataSource';
import { CardDto } from '@/dto/card.dto';
import { Card } from '@/entities/card.entity';
import { IUpdateCard } from '@/interfaces/IUpdateCard';
import { In, Repository } from 'typeorm';

export class CardRepository extends Repository<Card> {
  constructor() {
    super(Card, appDataSource.createEntityManager());
  }

  async getAllCardsByTitle(category: string[]): Promise<Card[]> {
    return await this.find({
      where: {
        category: In(category),
      },
    });
  }

  async getAllCards(): Promise<Card[]> {
    return await this.find();
  }

  async getShowCards(): Promise<Card[]> {
    return await this.createQueryBuilder().where({}).orderBy('RAND()').take(2).getMany();
  }

  async getCard(id: number) {
    return await this.findOne({ where: { id } });
  }

  async createOptions(options: CardDto): Promise<Card> {
    return await this.save(options);
  }

  async deleteCard(id: number) {
    return await this.delete(id);
  }

  async updateCard(params: IUpdateCard) {
    return await this.update(params.id, params.updateOptions);
  }
}
