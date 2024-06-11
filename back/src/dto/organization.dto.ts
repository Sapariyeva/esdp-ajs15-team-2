import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class OrganizationDto {
  
  @Expose()
  @IsNumber({}, { message: "Идентификатор отправителя должен быть числом" })
  @IsNotEmpty({message: "Укажите отправителя"})  
    senderId!: number;

  @Expose()
  @IsNumber({}, { message: "Идентификатор получателя должен быть числом" })
  @IsNotEmpty({message: "Укажите получателя"})  
    receiverId!: number;
}