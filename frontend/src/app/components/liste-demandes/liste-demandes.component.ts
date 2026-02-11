import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Demande } from '../../models/demande.model';
import { DemandeService } from '../../services/demande.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-liste-demandes',
  standalone: true,
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: './liste-demandes.component.html',
  styleUrl: './liste-demandes.component.css'
})
export class ListeDemandesComponent {
demandes: Demande[] = [];
  selectedStatus: string = ''; 

  constructor(private demandeService: DemandeService) {}

  ngOnInit(): void {
    this.loadDemandes();
  }

  loadDemandes(status?: string): void {
    this.demandeService.getDemandes(status).subscribe({
      next: (data) => this.demandes = data,
      error: (err) => console.error('Erreur :', err)
    });
  }

  onFilterChange(): void {
    this.loadDemandes(this.selectedStatus || undefined);
    return console.log(this.selectedStatus);
  }
}