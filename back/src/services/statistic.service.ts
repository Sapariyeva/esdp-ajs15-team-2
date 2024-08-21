import { StatisticDto } from '@/dto/statistic.dto';
import { Statistic } from '@/entities/statistic.entity';
import { formatErrors } from '@/helpers/formatErrors';
import { IUpdateStatistic } from '@/interfaces/IUpdateStatistic';
import { StatisticRepository } from '@/repositories/statistic.repository';
import { validate } from 'class-validator';

export class StatisticService {
  private repository: StatisticRepository;

  constructor() {
    this.repository = new StatisticRepository();
  }

  getStatistics = async (userId: number): Promise<Statistic[]> => {
    return await this.repository.getStatistics(userId);
  };

  getStatistic = async (id: number): Promise<Statistic> => {
    const statistic = await this.repository.getStatistic(id);
    if (!statistic) {
      throw new Error('Invalid id');
    }
    return statistic;
  };

  createStatistic = async (data: StatisticDto, lang: string): Promise<Statistic> => {
    const errors = await validate(data, {
      whitelist: true,
      validationError: { value: false, target: false },
    });
    if (errors?.length) {
      throw formatErrors(errors, lang);
    }
    return await this.repository.createStatistic(data);
  };

  deleteStatistic = async (id: number) => {
    const oldStatistic = await this.repository.getStatistic(id);
    if (!oldStatistic) {
      throw new Error('Invalid id');
    }
    await this.repository.deleteStatistic(id);
    return oldStatistic;
  };

  updateStatistic = async (params: IUpdateStatistic, lang: string) => {
    const updateStatistic = await this.repository.getStatistic(params.id);
    if (!updateStatistic) {
      throw new Error('Invalid id');
    }
    const errors = await validate(params.updateOptions, {
      whitelist: true,
      validationError: { value: false, target: false },
    });
    if (errors?.length) {
      throw formatErrors(errors, lang);
    }
    await this.repository.updateStatistic(params);
    return this.repository.getStatistic(params.id);
  };
}
