import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrokerService } from '../../../core/services/broker.service';
import { Property, PropertyClient } from '../../../core/models/user.model';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-broker-dashboard',
  templateUrl: './broker-dashboard.component.html',
  styleUrls: ['./broker-dashboard.component.css']
})
export class BrokerDashboardComponent implements OnInit {
  properties: Property[] = [];
  clients: PropertyClient[] = [];
  loading = false;
  activeTab: 'properties' | 'clients' = 'properties';
  currentImageIndexes: { [key: number]: number } = {};

  constructor(
    private brokerService: BrokerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProperties();
    this.loadClients();
  }

  getCurrentImageIndex(propertyIndex: number): number {
    return this.currentImageIndexes[propertyIndex] || 0;
  }
  getCurrentImage(property: any, propertyIndex: number): string {
    if (!property.propertyMedia || property.propertyMedia.length === 0) {
      return '';
    }
    const currentIndex = this.getCurrentImageIndex(propertyIndex);
    return property.propertyMedia[currentIndex];
  }

  nextImage(property: any, propertyIndex: number): void {
    if (!property.propertyMedia || property.propertyMedia.length === 0) return;

    const currentIndex = this.getCurrentImageIndex(propertyIndex);
    const maxIndex = property.propertyMedia.length - 1;

    this.currentImageIndexes[propertyIndex] = currentIndex >= maxIndex ? 0 : currentIndex + 1;
  }

  previousImage(property: any, propertyIndex: number): void {
    if (!property.propertyMedia || property.propertyMedia.length === 0) return;

    const currentIndex = this.getCurrentImageIndex(propertyIndex);
    const maxIndex = property.propertyMedia.length - 1;

    this.currentImageIndexes[propertyIndex] = currentIndex <= 0 ? maxIndex : currentIndex - 1;
  }

  goToImage(property: any, propertyIndex: number, imageIndex: number): void {
    this.currentImageIndexes[propertyIndex] = imageIndex;
  }

  loadProperties(): void {
    this.loading = true;
    this.brokerService.getProperties().subscribe({
      next: (data) => {
        this.properties = data;
        this.loading = false;
        this.properties.forEach((_, index) => {
          this.currentImageIndexes[index] = 0;
        });
      },
      error: (error) => {
        console.error('Error loading properties:', error);
        this.loading = false;
      }
    });
  }

  loadClients(): void {
    this.brokerService.getClients().subscribe({
      next: (data) => {
        this.clients = data;
      },
      error: (error) => {
        console.error('Error loading clients:', error);
      }
    });
  }

  setActiveTab(tab: 'properties' | 'clients'): void {
    this.activeTab = tab;
  }

  addProperty(): void {
    this.router.navigate(['/broker/add-property'], {
      state: { isEditMode: false }
    });
  }

  addClient(): void {
    this.router.navigate(['/broker/add-client'], {
      state: { isEditMode: false }
    });
  }

  editProperty(property: any): void {
    this.router.navigate(['/broker/add-property'], {
      state: { property: property, isEditMode: true }
    });
  }

  editClient(client: any): void {
    this.router.navigate(['/broker/add-client', client._id!], {
      state: { client: client, isEditMode: true }
    });
  }

  deleteProperty(id: string): void {
    if (confirm('Are you sure you want to delete this property?')) {
      this.brokerService.deleteProperty(id).subscribe({
        next: () => {
          this.loadProperties();
        },
        error: (error) => {
          console.error('Error deleting property:', error);
          alert('Failed to delete property');
        }
      });
    }
  }

  deleteClient(id: string): void {
    if (confirm('Are you sure you want to delete this client?')) {
      this.brokerService.deleteClient(id).subscribe({
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
