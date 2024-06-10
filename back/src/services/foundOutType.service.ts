import { validate } from 'class-validator';
import { formatErrors } from '@/helpers/formatErrors';
import { FoundOutType } from '@/entities/foundOutType.entity';
import { FoundOutTypeDto } from '@/dto/foundOutType.dto';
import { FoundOutTypeRepository } from '@/repositories/foundOutType.repository';

export class FoundOutTypeService {
  private repository: FoundOutTypeRepository;

  constructor() {
    this.repository = new FoundOutTypeRepository();
  }

  getAllTypes = async (): Promise<FoundOutType[]> => {
    const types = await this.repository.getAllTypes();
    return types;
  };

  getType = async (id: number): Promise<FoundOutType> => {
    const type = await this.repository.getType(id);
    if (!type){
      throw new Error('Invalid id');
    }
    return type;
  };

  createType = async (data: FoundOutTypeDto): Promise<FoundOutType> => {
    const errors = await validate(data, {
      whitelist: true, 
      validationError:{value: false, target: false}
    });
    if (errors?.length) {
      throw formatErrors(errors);
    }
    return await this.repository.createType(data);
  };

  async deleteType(id: number) {
    const oldType = this.repository.getType(id);
    await this.repository.deleteType(id);
    return oldType;
  };
}