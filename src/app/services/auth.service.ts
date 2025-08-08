import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLoggedInStatus = false; // mock

  login() {
    this.isLoggedInStatus = true;
    localStorage.setItem('isLoggedInStatus', 'true');
  }

  logout() {
    this.isLoggedInStatus = false;
    localStorage.removeItem('isLoggedInStatus');
  }

  isLoggedIn() {
    const storedStatus = localStorage.getItem('isLoggedInStatus');
    if (storedStatus !== null) {
      this.isLoggedInStatus = storedStatus === 'true';
    }
    return this.isLoggedInStatus;
  }
}
