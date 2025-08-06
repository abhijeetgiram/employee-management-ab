import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-signup',
  template: `
    <div class="container mt-5">
      <h2>Signup</h2>
      <form (ngSubmit)="signup()" #signupForm="ngForm">
        <div class="mb-3">
          <label>Email:</label>
          <input
            [(ngModel)]="email"
            name="email"
            required
            email
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label>Password:</label>
          <input
            [(ngModel)]="password"
            type="password"
            name="password"
            required
            minlength="4"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label>Role:</label>
          <select [(ngModel)]="role" name="role" required class="form-control">
            <option value="">Select role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <button class="btn btn-primary" [disabled]="!signupForm.valid">
          Signup
        </button>
      </form>
    </div>
  `,
})
export class SignupComponent {
  email = '';
  password = '';
  role = '';

  constructor(private router: Router) {}

  signup() {
    // For UI-only, just store to localStorage for login simulation
    localStorage.setItem(
      'signup_user',
      JSON.stringify({
        email: this.email,
        password: this.password,
        role: this.role,
      })
    );
    alert('Signup successful! Please login.');
    this.router.navigate(['/']);
  }
}
