import { RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { CardDto } from '../dto/card.dto';
import { CardService } from '../services/card.service';

export class CardController {
  private service: CardService;

  constructor() {
    this.service = new CardService();
  }

  getCards: RequestHandler = async (req, res) => {
    const cards = await this.service.getCards();
    return res.send(cards);
  };

  createCard: RequestHandler = async (req, res) => {
    try {
      const cardDto = plainToInstance(CardDto, req.body);
      if (req.file) {
        cardDto.image = req.file.filename;
        cardDto.video = req.file.filename;
      }
      const card = await this.service.createCard(cardDto);
      return res.send(card);
    } catch(e) {
      if (Array.isArray(e)) {
        console.log(e);
        return res.status(400).send(e);
      } else {
        return res.status(500).send(e);
      }
    }
  };
}