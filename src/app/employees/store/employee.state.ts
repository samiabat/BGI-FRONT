import { EmployeeService } from './../services/employee.service';
import { Injectable } from '@angular/core'
import {
  Action,
  NgxsAfterBootstrap,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store'
import { switchMap, tap } from 'rxjs'
import { Employee } from '../models/employee.model'
import { CreateEmployee, DeleteEmployee, GetEmployies, SelectEmployee, UpdateEmployee } from './employee.actions';

export interface EmployeeStateModel {
  employies: Employee[]
  selectedEmployee: Employee | null
  loading: boolean
}

const ACTIVITY_STATE_TOKEN = new StateToken<EmployeeStateModel>('employeeState')

@State<EmployeeStateModel>({
  name: ACTIVITY_STATE_TOKEN,
  defaults: {
    employies: [],
    selectedEmployee: null,
    loading: false,
  },
})
@Injectable()
export class EmployeeState implements NgxsAfterBootstrap {
  constructor(private employeeService: EmployeeService) {}
  ngxsAfterBootstrap(ctx?: StateContext<any>): void {
    ctx?.dispatch(new GetEmployies())
  }

  @Action(GetEmployies)
  getEmployies({ patchState, setState }: StateContext<EmployeeStateModel>) {
    patchState({ loading: true })
    return this.employeeService.getEmployies().pipe(
      tap((employies) =>
        setState({
          employies: employies,
          selectedEmployee: null,
          loading: false,
        }),
      ),
    )
  }

  @Action(CreateEmployee)
  createEmployee(
    { getState, patchState }: StateContext<EmployeeStateModel>,
    { employee }: CreateEmployee,
  ) {
    return this.employeeService.addEmployee(employee).pipe(
      tap((newEmployee) => {
        const state = getState()
        patchState({
          employies: [...state.employies, newEmployee],
        })
      }),
    )
  }

  @Action(UpdateEmployee)
  updateEmployee(
    { getState, setState, patchState }: StateContext<EmployeeStateModel>,
    { id, employee }: UpdateEmployee,
  ) {
    return this.employeeService.updateEmployee(id, employee).pipe(
      switchMap((_) => this.employeeService.getEmployee(id)),
      tap((updatedEmployee) => {
        const state = getState()
        const employeeList = [...state.employies]
        const employeeIndex = employeeList.findIndex(
          (item) => item.id === updatedEmployee.id,
        )
        employeeList[employeeIndex] = updatedEmployee
        setState({
          ...state,
          employies: employeeList,
        })
        patchState({ selectedEmployee: updatedEmployee })
      }),
    )
  }

  @Action(SelectEmployee)
  selectEmployee(
    { patchState }: StateContext<EmployeeStateModel>,
    { employee }: SelectEmployee,
  ) {
    patchState({ selectedEmployee: employee })
  }

  @Action(DeleteEmployee)
  deleteEmployee(
    { getState, setState, patchState }: StateContext<EmployeeStateModel>,
    { id }: DeleteEmployee,
  ) {
    return this.employeeService.deleteEmployee(id).pipe(
      tap((_) => {
        const state = getState()
        const filteredArray = state.employies.filter((item) => item.id !== id)
        setState({
          ...state,
          employies: filteredArray,
        })

        patchState({ selectedEmployee: null })
      }),
    )
  }
}
