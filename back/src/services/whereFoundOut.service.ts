import { validate } from 'class-validator';
import { formatErrors } from '@/helpers/formatErrors';
import { WhereFoundOut } from '@/entities/whereFoundOut.entity';
import { WhereFoundOutDto } from '@/dto/whereFoundOut.dto';
import { WhereFoundOutRepository } from '@/repositories/whereFoundOut.repository';

export class WhereFoundOutService {
  private repository: WhereFoundOutRepository;

  constructor() {
    this.repository = new WhereFoundOutRepository();
  }

  getAllFoundOut = async (): Promise<WhereFoundOut[]> => {
    const foundOut = await this.repository.getAllFoundOut();
    return foundOut;
  };

  getFoundOut = async (id: number): Promise<WhereFoundOut> => {
    const foundOut = await this.repository.getFoundOut(id);
    if (!foundOut){
      throw new Error('Invalid id');
    }
    return foundOut;
  };

  createFoundOut = async (data: WhereFoundOutDto): Promise<WhereFoundOut> => {
    const errors = await validate(data, {
      whitelist: true, 
      validationError:{value: false, target: false}
    });
    if (errors?.length) {
      throw formatErrors(errors);
    }
    return await this.repository.createFoundOut(data);
  };

  async deleteFoundOut(id: number) {
    const oldType = this.repository.getFoundOut(id);
    await this.repository.deleteFoundOut(id);
    return oldType;
  };
}