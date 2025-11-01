import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Vehicle, RideClient } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private apiUrl = `${environment.apiUrl}/api/driver`;

  constructor(private http: HttpClient) { }

  // Vehicle APIs
  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiUrl}/vehicles`);
  }

  addVehicle(formData: FormData): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.apiUrl}/vehicles`, formData);
  }

  updateVehicle(id: string, formData: FormData): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.apiUrl}/vehicles/${id}`, formData);
  }

  deleteVehicle(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/vehicles/${id}`);
  }

  // Client APIs
  getClients(): Observable<RideClient[]> {
    return this.http.get<RideClient[]>(`${this.apiUrl}/clients`);
  }

  addClient(formData: FormData): Observable<RideClient> {
    return this.http.post<RideClient>(`${this.apiUrl}/clients`, formData);
  }

  updateClient(id: string, formData: FormData): Observable<RideClient> {
    return this.http.put<RideClient>(`${this.apiUrl}/clients/${id}`, formData);
  }

  deleteClient(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clients/${id}`);
  }
}
