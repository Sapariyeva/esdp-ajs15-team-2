import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class SignInUserDto {
  
  @Expose()
  @IsString({message: "Почта должно быть строкой"})
  @IsNotEmpty({message: "Укажите почту"})  
    mail!: string;

  @Expose()
  @IsString({message: "Пароль должен быть строкой"})
  @IsNotEmpty({message: "Укажите пароль"})  
    password!: string;
}