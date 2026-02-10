export interface Historique {
  id: number;
  typeAction: string;
  details: string;
  utilisateur: string;
  dateAction: string;
}

export interface Demande {
  id: string;
  titre: string;
  description: string;
  statut: string;
  createdAt: string;
  updatedAt: string;
  historiques?: Historique[];
}