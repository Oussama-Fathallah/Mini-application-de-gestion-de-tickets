import { Routes } from '@angular/router';
import { ListeDemandesComponent } from './components/liste-demandes/liste-demandes.component';
import { AjoutDemandeComponent } from './components/ajout-demande/ajout-demande.component';
import { DetailsDemandeComponent } from './components/details-demande/details-demande.component';
import { JournalActiviteComponent } from './components/journal-activite/journal-activite.component';



export const routes: Routes = [
  { path: '', redirectTo: 'demandes', pathMatch: 'full' },
  { path: 'demandes', component: ListeDemandesComponent },
  { path: 'ajouter', component: AjoutDemandeComponent },
  { path: 'details/:id', component: DetailsDemandeComponent },
  { path: 'journal', component: JournalActiviteComponent }
];
