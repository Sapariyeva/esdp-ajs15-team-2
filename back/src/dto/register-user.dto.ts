import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class RegisterUserDto {
  
  @Expose()
  @IsString({message: "Почта должна быть строкой"})
  @IsNotEmpty({message: "Укажите почту"})  
    mail!: string;

  @Expose()
  @IsString({message: "Пароль должен быть строкой"})
  @IsNotEmpty({message: "Укажите пароль"})  
    password!: string;
}