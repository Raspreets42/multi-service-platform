import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Caterer, TiffinClient } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MessService {
  private apiUrl = `${environment.apiUrl}/api/mess`;

  constructor(private http: HttpClient) { }

  // Caterer APIs
  getCaterers(): Observable<Caterer[]> {
    return this.http.get<Caterer[]>(`${this.apiUrl}/caterers`);
  }

  addCaterer(formData: FormData): Observable<Caterer> {
    return this.http.post<Caterer>(`${this.apiUrl}/caterers`, formData);
  }

  updateCaterer(id: string, formData: FormData): Observable<Caterer> {
    return this.http.put<Caterer>(`${this.apiUrl}/caterers/${id}`, formData);
  }

  deleteCaterer(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/caterers/${id}`);
  }

  // Client APIs
  getClients(): Observable<TiffinClient[]> {
    return this.http.get<TiffinClient[]>(`${this.apiUrl}/clients`);
  }

  addClient(formData: FormData): Observable<TiffinClient> {
    return this.http.post<TiffinClient>(`${this.apiUrl}/clients`, formData);
  }

  updateClient(id: string, formData: FormData): Observable<TiffinClient> {
    return this.http.put<TiffinClient>(`${this.apiUrl}/clients/${id}`, formData);
  }

  deleteClient(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clients/${id}`);
  }
}
