import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EMPLOYEES } from '../shared/mock-data';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container mt-4">
      <h2>Employee List</h2>
      <input
        class="form-control mb-3"
        placeholder="Search by name or department"
        [(ngModel)]="searchText"
      />
      <table class="table table-bordered">
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
          <tr *ngFor="let emp of filteredEmployees()">
            <td>
              <a [routerLink]="['/employee', emp.id]">{{ emp.name }}</a>
            </td>
            <td>{{ emp.department }}</td>
            <td>{{ emp.mobile }}</td>
            <td>{{ emp.isActive ? 'Active' : 'Inactive' }}</td>
            <td *ngIf="isAdmin">
              <button
                class="btn btn-sm btn-warning"
                [routerLink]="['/employee-edit', emp.id]"
              >
                Edit
              </button>
              <button class="btn btn-sm btn-danger" (click)="delete(emp.id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        *ngIf="isAdmin"
        class="btn btn-primary"
        [routerLink]="['/employee-add']"
      >
        Add Employee
      </button>
    </div>
  `,
})
export class EmployeeListComponent {
  employees = EMPLOYEES;
  searchText = '';
  isAdmin = localStorage.getItem('role') === 'admin';

  filteredEmployees() {
    return this.employees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        emp.department.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  delete(id: number) {
    if (confirm('Are you sure to delete?')) {
      this.employees = this.employees.filter((emp) => emp.id !== id);
    }
  }
}
