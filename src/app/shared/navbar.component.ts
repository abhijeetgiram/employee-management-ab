import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand cursor-pointer" (click)="goHome()">Employee Management System</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item" *ngIf="!isLoggedIn()">
              <a class="nav-link" routerLink="/">Login</a>
            </li>
            <li class="nav-item" *ngIf="isLoggedIn()">
              <a class="nav-link" routerLink="/employees">Employees</a>
            </li>
          </ul>

          <ul class="navbar-nav">
            <li class="nav-item" *ngIf="isLoggedIn()">
              <span class="navbar-text text-white me-3">Role: {{ role }}</span>
            </li>
            <li class="nav-item" *ngIf="isLoggedIn()">
              <button class="btn btn-sm btn-outline-light" (click)="logout()">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  private authService = inject(AuthService);
  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('role');
  }

  get role(): string {
    return localStorage.getItem('role') || '';
  }

  logout() {
    localStorage.clear();
    this.authService.logout();
    this.router.navigate(['/']);
  }

    goHome() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/employees']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
