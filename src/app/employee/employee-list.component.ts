import {
  Component,
  ComponentRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
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
import { StatusHighlightDirective } from '../directives/status-highlight.directive';
import { DynamicComponentService } from '../services/dynamic-component.service';
import { DeleteModalComponent } from '../shared/delete-modal.component';
import { ToastService } from '../services/toast.service';

@Component({
  standalone: true,
  selector: 'app-employee-list',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    EmployeeSearchPipe,
    MobileFormatPipe,
    StatusHighlightDirective,
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
            <td appStatusHighlight [isActive]="emp.isActive">
              {{ emp.isActive ? 'Active' : 'Inactive' }}
            </td>
            <td *ngIf="isAdmin">
              <button
                class="btn btn-sm btn-warning"
                [routerLink]="['/employee-edit', emp.id]"
              >
                Edit
              </button>
              <button
                class="btn btn-sm btn-danger ms-3"
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
export class EmployeeListComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private dynamicComponentService = inject(DynamicComponentService);
  private toastService = inject(ToastService);

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

  private activeModal?: ComponentRef<DeleteModalComponent>;

  deleteEmployee(id: string) {
    // Create and show delete confirmation modal
    this.activeModal =
      this.dynamicComponentService.createComponent(DeleteModalComponent);

    // Handle modal actions
    this.activeModal.instance.confirm.subscribe(() => {
      this.store.dispatch(EmployeeActions.deleteEmployee({ id }));
      this.toastService.show('Employee deleted successfully!', 'success');
      this.closeModal();
    });

    this.activeModal.instance.cancel.subscribe(() => {
      this.closeModal();
    });
  }

  private closeModal() {
    if (this.activeModal) {
      this.dynamicComponentService.removeComponent(this.activeModal);
      this.activeModal = undefined;
    }
  }

  ngOnDestroy() {
    this.closeModal();
  }
}
