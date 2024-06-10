import { appDataSource } from "@/dataSource/dataSource";
import { WhereFoundOutDto } from "@/dto/whereFoundOut.dto";
import { WhereFoundOut } from "@/entities/whereFoundOut.entity";
import { Repository } from "typeorm";

export class WhereFoundOutRepository extends Repository<WhereFoundOut> {
  constructor() {
    super(WhereFoundOut, appDataSource.createEntityManager());
  }

  async getAllFoundOut(): Promise<WhereFoundOut[]> {
    return await this.find();
  }

  async getFoundOut(id: number) {
    return await this.findOne({ where:{ id } });
  }

  async createFoundOut(productDto: WhereFoundOutDto) {
    return await this.save(productDto);
  }

  async deleteFoundOut(id: number) {
    await this.delete(id);
  }
}