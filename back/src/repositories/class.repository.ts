import { appDataSource } from "@/dataSource/dataSource";
import { ClassDto } from "@/dto/class.dto";
import { Class } from "@/entities/class.entity";
import { Repository } from "typeorm";

export class ClassRepository extends Repository<Class> {
  constructor() {
    super(Class, appDataSource.createEntityManager());
  }

  async getAllStudents(): Promise<Class[]> {
    return await this.find();
  }

  async getStudent(id: number) {
    return await this.findOne({ where:{ id } });
  }

  async addStudent(productDto: ClassDto) {
    return await this.save(productDto);
  }

  async deleteStudent(id: number) {
    await this.delete(id);
  }
}