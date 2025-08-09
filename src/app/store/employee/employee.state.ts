import { Employee } from '../../models/employee.model';

export interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  selectedEmployee: Employee | null;
}

const initialEmployeeList = [
    {
      "id": "1",
      "name": "John Doe",
      "department": "Engineering",
      "mobile": "9876543210",
      "email": "john@example.com",
      "role": "Developer",
      "isActive": true
    },
    {
      "id": "2",
      "name": "Jane Smith",
      "department": "HR",
      "mobile": "9123456789",
      "email": "jane@example.com",
      "role": "HR Manager",
      "isActive": false
    }
  ]

export const initialEmployeeState: EmployeeState = {
  employees: initialEmployeeList,
  loading: false,
  error: null,
  selectedEmployee: null,
};
