/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty } from "class-validator";
import { DemandeStatus } from "../entities/demande.entity";

export class ChangeStatusDto {
  @IsEnum(DemandeStatus)
  @IsNotEmpty()
  statut: DemandeStatus;
}