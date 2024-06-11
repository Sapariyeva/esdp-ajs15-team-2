import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isStrongPassword',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          return typeof value === 'string' && strongPasswordRegex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return 'Пароль должен иметь длину не менее 8 символов, содержать хотя бы одну заглавную букву, одну строчную букву, одну цифру и один специальный символ.';
        },
      },
    });
  };
}

@Expose()
export class UserDto {
    @IsString({message: "Пароль должен быть строкой"})
    @IsNotEmpty({message: "Укажите пароль"})
    @IsStrongPassword({message: "Пароль должен иметь длину не менее 8 символов, содержать хотя бы одну заглавную букву, одну строчную букву, одну цифру и один специальный символ."})
    password!: string;

    @IsString({message: "Имя пользователя должно быть строкой"})
    @IsOptional()
    username?: string;

    @IsEmail({}, { message: "Неверный формат email" })
    email!: string;
}

@Expose()
export class UsernameDto {
    @IsString({message: "Имя пользователя должно быть строкой"})
    @IsNotEmpty({message: "Укажите имя пользователя"})
    username!: string;

    @IsString({message: "Токен должен быть строкой"})
    @IsNotEmpty({message: "Укажите токен"})
    token!: string;
}

export class LoginDto {
    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(8)
    password!: string;
}