import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CardDto {
  @IsNotEmpty({message: "Коктейль не может быть создан без названия"})
  @IsString({message: "Название должно быть строкой"})
  @Expose() 
    title!: string;

  @Expose()
  @IsNotEmpty({message: "Нельзя создать коктейль без фотографии"})
  @IsString({message: "Фотография должна быть строкой"}) 
    image!: string;
}