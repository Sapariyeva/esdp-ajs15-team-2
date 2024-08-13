import { Router } from 'express';
import { IRoute } from '@/interfaces/IRoute.interface';
import { CardController } from '@/controllers/card.controller';
import { upload } from '@/middlewares/upload';
import { checkRole } from '@/middlewares/checkRole';


export class CardRoute implements IRoute {
  public path = '/cards';
  public router = Router();
  private controller: CardController;

  constructor() {
    this.controller = new CardController();
    this.init();
  }

  private init() {
    this.router.get('/', this.controller.getAllCardsByCategory);
    this.router.get('/all', this.controller.getAllCards);
    this.router.get('/show', this.controller.getShowCards);
    this.router.get('/:id', this.controller.getCard);
    this.router.post(
      '/',
      upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'video', maxCount: 1 }
      ]),checkRole('admin'),
      
      this.controller.createCard
    );
    this.router.delete('/delete/:id',checkRole('admin'),this.controller.deleteCard);
    this.router.put('/update/:id', this.controller.updateCard);
  }
}