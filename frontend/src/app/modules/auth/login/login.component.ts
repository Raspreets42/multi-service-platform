import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  error = '';
  returnUrl: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Redirect if already logged in
    if (this.authService.currentUserValue) {
      this.navigateToDefaultPage();
    }

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        if (this.returnUrl) {
          this.router.navigateByUrl(this.returnUrl);
        } else {
          this.navigateToDefaultPage();
        }
      },
      error: (error) => {
        this.error = error.error?.message || 'Login failed. Please try again.';
        this.loading = false;
      }
    });
  }

  private navigateToDefaultPage(): void {
    const user = this.authService.currentUserValue;
    const currentRole = this.authService.currentRoleValue;

    if (currentRole === 'broker') {
      this.router.navigate(['/broker/dashboard']);
    } else if (currentRole === 'driver') {
      this.router.navigate(['/driver/dashboard']);
    } else if (currentRole === 'caterer') {
      this.router.navigate(['/mess/dashboard']);
    } else if (user && user.roles.length > 0) {
      const firstRole = user.roles[0];
      if (firstRole === 'broker') {
        this.router.navigate(['/broker/dashboard']);
      } else if (firstRole === 'driver') {
        this.router.navigate(['/driver/dashboard']);
      } else {
        this.router.navigate(['/mess/dashboard']);
      }
    }
  }
}
