/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDemandeDto } from './dto/create-demande.dto';
import { UpdateDemandeDto } from './dto/update-demande.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Demande, DemandeStatus } from './entities/demande.entity';
import { Historique } from './entities/historique.entity';
import { ChangeStatusDto } from './dto/change-status.dto';

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
        details: `Création du ticket : "${createDemandeDto.titre}"`,
        utilisateur: 'Admin'
      }],
    });
    await this.demandeRepository.save(demande);
    return { message: 'Demande créée avec succès' };
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
      order: {
          historiques: {
            dateAction: 'DESC'
          }
    }
    });
    if (!demande) {
      throw new NotFoundException('Demande not found');
    }
    return demande;
  }

  async update(id: string, updateDto: UpdateDemandeDto) {
    const demande = await this.findOne(id);
    const changements = [];
    
    if (updateDto.titre && updateDto.titre !== demande.titre) {
      changements.push(`Titre: "${demande.titre}" ➔ "${updateDto.titre}"`);
    }
    
    if (updateDto.description && updateDto.description !== demande.description) {
      changements.push(`Description: "${demande.description}" ➔ "${updateDto.description}"`);
    }
    Object.assign(demande, updateDto);
    if (changements.length > 0) {
      const log = new Historique();
      log.typeAction = 'MODIFICATION';
      log.details = `Mise à jour :\n${changements.join(' \n')}`;
      log.utilisateur = 'Admin';
      
      if (!demande.historiques) demande.historiques = [];
      demande.historiques.push(log);
    }

    const updated = await this.demandeRepository.save(demande);
    
    return {
      message: 'Demande mise à jour avec succès',
      data: updated
    };
  }

  async updateStatus(id: string, statusDto: ChangeStatusDto) {
    const demande = await this.findOne(id);
    const ancienStatut = demande.statut;

    if (ancienStatut === statusDto.statut) return { message: `Le statut est déjà ${statusDto.statut}`}; ;
    demande.statut = statusDto.statut;

    const log = new Historique();
    log.typeAction = 'CHANGEMENT STATUT';
    log.details = `Passage du statut ${ancienStatut} à ${statusDto.statut}`;

    demande.historiques.push(log);
    await this.demandeRepository.save(demande);
    return { message: `Le statut est bien changé à ${statusDto.statut}`};
  }

  async remove(id: string) {
    const demande = await this.findOne(id);

    await this.historiqueRepository.save({
      typeAction: 'SUPPRESSION',
      details: `Suppression définitive du ticket : "${demande.titre}"`,
      demande,
    });
    await this.demandeRepository.softDelete(id);
    return { message: `La demande "${demande.titre}" a été supprimée avec succès` };
  }
}
