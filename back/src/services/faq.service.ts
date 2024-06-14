import { validate } from 'class-validator';
import { formatErrors } from '@/helpers/formatErrors';
import { Faq } from '@/entities/faq.entity';
import { FaqDto } from '@/dto/faq.dto';
import { FaqRepository } from '@/repositories/faq.repository';

export class FaqService {
  private repository: FaqRepository;

  constructor() {
    this.repository = new FaqRepository();
  }

  getAllFaq = async (): Promise<Faq[]> => {
    const faq = await this.repository.getAllFaq();
    return faq;
  };

  getFaq = async (id: number): Promise<Faq> => {
    const faq = await this.repository.getFaq(id);
    if (!faq){
      throw new Error('Invalid id');
    }
    return faq;
  };

  createFaq = async (data: FaqDto): Promise<Faq> => {
    const errors = await validate(data, {
      whitelist: true, 
      validationError:{value: false, target: false}
    });
    if (errors?.length) {
      throw formatErrors(errors);
    }
    return await this.repository.createFaq(data);
  };

  async deleteFaq(id: number) {
    const oldFaq = this.repository.getFaq(id);
    await this.repository.deleteFaq(id);
    return oldFaq;
  };
}