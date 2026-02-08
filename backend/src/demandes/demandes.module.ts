/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DemandesService } from './demandes.service';
import { DemandesController } from './demandes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Demande } from './entities/demande.entity';
import { Historique } from './entities/historique.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Demande, Historique])],
  controllers: [DemandesController],
  providers: [DemandesService],
})
export class DemandesModule {}
