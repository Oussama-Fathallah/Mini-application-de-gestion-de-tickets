import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DemandeService } from '../../services/demande.service';

@Component({
  selector: 'app-journal-activite',
  imports: [CommonModule],
  templateUrl: './journal-activite.component.html',
  styleUrl: './journal-activite.component.css'
})
export class JournalActiviteComponent {
  logs: any[] = [];

  constructor(private demandeService: DemandeService) {}

  ngOnInit(): void {
    this.demandeService.getAllLogs().subscribe(data => this.logs = data);
  }

  getActionClass(type: string): string {
    if (type === 'CRÉATION') return 'text-success';
    if (type === 'SUPPRESSION') return 'text-danger';
    return 'text-primary';
  }

}
