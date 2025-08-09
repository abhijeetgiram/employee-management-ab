import { createAction, props } from '@ngrx/store';
import { Employee } from '../../models/employee.model';

// Load
export const loadEmployees = createAction(
  '[Employee] Load Employees Success',
  props<{ employees: Employee[] }>()
);

// Add
export const addEmployee = createAction(
  '[Employee] Add Employee Success',
  props<{ employee: Employee }>()
);

// Update
export const updateEmployee = createAction(
  '[Employee] Update Employee Success',
  props<{ employee: Employee }>()
);

// Delete
export const deleteEmployee = createAction(
  '[Employee] Delete Employee Success',
  props<{ id: string }>()
);

// Load Employee by ID
export const loadEmployeeById = createAction(
  '[Employee Detail] Load Employee By Id',
  props<{ id: string }>()
);

