import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { EmployeeListComponent } from './employee/employee-list.component';
import { EmployeeDetailComponent } from './employee/employee-detail.component';
import { EmployeeFormComponent } from './employee/employee-form.component';
import { authGuard } from './guard/auth.guard';
import { PageNotFoundComponent } from './shared/page-not-found.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'employees',
    component: EmployeeListComponent,
    canActivate: [authGuard],
  },
  { path: 'employee/:id', 
    component: EmployeeDetailComponent, 
    canActivate: [authGuard], 
  },
  { path: 'employee-edit/:id', 
    component: EmployeeFormComponent, 
    canActivate: [authGuard] 
  },
  { path: 'employee-add', 
    component: EmployeeFormComponent, 
    canActivate: [authGuard] 
  },
  {
    path: '**', 
    component: PageNotFoundComponent,
  }
];
