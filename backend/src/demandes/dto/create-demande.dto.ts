/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CreateDemandeDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  titre: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}