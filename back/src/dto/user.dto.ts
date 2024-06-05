import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

@Expose()
export class UserDto {
    @IsString({message: "Пароль должен быть строкой"})
    @IsNotEmpty({message: "Укажите пароль"}) 
    password!: string;

    @IsString({message: "Имя пользователя должно быть строкой"})
    // @IsNotEmpty({message: "Укажите имя пользователя"}) 
    @IsOptional()
    username?: string;

    @IsEmail({}, { message: "Неверный формат email" })
    @IsNotEmpty({message: "Укажите email"})
    email!: string;
}