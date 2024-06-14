import { FaqController } from '@/controllers/faq.controller';
import { IRoute } from '@/interfaces/IRoute.interface';
import { Router } from 'express';

export class FaqRoute implements IRoute {
  public path = '/faq';
  public router = Router();
  private controller: FaqController;

  constructor() {
    this.controller = new FaqController();
    this.init();
  }

  private init() {
    this.router.get('/', this.controller.getAllFaq);
    this.router.get('/:id', this.controller.getFaq);
    this.router.post('/create', this.controller.createFaq);
    this.router.delete('/:id', this.controller.deleteFaq);
  }
}
