import { OrganizationController } from '@/controllers/organization.controller';
import { IRoute } from '@/interfaces/IRoute.interface';
import { Router } from 'express';

export class OrganizationRoute implements IRoute {
  public path = '/organization';
  public router = Router();
  private controller: OrganizationController;

  constructor() {
    this.controller = new OrganizationController();
    this.init();
  }

  private init() {
    this.router.get('/', this.controller.getAllSpecialist);
    this.router.post('/add', this.controller.addSpecialist);
    this.router.delete('/:id', this.controller.deleteSpecialist);
  }
}
