/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateDemandeDto } from './create-demande.dto';
import { DemandeStatus } from '../entities/demande.entity';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateDemandeDto extends PartialType(CreateDemandeDto) {
  @IsOptional()
  @IsEnum(DemandeStatus)
  statut?: DemandeStatus;
}