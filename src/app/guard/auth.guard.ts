import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastService);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    toastService.show('You must be logged in to access this page', 'warning');
    router.navigate(['/']);
    return false;
  }
};
