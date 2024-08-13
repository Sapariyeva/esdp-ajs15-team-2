import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class SettingsDto {
    @IsNotEmpty({ message: 'Название должно быть строкой' })
    @IsString({ message: 'Укажите название карточки' })
    @Expose()
    title!: string;

    @IsNotEmpty({ message: 'Изображение должно быть строкой' })
    @IsString({ message: 'Укажите изображение карточки' })
    @Expose()
    image!: string;

    @Expose()
    @IsString({ message: 'Видео должно быть строкой' })
    @IsNotEmpty({ message: 'Укажите видео карточки' })
    video!: string;

    @Expose()
    @IsString({ message: 'Категория должна быть строкой' })
    @IsNotEmpty({ message: 'Укажите категорию карточки' })
    category!: string;
}