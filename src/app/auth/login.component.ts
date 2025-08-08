import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-login',
  template: `
    <div class="container mt-5">
      <h2>Login</h2>
      <form (ngSubmit)="login()">
        <div class="mb-3">
          <label>Email:</label>
          <input
            [(ngModel)]="email"
            name="email"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label>Password:</label>
          <input
            [(ngModel)]="password"
            type="password"
            name="password"
            class="form-control"
            required
          />
        </div>
        <button class="btn btn-primary">Login</button>
        <p *ngIf="loginError" class="text-danger mt-2">Invalid credentials</p>
      </form>
    </div>
  `,
})
export class LoginComponent {
  email = '';
  password = '';
  loginError = false;
  private authService = inject(AuthService);

  constructor(private router: Router) {}

  login() {
    // Only one user hardcoded
    if (this.email === 'admin@example.com' && this.password === 'admin') {
      this.authService.login();
      localStorage.setItem('role', 'admin');
      this.router.navigate(['/employees']);
    } else if (this.email === 'user@example.com' && this.password === 'user') {
      this.authService.login();
      localStorage.setItem('role', 'user');
      this.router.navigate(['/employees']);
    } else {
      this.loginError = true;
    }
  }
}
