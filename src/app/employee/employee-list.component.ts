import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Employee } from '../models/employee.model';
import * as EmployeeActions from '../store/employee/employee.actions';
import * as EmployeeSelectors from '../store/employee/employee.selectors';
import { EmployeeSearchPipe } from '../pipes/employee-search.pipe';
import { MobileFormatPipe } from '../pipes/mobile-format.pipe';

@Component({
  standalone: true,
  selector: 'app-employee-list',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    EmployeeSearchPipe,
    MobileFormatPipe,
  ],
  template: `
    <div class="container mt-4">
      <h2>Employee List</h2>

      <!-- Search input -->
      <input
        class="form-control mb-3"
        placeholder="Search by name or department"
        [(ngModel)]="searchText"
      />

      <!-- Loading state -->
      <div *ngIf="loading$ | async" class="alert alert-info">
        Loading employees...
      </div>

      <!-- Error state -->
      <div *ngIf="error$ | async as error" class="alert alert-danger">
        Error: {{ error }}
      </div>

      <!-- Employee table -->
      <table
        class="table table-bordered"
        *ngIf="(employees$ | async)!.length > 0; else noData"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Mobile</th>
            <th>Status</th>
            <th *ngIf="isAdmin">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            *ngFor="
              let emp of (employees$ | async)! | employeeSearch : searchText
            "
          >
            <td>
              <a [routerLink]="['/employee', emp.id]">{{ emp.name }}</a>
            </td>
            <td>{{ emp.department }}</td>
            <td>{{ emp.mobile | mobileFormat }}</td>
            <td>{{ emp.isActive ? 'Active' : 'Inactive' }}</td>
            <td *ngIf="isAdmin">
              <button
                class="btn btn-sm btn-warning"
                [routerLink]="['/employee-edit', emp.id]"
              >
                Edit
              </button>
              <button
                class="btn btn-sm btn-danger"
                (click)="deleteEmployee(emp.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- No employees -->
      <ng-template #noData>
        <p class="text-muted">No employees found.</p>
      </ng-template>

      <!-- Add Employee -->
      <button
        *ngIf="isAdmin"
        class="btn btn-primary mt-3"
        [routerLink]="['/employee-add']"
      >
        Add Employee
      </button>
    </div>
  `,
})
export class EmployeeListComponent implements OnInit {
  private store = inject(Store);

  employees$: Observable<Employee[]> = this.store.select(
    EmployeeSelectors.selectAllEmployees
  );
  loading$: Observable<boolean> = this.store.select(
    EmployeeSelectors.selectLoading
  );
  error$: Observable<string | null> = this.store.select(
    EmployeeSelectors.selectError
  );

  searchText = '';
  isAdmin = localStorage.getItem('role') === 'admin';

  ngOnInit() {
    this.store.dispatch(EmployeeActions.loadEmployees());
  }

  deleteEmployee(id: string) {
    if (confirm('Are you sure to delete?')) {
      this.store.dispatch(EmployeeActions.deleteEmployee({ id }));
    }
  }
}
