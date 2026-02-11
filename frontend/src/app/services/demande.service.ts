import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Demande } from '../models/demande.model';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private apiUrl = 'http://localhost:3000/demandes';

  constructor(private http: HttpClient) { }

  getDemandes(status?: string): Observable<Demande[]> {
    let url = this.apiUrl;
    if (status) {
      url += `?status=${status}`;
    }
    return this.http.get<Demande[]>(url);
  }

  getDemandeById(id: string): Observable<Demande> {
  return this.http.get<Demande>(`${this.apiUrl}/${id}`);
  }

  createDemande(demande: Partial<Demande>): Observable<Demande> {
    return this.http.post<Demande>(this.apiUrl, demande);
  }

  getAllLogs(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/audit-log/all`);
  }

  updateDemande(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, data);
  }

  updateStatus(id: string, statut: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/status`, { statut });
  }

  deleteDemande(id: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
  }


}