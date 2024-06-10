import { FoundOutTypeController } from '@/controllers/foundOutType.controller';
import { IRoute } from '@/interfaces/IRoute.interface';
import { upload } from '@/middlewares/upload';
import { Router } from 'express';

export class FoundOutTypeRoute implements IRoute {
  public path = '/foundOutType';
  public router = Router();
  private controller: FoundOutTypeController;

  constructor() {
    this.controller = new FoundOutTypeController();
    this.init();
  }

  private init() {
    this.router.get('/', this.controller.getAllTypes);
    this.router.get('/:id', this.controller.getType);
    this.router.post('/create', upload.single('image'), this.controller.createType);
    this.router.delete('/:id', this.controller.deleteType);
  }
}
