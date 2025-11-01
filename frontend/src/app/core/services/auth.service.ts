import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { User, LoginRequest, LoginResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private currentRoleSubject: BehaviorSubject<string>;
  public currentRole: Observable<string>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();

    const storedRole = localStorage.getItem('currentRole');
    const user = this.currentUserValue;
    this.currentRoleSubject = new BehaviorSubject<string>(
      storedRole || (user?.roles[0] || '')
    );
    this.currentRole = this.currentRoleSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public get currentRoleValue(): string {
    return this.currentRoleSubject.value;
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/api/auth/login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          localStorage.setItem('currentRole', response.user.roles[0]);
          this.currentUserSubject.next(response.user);
          this.currentRoleSubject.next(response.user.roles[0]);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentRole');
    this.currentUserSubject.next(null);
    this.currentRoleSubject.next('');
    this.router.navigate(['/login']);
  }

  switchRole(role: string): void {
    const user = this.currentUserValue;
    if (user && user.roles.includes(role)) {
      localStorage.setItem('currentRole', role);
      this.currentRoleSubject.next(role);

      // Navigate to appropriate dashboard
      if (role === 'broker') {
        this.router.navigate(['/broker/dashboard']);
      } else if (role === 'driver') {
        this.router.navigate(['/driver/dashboard']);
      } else if (role === 'caterer') {
        this.router.navigate(['/mess/dashboard']);
      }
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
