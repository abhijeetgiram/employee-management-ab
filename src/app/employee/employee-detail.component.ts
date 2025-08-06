import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EMPLOYEES } from '../shared/mock-data';

@Component({
  standalone: true,
  selector: 'app-employee-detail',
  imports: [CommonModule],
  template: `
    <div class="container mt-5" *ngIf="employee">
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
  employee: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.employee = EMPLOYEES.find((e) => e.id === +id!);
  }
}
