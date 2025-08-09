import {
  Component,
  OnInit,
  inject,
  signal,
  computed,
  effect,
} from '@angular/core';
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
import { CanComponentDeactivate } from '../guard/can-deactivate.guard';

@Component({
  standalone: true,
  selector: 'app-employee-form',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-5">
      <h2>{{ formTitle() }}</h2>
      <form (ngSubmit)="submitForm()" #empForm="ngForm">
        <div class="mb-3">
          <label>ID</label>
          <input
            [(ngModel)]="employee().id"
            name="id"
            required
            class="form-control"
            [readonly]="isEdit()"
          />
        </div>
        <div class="mb-3">
          <label>Name</label>
          <input
            [(ngModel)]="employee().name"
            name="name"
            required
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label>Department</label>
          <input
            [(ngModel)]="employee().department"
            name="department"
            required
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label>Mobile</label>
          <input
            [(ngModel)]="employee().mobile"
            name="mobile"
            required
            class="form-control"
            type="tel"
          />
        </div>
        <div class="mb-3">
          <label>Email</label>
          <input
            [(ngModel)]="employee().email"
            name="email"
            required
            class="form-control"
            type="email"
          />
        </div>
        <div class="mb-3">
          <label>Role</label>
          <input
            [(ngModel)]="employee().role"
            name="role"
            required
            class="form-control"
          />
        </div>
        <button class="btn btn-success" [disabled]="!empForm.valid">
          {{ isEdit() ? 'Update' : 'Add' }}
        </button>
      </form>
    </div>
  `,
})
export class EmployeeFormComponent implements OnInit, CanComponentDeactivate {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);
  private toastService = inject(ToastService);

  // Local State as Signals
  employee = signal<Employee>({
    id: '',
    name: '',
    department: '',
    email: '',
    role: '',
    mobile: '',
    isActive: true,
  });

  isEdit = signal(false);
  private isFormSubmitted = false;
  private originalEmployee = signal<Employee>({ ...this.employee() });

  // Computed Signal
  formTitle = computed(() =>
    this.isEdit() ? 'Edit Employee' : 'Add Employee'
  );

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit.set(true);
      this.store.dispatch(loadEmployees({ employees: [] }));
    } else {
      this.originalEmployee.set({ ...this.employee() });
    }
  }

  // Effect: load employee data when store updates
  employeeEffect = effect(() => {
    if (this.isEdit()) {
      const employees = this.store.selectSignal(selectAllEmployees)();
      const id = this.route.snapshot.paramMap.get('id');
      const emp = employees.find((e) => e.id === id);
      if (emp) {
        this.employee.set({ ...emp });
        this.originalEmployee.set({ ...emp });
      }
    }
  });

  submitForm() {
    this.isFormSubmitted = true;

    if (this.isEdit()) {
      this.store.dispatch(updateEmployee({ employee: this.employee() }));
      this.toastService.show('Employee updated successfully!', 'success');
    } else {
      this.store.dispatch(addEmployee({ employee: this.employee() }));
      this.toastService.show('Employee added successfully!', 'success');
    }
    this.router.navigate(['/employees']);
  }

  // CanDeactivate Guard
  canDeactivate(): boolean {
    if (this.isFormSubmitted) return true;
    const isChanged =
      JSON.stringify(this.employee()) !==
      JSON.stringify(this.originalEmployee());
    return isChanged
      ? confirm('You have unsaved changes. Do you really want to leave?')
      : true;
  }
}
