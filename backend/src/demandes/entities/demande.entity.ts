/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Historique } from "./historique.entity";


export enum DemandeStatus {
  BROUILLON = 'Brouillon',
  SOUMISE = 'Soumise',
  VALIDEE = 'Validée',
}

@Entity({ name: 'demandes' })
export class Demande {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titre: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: DemandeStatus,
    default: DemandeStatus.BROUILLON,
  })
  statut: DemandeStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Historique, (historique) => historique.demande, { cascade: true })
  historiques: Historique[];
}
