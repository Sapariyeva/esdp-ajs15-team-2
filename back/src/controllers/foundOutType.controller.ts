import { RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { FoundOutTypeDto } from '@/dto/foundOutType.dto';
import { FoundOutTypeService } from '@/services/foundOutType.service';

export class FoundOutTypeController {
  private service: FoundOutTypeService;

  constructor() {
    this.service = new FoundOutTypeService();
  }

  getAllTypes: RequestHandler = async (req, res) => {
    const types = await this.service.getAllTypes();
    return res.send(types);
  };

  getType: RequestHandler = async (req, res): Promise<void> => {
    try {
      const type = await this.service.getType(parseInt(req.params.id, 10));
      res.send(type);
    } catch(e) {
      res.status(400).send({ message: 'Type not found', detailedMessage: (e as Error)?.message});
    }
  };

  createType: RequestHandler = async (req, res) => {    
    try {
      const typeDto = plainToInstance(FoundOutTypeDto, req.body);
      if (req.file) {
        typeDto.image = req.file.filename;
        
      }
      const type = await this.service.createType(typeDto);
      return res.send(type);
    } catch(e) {
      if (Array.isArray(e)) {
        console.log(e);
        return res.status(400).send(e);
      } else {
        return res.status(500).send(e);
      }
    }
  };

  deleteType: RequestHandler = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const type = await this.service.deleteType(id);
      return res.send(type);
    }catch(e) {
      return res.status(500).send(e);
    }
  };
}