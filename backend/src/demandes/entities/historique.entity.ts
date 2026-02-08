/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Demande } from './demande.entity';

@Entity({ name: 'historiques' })
export class Historique {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  typeAction: string;

  @Column({ nullable: true })
  details: string; 

  @Column({ default: 'Admin' })
  utilisateur: string;

  @CreateDateColumn()
  dateAction: Date;

  @ManyToOne(() => Demande, (demande) => demande.historiques, { onDelete: 'CASCADE' })
  demande: Demande;
}