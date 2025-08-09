import {
  Component,
  inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import * as EmployeeActions from '../store/employee/employee.actions';
import * as fromEmployee from '../store/employee/employee.selectors';
import { CardComponent } from '../shared/card.component';
import { NotesComponent } from '../shared/notes.component';

@Component({
  standalone: true,
  selector: 'app-employee-detail',
  imports: [CommonModule, CardComponent],
  template: `
    <div class="container mt-5" *ngIf="employee$ | async as employee">
      <app-card>
        <!-- Card Header -->
        <div card-header>
          {{ employee.name }} - {{ employee.role }}
        </div>

        <!-- Card Body -->
        <div card-body>
          <p><strong>ID:</strong> {{ employee.id }}</p>
          <p><strong>Department:</strong> {{ employee.department }}</p>
          <p><strong>Mobile:</strong> {{ employee.mobile }}</p>
          <p><strong>Email:</strong> {{ employee.email }}</p>

          <!-- Dynamic Notes Loading -->
          <button
            class="btn btn-outline-primary mt-3"
            (click)="loadNotes(employee.name)"
          >
            Add Notes
          </button>
          <ng-container #notesContainer></ng-container>
        </div>

        <!-- Card Footer -->
        <div card-footer>
          Status:
          <span
            [class.text-success]="employee.isActive"
            [class.text-danger]="!employee.isActive"
          >
            {{ employee.isActive ? 'Active' : 'Inactive' }}
          </span>
        </div>
      </app-card>
    </div>
  `,
})
export class EmployeeDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  employee$: Observable<Employee | null>;
  private store = inject(Store);

  // For dynamic component loading
  @ViewChild('notesContainer', { read: ViewContainerRef })
  container!: ViewContainerRef;


  constructor() {
    this.employee$ = this.store.select(fromEmployee.selectSelectedEmployee);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(EmployeeActions.loadEmployeeById({ id }));
  }

  loadNotes(employeeName: string) {
    // Clear any existing NotesComponent instance
    this.container.clear();

    // Dynamically create NotesComponent
    const compRef = this.container.createComponent(NotesComponent);

    // Pass input value
    compRef.instance.employeeName = employeeName;

    // Subscribe to the output
    compRef.instance.noteSaved.subscribe((note: string) => {
      this.container.clear(); // hide/close NotesComponent
    });
  }
}
