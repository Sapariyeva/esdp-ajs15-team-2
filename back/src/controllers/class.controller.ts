import { RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { ClassDto } from '@/dto/class.dto';
import { ClassService } from '@/services/class.service';

export class ClassController {
  private service: ClassService;

  constructor() {
    this.service = new ClassService();
  }

  getAllStudents: RequestHandler = async (req, res) => {
    const students = await this.service.getAllStudents();
    return res.send(students);
  };

  addStudent: RequestHandler = async (req, res) => {    
    try {
      const classDto = plainToInstance(ClassDto, req.body);
      const student = await this.service.addStudent(classDto);
      return res.send(student);
    } catch(e) {
      if (Array.isArray(e)) {
        console.log(e);
        return res.status(400).send(e);
      } else {
        return res.status(500).send(e);
      }
    }
  };

  deleteStudent: RequestHandler = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const student = await this.service.deleteStudent(id);
      return res.send(student);
    }catch(e) {
      return res.status(500).send(e);
    }
  };
}