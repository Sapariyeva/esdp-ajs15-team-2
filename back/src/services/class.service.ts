import { validate } from 'class-validator';
import { formatErrors } from '@/helpers/formatErrors';
import { Class } from '@/entities/class.entity';
import { ClassDto } from '@/dto/class.dto';
import { ClassRepository } from '@/repositories/class.repository';

export class ClassService {
  private repository: ClassRepository;

  constructor() {
    this.repository = new ClassRepository();
  }

  getAllStudents = async (): Promise<Class[]> => {
    const students = await this.repository.getAllStudents();
    return students;
  };

  addStudent = async (data: ClassDto): Promise<Class> => {
    const errors = await validate(data, {
      whitelist: true, 
      validationError:{value: false, target: false}
    });
    if (errors?.length) {
      throw formatErrors(errors);
    }
    return await this.repository.addStudent(data);
  };

  async deleteStudent(id: number) {
    const oldStident = this.repository.getStudent(id);
    await this.repository.deleteStudent(id);
    return oldStident;
  };
}