import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class FaqDto {
  
  @Expose()
  @IsString({ message: "Вопрос должен быть строкой" })
  @IsNotEmpty({message: "Укажите вопрос"})  
    question!: string;

  @Expose()
  @IsString({ message: "Ответ должен быть строкой" })
  @IsNotEmpty({message: "Укажите ответ"})  
    answer!: string;
}