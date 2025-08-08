import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Employee } from '../models/employee.model';
import {
  addEmployee,
  updateEmployee,
  loadEmployees,
} from '../store/employee/employee.actions';
import { selectAllEmployees } from '../store/employee/employee.selectors';
import { ToastService } from '../services/toast.service';

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
          <label>Email</label>
          <input
            [(ngModel)]="employee.email"
            name="email"
            required
            class="form-control"
            type="email"
          />
        </div>
        <div class="mb-3">
          <label>Role</label>
          <input
            [(ngModel)]="employee.role"
            name="role"
            required
            class="form-control"
          />
        </div>
        <button class="btn btn-success" [disabled]="!empForm.valid">
          {{ isEdit ? 'Update' : 'Add' }}
        </button>
      </form>
    </div>
  `,
})
export class EmployeeFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);
  private toastService = inject(ToastService);

  employee: Employee = {
    id: '',
    name: '',
    department: '',
    email: '',
    role: '',
    mobile: '',
    isActive: true,
  };

  isEdit = false;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;

      // Make sure employees are loaded
      this.store.dispatch(loadEmployees());

      this.store.select(selectAllEmployees).subscribe((employees) => {
        const emp = employees.find((e) => e.id === id);
        if (emp) {
          this.employee = { ...emp };
        }
      });
    }
  }

  submitForm() {
    if (this.isEdit) {
      this.store.dispatch(updateEmployee({ employee: this.employee }));
      this.toastService.show('Employee updated successfully!', 'success');
    } else {
      this.store.dispatch(addEmployee({ employee: this.employee }));
      this.toastService.show('Employee added successfully!', 'success');
    }
    this.router.navigate(['/employees']);
  }
}
