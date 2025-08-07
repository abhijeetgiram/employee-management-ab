import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/employee.model';

@Pipe({
  name: 'employeeSearch',
  standalone: true,
})
export class EmployeeSearchPipe implements PipeTransform {
  transform(employees: Employee[], searchText: string): Employee[] {
    if (!searchText) return employees;
    const lower = searchText.toLowerCase();
    return employees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(lower) ||
        emp.department.toLowerCase().includes(lower)
    );
  }
}
