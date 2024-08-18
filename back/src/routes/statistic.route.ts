import { Router } from 'express';
import { IRoute } from '../interfaces/IRoute.interface';
import { StatisticController } from '../controllers/statistic.controller';

export class StatisticRoute implements IRoute {
  public path = '/statistic';
  public router = Router();
  private controller: StatisticController;

  constructor() {
    this.controller = new StatisticController();
    this.init();
  }

  private init() {
    this.router.get('/', this.controller.getStatistics);
    this.router.get('/:id', this.controller.getStatistic);
    this.router.post('/create', this.controller.createStatistic);
    this.router.delete('/delete/:id', this.controller.deleteStatistic);
    this.router.put('/update/:id', this.controller.updateStatistic);
  }
}
