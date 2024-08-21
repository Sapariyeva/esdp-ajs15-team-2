import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from "class-validator";
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

// Функция для валидации пароля
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
          return "invalid_password_format";
        },
      },
    });
  };
}

// DTO для регистрации
@Expose()
export class UserDto {
  @IsString({ message: "password_must_be_string" })
  @IsNotEmpty({ message: "missing_password" })
  @IsStrongPassword({ message: "invalid_password_format" })
  password!: string;

  @IsString({ message: "username_must_be_string" })
  @IsOptional()
  username?: string;

  @IsEmail({}, { message: "invalid_email_format" })
  email!: string;
}


// DTO для добавления имени пользователя
@Expose()
export class UsernameDto {
  @IsNotEmpty({ message: "missing_checker_name" })
  @Matches(/^[A-Za-zА-Яа-яЁё\s]+$/, {
    message: "username_no_numbers",
  })
  username!: string;

  @IsString({ message: "token_must_be_string" })
  @IsNotEmpty({ message: "missing_token" })
  token!: string;
}

// DTO для входа
export class LoginDto {
  @IsEmail({}, { message: "invalid_email_format" })
  email!: string;

  @IsString({ message: "password_must_be_string" })
  @MinLength(8, { message: "invalid_password_format" })
  password!: string;
}

// DTO для сброса пароля
export class ResetPasswordRequestDto {
  @IsEmail({}, { message: "invalid_email_format" })
  email!: string;
}

// DTO для смены пароля
export class ResetPasswordDto {
  @IsString({ message: "password_must_be_string" })
  @IsNotEmpty({ message: "missing_password" })
  @IsStrongPassword({
    message: "invalid_password_format",
  })
  password!: string;

  @IsString({ message: "token_must_be_string" })
  @IsNotEmpty({ message: "missing_token" })
  resetPasswordToken!: string;
}