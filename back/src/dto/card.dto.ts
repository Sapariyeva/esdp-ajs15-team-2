/* eslint-disable indent */
import { Expose } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

@Expose()
export class CardDto {
  @IsString({ message: 'Название должно быть строкой' })
  @IsNotEmpty({ message: 'Укажите название карточки' })
  name!: string;

  @IsString({ message: 'Изображение должно быть строкой' })
  @IsNotEmpty({ message: 'Укажите изображение карточки' })
  image!: string;

  @IsString({ message: 'Видео должно быть строкой' })
  @IsNotEmpty({ message: 'Укажите видео карточки' })
  video!: string;

  @IsArray({ message: 'Видео должно быть строкой' })
  @IsNotEmpty({ message: 'Укажите видео карточки' })
  category!: string[];

  @IsString({ message: 'Звук должен быть строкой' })
  @IsNotEmpty({ message: 'Укажите звук карточки' })
  audio!: string;
}