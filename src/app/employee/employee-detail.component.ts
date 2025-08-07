import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import * as EmployeeActions from '../store/employee/employee.actions';
import * as fromEmployee from '../store/employee/employee.selectors';

@Component({
  standalone: true,
  selector: 'app-employee-detail',
  imports: [CommonModule],
  template: `
    <div class="container mt-5" *ngIf="employee$ | async as employee">
      <h2>Employee Details</h2>
      <ul class="list-group">
        <li class="list-group-item"><strong>ID:</strong> {{ employee.id }}</li>
        <li class="list-group-item">
          <strong>Name:</strong> {{ employee.name }}
        </li>
        <li class="list-group-item">
          <strong>Department:</strong> {{ employee.department }}
        </li>
        <li class="list-group-item">
          <strong>Mobile:</strong> {{ employee.mobile }}
        </li>
        <li class="list-group-item">
          <strong>Status:</strong>
          {{ employee.isActive ? 'Active' : 'Inactive' }}
        </li>
      </ul>
    </div>
  `,
})
export class EmployeeDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  employee$: Observable<Employee | null>;
  private store = inject(Store);

  constructor() {
    this.employee$ = this.store.select(fromEmployee.selectSelectedEmployee);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(EmployeeActions.loadEmployeeById({ id }));
  }
}
