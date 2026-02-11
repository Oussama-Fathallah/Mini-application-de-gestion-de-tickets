import { Component } from '@angular/core';
import { DemandeService } from '../../services/demande.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Demande } from '../../models/demande.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-demande',
  imports: [CommonModule,RouterLink],
  templateUrl: './details-demande.component.html',
  styleUrl: './details-demande.component.css'
})
export class DetailsDemandeComponent {
demande?: Demande;
successMessage: string | null = null;
  demandeId: string | null = null;
  isInfoMessage: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private demandeService: DemandeService,
  ) {}

ngOnInit(): void {

  this.route.queryParams.subscribe(params => {
    if (params['success']) {
      this.isInfoMessage = false;
      this.showNotification('Demande modifiée avec succès !');
    } else if (params['info']) {
      this.isInfoMessage = true;
      this.showNotification('Aucune modification détectée.');
    }
  });
    this.demandeId = this.route.snapshot.paramMap.get('id');
    this.loadDemande();
  }
loadDemande(): void {
    if (this.demandeId) {
      this.demandeService.getDemandeById(this.demandeId).subscribe({
        next: (data) => this.demande = data,
        error: (err) => console.error('Erreur lors du chargement', err)
      });
    }
  }

  changeStatus(nouveauStatut: string): void {
    if (this.demande) {
      this.demandeService.updateStatus(this.demande.id, nouveauStatut).subscribe({
        next: () => {
          this.isInfoMessage = false;
          this.showNotification(`Statut mis à jour : ${nouveauStatut}`);
          this.loadDemande();
        },
        error: (err) => alert('Erreur lors du changement de statut')
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
