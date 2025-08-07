import { createAction, props } from '@ngrx/store';
import { Employee } from '../../models/employee.model';

// Load
export const loadEmployees = createAction('[Employee] Load Employees');
export const loadEmployeesSuccess = createAction(
  '[Employee] Load Employees Success',
  props<{ employees: Employee[] }>()
);
export const loadEmployeesFailure = createAction(
  '[Employee] Load Employees Failure',
  props<{ error: string }>()
);

// Add
export const addEmployee = createAction(
  '[Employee] Add Employee',
  props<{ employee: Employee }>()
);
export const addEmployeeSuccess = createAction(
  '[Employee] Add Employee Success',
  props<{ employee: Employee }>()
);

// Update
export const updateEmployee = createAction(
  '[Employee] Update Employee',
  props<{ employee: Employee }>()
);
export const updateEmployeeSuccess = createAction(
  '[Employee] Update Employee Success',
  props<{ employee: Employee }>()
);

// Delete
export const deleteEmployee = createAction(
  '[Employee] Delete Employee',
  props<{ id: string }>()
);
export const deleteEmployeeSuccess = createAction(
  '[Employee] Delete Employee Success',
  props<{ id: string }>()
);

// Load Employee by ID
export const loadEmployeeById = createAction(
  '[Employee Detail] Load Employee By Id',
  props<{ id: string }>()
);

export const loadEmployeeByIdSuccess = createAction(
  '[Employee Detail] Load Employee By Id Success',
  props<{ employee: Employee }>()
);

export const loadEmployeeByIdFailure = createAction(
  '[Employee Detail] Load Employee By Id Failure',
  props<{ error: any }>()
);
