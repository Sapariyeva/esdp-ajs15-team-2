import { CardController } from '../controllers/card.controller';
import { IRoute } from '../interfaces/IRoute.interface';
import { upload } from '../middlewares/upload';
import { Router } from 'express';

export class CardRoute implements IRoute {
  public path = '/cards';
  public router = Router();
  private controller: CardController;

  constructor() {
    this.controller = new CardController();
    this.init();
  }

  private init() {
    this.router.get('/', this.controller.getCards);
    this.router.post('/', upload.single('image'), upload.single('video'), this.controller.createCard);
  }
}