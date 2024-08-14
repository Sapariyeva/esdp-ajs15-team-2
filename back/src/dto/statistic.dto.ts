/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import { Expose } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

@Expose()
export class StatisticDto {
    @IsNumber({}, { message: "Идентификатор пользователя должен быть числом" })
    @IsNotEmpty({ message: "Укажите идентификатор пользователя" }) 
    userId!: number;

    @IsDate({ message: "Дата и время должны быть корректными" })
    datetime?: Date;

    @IsNumber({}, { message: "Критерий успешности пользователя должен быть числом" })
    @IsNotEmpty({ message: "Укажите критерий успешности пользователя" }) 
    successСriteria!: number;
}