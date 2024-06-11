import { RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { OrganizationDto } from '@/dto/organization.dto';
import { OrganizationService } from '@/services/organization.service';

export class OrganizationController {
  private service: OrganizationService;

  constructor() {
    this.service = new OrganizationService();
  }

  getAllSpecialist: RequestHandler = async (req, res) => {
    const organization = await this.service.getAllSpecialist();
    return res.send(organization);
  };

  addSpecialist: RequestHandler = async (req, res) => {    
    try {
      const organizationDto = plainToInstance(OrganizationDto, req.body);
      const specialist = await this.service.addSpecialist(organizationDto);
      return res.send(specialist);
    } catch(e) {
      if (Array.isArray(e)) {
        console.log(e);
        return res.status(400).send(e);
      } else {
        return res.status(500).send(e);
      }
    }
  };

  deleteSpecialist: RequestHandler = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const specialist = await this.service.deleteSpecialist(id);
      return res.send(specialist);
    }catch(e) {
      return res.status(500).send(e);
    }
  };
}