import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-role-toggle',
  templateUrl: './role-toggle.component.html',
  styleUrls: ['./role-toggle.component.css']
})
export class RoleToggleComponent implements OnInit {
  currentUser: User | null = null;
  currentRole: string = '';
  showDropdown = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    this.authService.currentRole.subscribe(role => {
      this.currentRole = role;
    });
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  switchRole(role: string): void {
    this.authService.switchRole(role);
    this.showDropdown = false;
  }

  getRoleDisplayName(role: string): string {
    const roleNames: any = {
      'broker': 'Broker',
      'driver': 'Driver',
      'caterer': 'Caterer'
    };
    return roleNames[role] || role;
  }
}
