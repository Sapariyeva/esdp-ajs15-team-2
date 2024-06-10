import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class FoundOutTypeDto {
  
  @IsNotEmpty({message: "Способ не может быть создан без названия"})
  @IsString({message: "Способ нахождения должно быть строкой"})
  @Expose() 
    title!: string;

  @IsNotEmpty({message: "Способ не может быть создан без фотографии"})
  @IsString({message: "Фотография способа нахождения должна быть строкой"})
  @Expose() 
    image!: string;
}
