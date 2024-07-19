import { CardDto } from '@/dto/card.dto';
import { CardService } from '@/services/card.service';
import { plainToInstance } from 'class-transformer';
import { RequestHandler } from 'express';

export class CardController {
  private service: CardService;

  constructor() {
    this.service = new CardService();
  }

  getAllCards: RequestHandler = async (req, res): Promise<void> => {
    const cards = await this.service.getAllCards(req.body);
    res.send(cards);
  };

  getCard: RequestHandler = async (req, res): Promise<void> => {
    try {
      const card = await this.service.getCard(parseInt(req.params.id));
      res.send(card);
    } catch (e) {
      res.status(400).send({ message: 'Card not found', detailedMessage: (e as Error)?.message });
    }
  };

  createCard: RequestHandler = async (req, res): Promise<void> => {
    try {
      const cardDto = plainToInstance(CardDto, req.body);
      if (req.file) {
        cardDto.image = req.file.filename;
        cardDto.video = req.file.filename;
        cardDto.audio = req.file.filename;
      }
      const card = await this.service.createCard(cardDto);
      res.send(card);
    } catch (e) {
      if (Array.isArray(0)) {
        console.log(e);
        res.status(400).send({ message: e, detailedMessage: (e as Error)?.message });
      } else {
        res.status(500).send({ message: e, detailedMessage: (e as Error)?.message });
      }
    }
  };

  deleteCard: RequestHandler = async (req, res): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const card = await this.service.deleteCard(id);
      res.send(card);
    } catch (e) {
      if (Array.isArray(0)) {
        res.status(400).send({ message: e, detailedMessage: (e as Error)?.message });
      } else {
        res.status(500).send({ message: e, detailedMessage: (e as Error)?.message });
      }
    }
  };

  updateCard: RequestHandler = async (req, res): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      if (!id) {
        res.status(400).send({ message: 'Place not found' });
        return;
      }

      const updateOptions = plainToInstance(CardDto, req.body);
      if (!updateOptions) {
        res.status(400).send({ message: 'Bad Request' });
        return;
      }

      const card = await this.service.updateCard({ id, updateOptions });
      res.send(card);
    } catch (e) {
      if (Array.isArray(0)) {
        res.status(400).send({ message: e, detailedMessage: (e as Error)?.message });
      } else {
        res.status(500).send({ message: e, detailedMessage: (e as Error)?.message });
      }
    }
  };
}