import { appDataSource } from '@/dataSource/dataSource';
import { StatisticDto } from '@/dto/statistic.dto';
import { Statistic } from '@/entities/statistic.entity';
import { IUpdateStatistic } from '@/interfaces/IUpdateStatistic';
import { Repository } from 'typeorm';

export class StatisticRepository extends Repository<Statistic> {
  constructor() {
    super(Statistic, appDataSource.createEntityManager());
  }

  async getStatistics(userId: number): Promise<Statistic[]> {
    return await this.find({ where: { userId } });
  }

  async getStatistic(id: number) {
    return await this.findOne({ where: { id } });
  }

  async createStatistic(statisticDto: StatisticDto) {
    return await this.save(statisticDto);
  }

  async deleteStatistic(id: number) {
    return await this.delete(id);
  }

  async updateStatistic(params: IUpdateStatistic) {
    return await this.update(params.id, params.updateOptions);
  }
}
