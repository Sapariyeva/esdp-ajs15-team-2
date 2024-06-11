import { ClassController } from '@/controllers/class.controller';
import { IRoute } from '@/interfaces/IRoute.interface';
import { Router } from 'express';

export class ClassRoute implements IRoute {
  public path = '/class';
  public router = Router();
  private controller: ClassController;

  constructor() {
    this.controller = new ClassController();
    this.init();
  }

  private init() {
    this.router.get('/', this.controller.getAllStudents);
    this.router.post('/add', this.controller.addStudent);
    this.router.delete('/:id', this.controller.deleteStudent);
  }
}
