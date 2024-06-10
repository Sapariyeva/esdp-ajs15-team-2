import { RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { WhereFoundOutDto } from '@/dto/whereFoundOut.dto';
import { WhereFoundOutService } from '@/services/whereFoundOut.service';

export class WhereFoundOutController {
  private service: WhereFoundOutService;

  constructor() {
    this.service = new WhereFoundOutService();
  }

  getAllFoundOut: RequestHandler = async (req, res) => {
    const foundOut = await this.service.getAllFoundOut();
    return res.send(foundOut);
  };

  getFoundOut: RequestHandler = async (req, res): Promise<void> => {
    try {
      const foundOut = await this.service.getFoundOut(parseInt(req.params.id, 10));
      res.send(foundOut);
    } catch(e) {
      res.status(400).send({ message: 'Found out not found', detailedMessage: (e as Error)?.message});
    }
  };

  createFoundOut: RequestHandler = async (req, res) => {    
    try {
      const foundOutDto = plainToInstance(WhereFoundOutDto, req.body);
      const foundOut = await this.service.createFoundOut(foundOutDto);
      return res.send(foundOut);
    } catch(e) {
      if (Array.isArray(e)) {
        console.log(e);
        return res.status(400).send(e);
      } else {
        return res.status(500).send(e);
      }
    }
  };

  deleteFoundOut: RequestHandler = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const foundOut = await this.service.deleteFoundOut(id);
      return res.send(foundOut);
    }catch(e) {
      return res.status(500).send(e);
    }
  };
}