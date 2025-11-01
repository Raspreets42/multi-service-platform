import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessService } from '../../../core/services/mess.service';
import { Caterer, TiffinClient } from '../../../core/models/user.model';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-mess-dashboard',
  templateUrl: './mess-dashboard.component.html',
  styleUrls: ['./mess-dashboard.component.css']
})
export class MessDashboardComponent implements OnInit {
  caterers: Caterer[] = [];
  clients: TiffinClient[] = [];
  loading = false;
  activeTab: 'caterers' | 'clients' = 'caterers';

  constructor(
    private messService: MessService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCaterers();
    this.loadClients();
  }

  loadCaterers(): void {
    this.loading = true;
    this.messService.getCaterers().subscribe({
      next: (data) => {
        this.caterers = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading caterers:', error);
        this.loading = false;
      }
    });
  }

  loadClients(): void {
    this.messService.getClients().subscribe({
      next: (data) => {
        this.clients = data;
      },
      error: (error) => {
        console.error('Error loading clients:', error);
      }
    });
  }

  setActiveTab(tab: 'caterers' | 'clients'): void {
    this.activeTab = tab;
  }

  addCaterer(): void {
    this.router.navigate(['/mess/add-caterer'],{
      state: { isEditMode: false }
    });
  }

  addClient(): void {
    this.router.navigate(['/mess/add-client'],{
      state: { isEditMode: false }
    });
  }

  editCaterer(caterer: any): void {
    this.router.navigate(['/mess/add-caterer'],{
      state: { caterer: caterer, isEditMode: true }
    });
  }

  editClient(client: any): void {
    this.router.navigate(['/mess/add-client'],{
      state: { client: client, isEditMode: true }
    });
  }

  deleteCaterer(id: string): void {
    if (confirm('Are you sure you want to delete this caterer?')) {
      this.messService.deleteCaterer(id).subscribe({
        next: () => {
          this.loadCaterers();
        },
        error: (error) => {
          console.error('Error deleting caterer:', error);
          alert('Failed to delete caterer');
        }
      });
    }
  }

  deleteClient(id: string): void {
    if (confirm('Are you sure you want to delete this client?')) {
      this.messService.deleteClient(id).subscribe({
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
