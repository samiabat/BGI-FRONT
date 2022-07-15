import { EmployeeSelector } from './../store/employee.selectors';
import { Injectable } from '@angular/core'
import { Select, Store } from '@ngxs/store'
import { Observable } from 'rxjs'
import { Employee } from '../models/employee.model';
import { CreateEmployee, DeleteEmployee, SelectEmployee, UpdateEmployee } from '../store/employee.actions';

@Injectable()
export class EmployeeFacade {
  @Select(EmployeeSelector.employies)
  employies$!: Observable<Employee[]>

  @Select(EmployeeSelector.selectedEmployee)
  selectedEmployee$!: Observable<Employee>

  @Select(EmployeeSelector.isLoading)
  isLoading$!: Observable<boolean>

  constructor(private store: Store) {}

  addEmployee(employee: Employee) {
    this.store.dispatch(new CreateEmployee(employee))
  }

  updateEmployee(id: number, employee: Employee) {
    this.store.dispatch(new UpdateEmployee(id, employee))
  }

  deleteEmployee(id: number) {
    this.store.dispatch(new DeleteEmployee(id))
  }

  selectEmployee(employee: Employee) {
    this.store.dispatch(new SelectEmployee(employee))
  }
}
