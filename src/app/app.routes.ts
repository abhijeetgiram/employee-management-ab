import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { authGuard } from './guard/auth.guard';
import { CanDeactivateGuard } from './guard/can-deactivate.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'employees',
    loadComponent: () => import('./employee/employee-list.component').then(m => m.EmployeeListComponent),
    canActivate: [authGuard],
  },
  { path: 'employee/:id', 
    loadComponent: () => import('./employee/employee-detail.component').then(m => m.EmployeeDetailComponent),
    canActivate: [authGuard], 
  },
  { path: 'employee-edit/:id', 
    loadComponent: () => import('./employee/employee-form.component').then(m => m.EmployeeFormComponent),
    canActivate: [authGuard] ,
     canDeactivate: [CanDeactivateGuard],
  },
  { path: 'employee-add', 
    loadComponent: () => import('./employee/employee-form.component').then(m => m.EmployeeFormComponent),
    canActivate: [authGuard] ,
     canDeactivate: [CanDeactivateGuard],
  },
  {
    path: '**', 
    loadComponent: () => import('./shared/page-not-found.component').then(m => m.PageNotFoundComponent),
  }
];
