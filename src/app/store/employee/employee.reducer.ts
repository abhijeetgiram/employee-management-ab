import { createReducer, on } from '@ngrx/store';
import { EmployeeState, initialEmployeeState } from './employee.state';
import * as EmployeeActions from './employee.actions';

export const employeeReducer = createReducer(
  initialEmployeeState,

  on(EmployeeActions.loadEmployees, (state) => ({
    ...state,
    employees: [...state.employees,]
  })),

  on(EmployeeActions.addEmployee, (state, { employee }) => ({
    ...state,
    employees: [...state.employees, employee],
  })),

  on(EmployeeActions.updateEmployee, (state, { employee }) => ({
    ...state,
    employees: state.employees.map((emp) =>
      emp.id === employee.id ? employee : emp
    ),
  })),

  on(EmployeeActions.deleteEmployee, (state, { id }) => ({
    ...state,
    employees: state.employees.filter((emp) => emp.id !== id),
  })),

  on(EmployeeActions.loadEmployeeById, (state, { id }) => ({
    ...state,
    selectedEmployee: state.employees.find((emp) => emp.id === id) || null,
  }))
);
