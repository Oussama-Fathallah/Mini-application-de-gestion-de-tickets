import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemandeService } from '../../services/demande.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-ajout-demande',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './ajout-demande.component.html',
  styleUrl: './ajout-demande.component.css'
})
export class AjoutDemandeComponent {

  demandeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private demandeService: DemandeService,
    private router: Router
  ) {
    this.demandeForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.demandeForm.valid) {
      this.demandeService.createDemande(this.demandeForm.value).subscribe({
        next: () => {this.router.navigate(['/demandes'], { queryParams: { success: 'true' } });},
        error: (err) => alert('Erreur lors de la création')
      });
    }
  }

}
