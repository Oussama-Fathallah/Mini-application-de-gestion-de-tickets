import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DemandeService } from '../../services/demande.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-demande',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './edit-demande.component.html',
  styleUrl: './edit-demande.component.css'
})
export class EditDemandeComponent {

  editForm: FormGroup;
  demandeId: string = '';
  demandeInitiale: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private demandeService: DemandeService
  ) {
    this.editForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.demandeId = this.route.snapshot.paramMap.get('id')!;
    this.demandeService.getDemandeById(this.demandeId).subscribe(demande => {
      this.demandeInitiale = demande;
      this.editForm.patchValue({
        titre: demande.titre,
        description: demande.description
      });
    });
  }

  onUpdateInfo(): void {
    if (this.editForm.valid) {
      const formValues = this.editForm.value;
      const aChange = formValues.titre !== this.demandeInitiale.titre || 
                      formValues.description !== this.demandeInitiale.description;

      if (!aChange) {
        this.router.navigate(['/details', this.demandeId], { queryParams: { info: 'true' } });
        return; 
      }
      this.demandeService.updateDemande(this.demandeId, formValues).subscribe({
        next: () => {
          this.router.navigate(['/details', this.demandeId], { queryParams: { success: 'true' } });
        },
        error: (err) => alert(err.error.message || 'Erreur de mise à jour')
      });
    }
  }

}
