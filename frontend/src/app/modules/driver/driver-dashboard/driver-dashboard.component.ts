import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DriverService } from '../../../core/services/driver.service';
import { Vehicle, RideClient } from '../../../core/models/user.model';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-driver-dashboard',
  templateUrl: './driver-dashboard.component.html',
  styleUrls: ['./driver-dashboard.component.css']
})
export class DriverDashboardComponent implements OnInit {
  vehicles: Vehicle[] = [];
  clients: RideClient[] = [];
  loading = false;
  activeTab: 'vehicles' | 'clients' = 'vehicles';

  constructor(
    private driverService: DriverService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadVehicles();
    this.loadClients();
  }

  loadVehicles(): void {
    this.loading = true;
    this.driverService.getVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading vehicles:', error);
        this.loading = false;
      }
    });
  }

  loadClients(): void {
    this.driverService.getClients().subscribe({
      next: (data) => {
        this.clients = data;
      },
      error: (error) => {
        console.error('Error loading clients:', error);
      }
    });
  }

  setActiveTab(tab: 'vehicles' | 'clients'): void {
    this.activeTab = tab;
  }

  addVehicle(): void {
    this.router.navigate(['/driver/add-vehicle'],{
      state: { isEditMode: false }
    });
  }

  addClient(): void {
    this.router.navigate(['/driver/add-client'],{
      state: { isEditMode: false }
    });
  }

  editVehicle(vehicle: any): void {
    this.router.navigate(['/driver/add-vehicle'], {
      state: { vehicle: vehicle, isEditMode: true }
    });
  }

  editClient(client: any): void {
    this.router.navigate(['/driver/add-client'], {
      state: { client: client, isEditMode: true }
    });
  }

  deleteVehicle(id: string): void {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      this.driverService.deleteVehicle(id).subscribe({
        next: () => {
          this.loadVehicles();
        },
        error: (error) => {
          console.error('Error deleting vehicle:', error);
          alert('Failed to delete vehicle');
        }
      });
    }
  }

  deleteClient(id: string): void {
    if (confirm('Are you sure you want to delete this client?')) {
      this.driverService.deleteClient(id).subscribe({
        next: () => {
          this.loadClients();
        },
        error: (error) => {
          console.error('Error deleting client:', error);
          alert('Failed to delete client');
        }
      });
    }
  }

  getImageUrl(path: string | undefined): string {
    if (!path) return 'assets/placeholder.jpg';
    return `${environment.apiUrl}/${path}`;
  }
}
