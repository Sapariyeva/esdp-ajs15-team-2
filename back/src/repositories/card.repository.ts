import { appDataSource } from "../dataSource/dataSource";
import { CardDto } from "../dto/card.dto";
import { Card } from "../entities/card.entity";
import { Repository } from "typeorm";

export class CardRepository extends Repository<Card> {
  constructor() {
    super(Card, appDataSource.createEntityManager());
  }

  async getCards(): Promise<Card[]> {
    return await this.find();
  }

  async createCard(cardDto: CardDto) {
    return await this.save(cardDto);
  }
}