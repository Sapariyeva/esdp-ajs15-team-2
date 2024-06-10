import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export class WhereFoundOutDto {
  
  @Expose()
  @IsNumberString({}, {message: "Укажите корректный тип"})
  @IsNotEmpty({message: "Тип не может быть пустым"})
    typeId!: number; 

  @Expose()
  @IsNumber({}, { message: "Идентификатор пользователя должен быть числом" })
  @IsNotEmpty({ message: "Укажите идентификатор пользователя" }) 
    userId!: number;
}