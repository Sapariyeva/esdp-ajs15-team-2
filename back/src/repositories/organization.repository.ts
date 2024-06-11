import { appDataSource } from "@/dataSource/dataSource";
import { OrganizationDto } from "@/dto/organization.dto";
import { Organization } from "@/entities/organization.entity";
import { Repository } from "typeorm";

export class OrganizationRepository extends Repository<Organization> {
  constructor() {
    super(Organization, appDataSource.createEntityManager());
  }

  async getAllSpecialist(): Promise<Organization[]> {
    return await this.find();
  }

  async getSpecialist(id: number) {
    return await this.findOne({ where:{ id } });
  }

  async addSpecialist(productDto: OrganizationDto) {
    return await this.save(productDto);
  }

  async deleteSpecialist(id: number) {
    await this.delete(id);
  }
}