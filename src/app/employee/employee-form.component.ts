import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EMPLOYEES } from '../shared/mock-data';

@Component({
  standalone: true,
  selector: 'app-employee-form',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-5">
      <h2>{{ isEdit ? 'Edit' : 'Add' }} Employee</h2>
      <form (ngSubmit)="submitForm()" #empForm="ngForm">
        <div class="mb-3">
          <label>ID</label>
          <input
            [(ngModel)]="employee.id"
            name="id"
            required
            class="form-control"
            [readonly]="isEdit"
          />
        </div>
        <div class="mb-3">
          <label>Name</label>
          <input
            [(ngModel)]="employee.name"
            name="name"
            required
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label>Department</label>
          <input
            [(ngModel)]="employee.department"
            name="department"
            required
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label>Mobile</label>
          <input
            [(ngModel)]="employee.mobile"
            name="mobile"
            required
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label>Status</label>
          <select
            [(ngModel)]="employee.isActive"
            name="isActive"
            required
            class="form-control"
          >
            <option [ngValue]="true">Active</option>
            <option [ngValue]="false">Inactive</option>
          </select>
        </div>
        <button class="btn btn-success" [disabled]="!empForm.valid">
          {{ isEdit ? 'Update' : 'Add' }}
        </button>
      </form>
    </div>
  `,
})
export class EmployeeFormComponent implements OnInit {
  employee: any = {
    id: '',
    name: '',
    department: '',
    mobile: '',
    isActive: true,
  };
  isEdit = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const emp = EMPLOYEES.find((e) => e.id === +id);
      if (emp) {
        this.employee = { ...emp };
        this.isEdit = true;
      }
    }
  }

  submitForm() {
    if (this.isEdit) {
      const index = EMPLOYEES.findIndex((e) => e.id === +this.employee.id);
      EMPLOYEES[index] = this.employee;
      alert('Employee updated!');
    } else {
      EMPLOYEES.push(this.employee);
      alert('Employee added!');
    }
    this.router.navigate(['/employees']);
  }
}
