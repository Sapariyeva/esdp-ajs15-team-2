/* eslint-disable indent */
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CardDto {
  @Expose()
  @IsString({ message: 'Название должно быть строкой' })
  @IsNotEmpty({ message: 'Укажите название карточки' })
  title!: string;

  @Expose()
  @IsString({ message: 'Изображение должно быть строкой' })
  @IsNotEmpty({ message: 'Укажите изображение карточки' })
  image!: string;

  @Expose()
  @IsString({ message: 'Видео должно быть строкой' })
  @IsNotEmpty({ message: 'Укажите видео карточки' })
  video!: string;

  @Expose()
  @IsString({ message: 'Видео должно быть строкой' })
  @IsNotEmpty({ message: 'Укажите видео карточки' })
  category!: string;
}
