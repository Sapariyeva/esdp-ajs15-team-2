import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional } from "class-validator";

@Expose()
export class SurveyDto {
  @IsNotEmpty()
  userId!: number;

  @IsOptional()
  source?: string;
}