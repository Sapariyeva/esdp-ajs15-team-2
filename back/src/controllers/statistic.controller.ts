import { StatisticDto } from '../dto/statistic.dto';
import { StatisticService } from '../services/statistic.service';
import { plainToInstance } from 'class-transformer';
import { RequestHandler } from 'express';

export class StatisticController {
  private service: StatisticService;

  constructor() {
    this.service = new StatisticService();
  }

  getStatistics: RequestHandler = async (req, res): Promise<void> => {
    const statistics = await this.service.getStatistics(parseInt(req.params.userId));
    res.send(statistics);
  };

  getStatistic: RequestHandler = async (req, res): Promise<void> => {
    try {
      const statistic = await this.service.getStatistic(parseInt(req.params.id));
      res.send(statistic);
    } catch (e) {
      res.status(400).send({ message: 'Statistic not found', detailedMessage: (e as Error)?.message });
    }
  };

  createStatistic: RequestHandler = async (req, res): Promise<void> => {
    try {
      const statisticDto = plainToInstance(StatisticDto, req.body);
      const statistic = await this.service.createStatistic(statisticDto);
      res.send(statistic);
    } catch (e) {
      if (Array.isArray(0)) {
        console.log(e);
        res.status(400).send({ message: e, detailedMessage: (e as Error)?.message });
      } else {
        res.status(500).send({ message: e, detailedMessage: (e as Error)?.message });
      }
    }
  };

  deleteStatistic: RequestHandler = async (req, res): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const statistic = await this.service.deleteStatistic(id);
      res.send(statistic);
    } catch (e) {
      if (Array.isArray(0)) {
        res.status(400).send({ message: e, detailedMessage: (e as Error)?.message });
      } else {
        res.status(500).send({ message: e, detailedMessage: (e as Error)?.message });
      }
    }
  };

  updateStatistic: RequestHandler = async (req, res): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      if (!id) {
        res.status(400).send({ message: 'Statistic not found' });
        return;
      }

      const updateOptions = plainToInstance(StatisticDto, req.body);
      if (!updateOptions) {
        res.status(400).send({ message: 'Bad Request' });
        return;
      }

      const statistic = await this.service.updateStatistic({ id, updateOptions });
      res.send(statistic);
    } catch (e) {
      if (Array.isArray(0)) {
        res.status(400).send({ message: e, detailedMessage: (e as Error)?.message });
      } else {
        res.status(500).send({ message: e, detailedMessage: (e as Error)?.message });
      }
    }
  };
}
