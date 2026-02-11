import { Component } from '@angular/core';
import { DemandeService } from '../../services/demande.service';
import { ActivatedRoute } from '@angular/router';
import { Demande } from '../../models/demande.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-demande',
  imports: [CommonModule],
  templateUrl: './details-demande.component.html',
  styleUrl: './details-demande.component.css'
})
export class DetailsDemandeComponent {
demande?: Demande;

  constructor(
    private route: ActivatedRoute,
    private demandeService: DemandeService,
  ) {}

ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.demandeService.getDemandeById(id).subscribe(data => {
      this.demande = data;
    });
  }
}
}
