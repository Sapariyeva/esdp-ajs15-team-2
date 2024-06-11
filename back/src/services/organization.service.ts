import { validate } from 'class-validator';
import { formatErrors } from '@/helpers/formatErrors';
import { Organization } from '@/entities/organization.entity';
import { OrganizationDto } from '@/dto/organization.dto';
import { OrganizationRepository } from '@/repositories/organization.repository';

export class OrganizationService {
  private repository: OrganizationRepository;

  constructor() {
    this.repository = new OrganizationRepository();
  }

  getAllSpecialist = async (): Promise<Organization[]> => {
    const organization = await this.repository.getAllSpecialist();
    return organization;
  };

  addSpecialist = async (data: OrganizationDto): Promise<Organization> => {
    const errors = await validate(data, {
      whitelist: true, 
      validationError:{value: false, target: false}
    });
    if (errors?.length) {
      throw formatErrors(errors);
    }
    return await this.repository.addSpecialist(data);
  };

  async deleteSpecialist(id: number) {
    const oldSpecialist = this.repository.getSpecialist(id);
    await this.repository.deleteSpecialist(id);
    return oldSpecialist;
  };
}