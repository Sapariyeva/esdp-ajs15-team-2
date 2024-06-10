import { appDataSource } from "@/dataSource/dataSource";
import { FoundOutTypeDto } from "@/dto/foundOutType.dto";
import { FoundOutType } from "@/entities/foundOutType.entity";
import { Repository } from "typeorm";

export class FoundOutTypeRepository extends Repository<FoundOutType> {
  constructor() {
    super(FoundOutType, appDataSource.createEntityManager());
  }

  async getAllTypes(): Promise<FoundOutType[]> {
    return await this.find();
  }

  async getType(id: number) {
    return await this.findOne({ where:{ id } });
  }

  async createType(productDto: FoundOutTypeDto) {
    return await this.save(productDto);
  }

  async deleteType(id: number) {
    await this.delete(id);
  }
}