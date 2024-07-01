import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Expose()
export class CardDto {
  @IsNotEmpty({message: "Карточка не может быть создана без названия"})
  @IsString({message: "Название должно быть строкой"})
  title!: string;

  @IsNotEmpty({message: "Нельзя создать карточку без фотографии"})
  @IsString({message: "Фотография должна быть строкой"}) 
  image!: string;

  @IsNotEmpty({message: "Нельзя создать карточку без видео"})
  @IsString({message: "Видео должно быть строкой"}) 
  video!: string;
}