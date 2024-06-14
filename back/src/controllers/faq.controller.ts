import { RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { FaqDto } from '@/dto/faq.dto';
import { FaqService } from '@/services/faq.service';

export class FaqController {
  private service: FaqService;

  constructor() {
    this.service = new FaqService();
  }

  getAllFaq: RequestHandler = async (req, res) => {
    const faq = await this.service.getAllFaq();
    return res.send(faq);
  };

  getFaq: RequestHandler = async (req, res): Promise<void> => {
    try {
      const faq = await this.service.getFaq(parseInt(req.params.id, 10));
      res.send(faq);
    } catch(e) {
      res.status(400).send({ message: 'Faq not found', detailedMessage: (e as Error)?.message});
    }
  };

  createFaq: RequestHandler = async (req, res) => {    
    try {
      const faqDto = plainToInstance(FaqDto, req.body);
      const faq = await this.service.createFaq(faqDto);
      return res.send(faq);
    } catch(e) {
      if (Array.isArray(e)) {
        console.log(e);
        return res.status(400).send(e);
      } else {
        return res.status(500).send(e);
      }
    }
  };

  deleteFaq: RequestHandler = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const faq = await this.service.deleteFaq(id);
      return res.send(faq);
    }catch(e) {
      return res.status(500).send(e);
    }
  };
}