// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { EmployeeService } from '../../services/employee.service';
// import * as EmployeeActions from './employee.actions';
// import { catchError, map, mergeMap, of } from 'rxjs';

// @Injectable()
// export class EmployeeEffects {
//   constructor(
//     private actions$: Actions,
//     // private employeeService: EmployeeService
//   ) {}

//   loadEmployees$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(EmployeeActions.loadEmployees),
//       mergeMap(() =>
//         this.employeeService.getEmployees().pipe(
//           map((employees) =>
//             EmployeeActions.loadEmployeesSuccess({ employees })
//           ),
//           catchError((error) =>
//             of(EmployeeActions.loadEmployeesFailure({ error }))
//           )
//         )
//       )
//     )
//   );
// }
