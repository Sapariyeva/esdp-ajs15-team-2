import { appDataSource } from "@/dataSource/dataSource";
import { FaqDto } from "@/dto/faq.dto";
import { Faq } from "@/entities/faq.entity";
import { Repository } from "typeorm";

export class FaqRepository extends Repository<Faq> {
  constructor() {
    super(Faq, appDataSource.createEntityManager());
  }

  async getAllFaq(): Promise<Faq[]> {
    return await this.find();
  }

  async getFaq(id: number) {
    return await this.findOne({ where:{ id } });
  }

  async createFaq(faqDto: FaqDto) {
    return await this.save(faqDto);
  }

  async deleteFaq(id: number) {
    await this.delete(id);
  }
}