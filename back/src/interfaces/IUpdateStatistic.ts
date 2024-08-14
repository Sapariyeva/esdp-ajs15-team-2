import { StatisticDto } from '@/dto/statistic.dto';

export interface IUpdateStatistic {
  id: number;
  updateOptions: StatisticDto;
}
