import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class ClassDto {
  
  @Expose()
  @IsNumber({}, { message: "Идентификатор отправителя должен быть числом" })
  @IsNotEmpty({message: "Укажите специалиста"})  
    specialistId!: number;

  @Expose()
  @IsNumber({}, { message: "Идентификатор получателя должен быть числом" })
  @IsNotEmpty({message: "Укажите студента"})  
    studentId!: number;
}