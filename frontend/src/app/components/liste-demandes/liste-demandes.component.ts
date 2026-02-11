import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  successMessage: string | null = null;

  constructor(private demandeService: DemandeService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
    if (params['success']) {
      this.showNotification('Demande créée avec succès !');
    }
  });
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

  onDelete(id: string, titre: string): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer la demande : "${titre}" ?`)) {
      this.demandeService.deleteDemande(id).subscribe({
        next: () => {
          this.loadDemandes(this.selectedStatus || undefined);
          this.showNotification(`La demande "${titre}" a été supprimée avec succès`);
        },
        error: (err) => alert('Erreur lors de la suppression')
      });
    }
  }

  showNotification(message: string): void {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = null;
    }, 5000);
  }
}