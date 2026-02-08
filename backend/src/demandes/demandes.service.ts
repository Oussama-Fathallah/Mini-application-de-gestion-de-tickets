/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDemandeDto } from './dto/create-demande.dto';
import { UpdateDemandeDto } from './dto/update-demande.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Demande, DemandeStatus } from './entities/demande.entity';
import { Historique } from './entities/historique.entity';

@Injectable()
export class DemandesService {

  constructor(@InjectRepository(Demande) 
  private readonly demandeRepository: Repository<Demande>,
  @InjectRepository(Historique)
  private readonly historiqueRepository: Repository<Historique>
  ) {}

  async create(createDemandeDto: CreateDemandeDto) {
    const demande = this.demandeRepository.create({
      ...createDemandeDto,
      historiques: [{
        typeAction: 'CRÉATION',
        details: 'Création de la demande',
      },],
    });
    return await this.demandeRepository.save(demande);
  }
  
  async findAllLogs() {
  return await this.historiqueRepository.find({
    order: { dateAction: 'DESC' },
    relations: ['demande'],
  });
}

  async findAll(status?: DemandeStatus) {
    return await this.demandeRepository.find({
      where: status ? { statut: status } : {}, 
      relations: ['historiques'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string) {
    const demande = await this.demandeRepository.findOne({
      where: { id },
      relations: ['historiques'],
    });
    if (!demande) {
      throw new NotFoundException('Demande not found');
    }
    return demande;
  }

  async update(id: string, updateDemandeDto: UpdateDemandeDto) {
    const demande = await this.findOne(id);

    const ancienStatut = demande.statut;

    Object.assign(demande, updateDemandeDto);

    if (updateDemandeDto.statut && updateDemandeDto.statut !== ancienStatut) {
      if (!demande.historiques) demande.historiques = [];
      const NvLog = new Historique();
      NvLog.typeAction = 'CHANGEMENT STATUT';
      NvLog.details = `Changement de statut de ${ancienStatut} à ${updateDemandeDto.statut}`;
      demande.historiques.push(NvLog);
    }
    return await this.demandeRepository.save(demande);
  }

  async remove(id: string) {
    const demande = await this.findOne(id);

    await this.historiqueRepository.save({
      typeAction: 'SUPPRESSION',
      details: 'Suppression de la demande',
      demande,
    });

    return await this.demandeRepository.softDelete(id);
  }
}
