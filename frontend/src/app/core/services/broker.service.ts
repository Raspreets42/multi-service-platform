import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Property, PropertyClient } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class BrokerService {
  private apiUrl = `${environment.apiUrl}/api/broker`;

  constructor(private http: HttpClient) { }

  // Property APIs
  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.apiUrl}/properties`);
  }

  addProperty(formData: FormData): Observable<Property> {
    return this.http.post<Property>(`${this.apiUrl}/properties`, formData);
  }

  updateProperty(id: string, formData: FormData): Observable<Property> {
    return this.http.put<Property>(`${this.apiUrl}/properties/${id}`, formData);
  }

  deleteProperty(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/properties/${id}`);
  }

  // Client APIs
  getClients(): Observable<PropertyClient[]> {
    return this.http.get<PropertyClient[]>(`${this.apiUrl}/clients`);
  }

  addClient(formData: FormData): Observable<PropertyClient> {
    return this.http.post<PropertyClient>(`${this.apiUrl}/clients`, formData);
  }

  updateClient(id: string, formData: FormData): Observable<PropertyClient> {
    return this.http.put<PropertyClient>(`${this.apiUrl}/clients/${id}`, formData);
  }

  deleteClient(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clients/${id}`);
  }
}
