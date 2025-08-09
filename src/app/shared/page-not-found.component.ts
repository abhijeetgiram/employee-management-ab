import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-page-not-found',
  imports: [CommonModule],
  template: `
    <div class="container text-center mt-5">
      <h1 class="display-4 text-danger">404</h1>
      <p class="lead">Oops! The page you are looking for does not exist.</p>
      <button class="btn btn-primary mt-3" (click)="goHome()">
        Go to Home
      </button>
    </div>
  `,
})
export class PageNotFoundComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  goHome() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/employees']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
