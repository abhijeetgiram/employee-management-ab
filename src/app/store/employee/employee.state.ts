import { Employee } from '../../models/employee.model';

export interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  selectedEmployee: Employee | null;
}

export const initialEmployeeState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
  selectedEmployee: null,
};
