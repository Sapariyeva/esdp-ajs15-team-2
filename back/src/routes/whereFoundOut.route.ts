import { WhereFoundOutController } from '@/controllers/whereFoundOut.controller';
import { IRoute } from '@/interfaces/IRoute.interface';
import { Router } from 'express';

export class WhereFoundOutRoute implements IRoute {
  public path = '/whereFoundOut';
  public router = Router();
  private controller: WhereFoundOutController;

  constructor() {
    this.controller = new WhereFoundOutController();
    this.init();
  }

  private init() {
    this.router.get('/', this.controller.getAllFoundOut);
    this.router.get('/:id', this.controller.getFoundOut);
    this.router.post('/create', this.controller.createFoundOut);
    this.router.delete('/:id', this.controller.deleteFoundOut);
  }
}
