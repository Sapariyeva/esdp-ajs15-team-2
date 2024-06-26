import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CardDto {
  @IsNotEmpty({message: "Карточка не может быть создана без названия"})
  @IsString({message: "Название должно быть строкой"})
  @Expose() 
    title!: string;

  @Expose()
  @IsNotEmpty({message: "Нельзя создать карточку без фотографии"})
  @IsString({message: "Фотография должна быть строкой"}) 
    image!: string;

  @Expose()
  @IsNotEmpty({message: "Нельзя создать карточку без видео"})
  @IsString({message: "Видео должно быть строкой"}) 
    video!: string;
}