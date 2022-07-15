import { Selector } from '@ngxs/store'
import { EmployeeState, EmployeeStateModel } from './employee.state'

export class EmployeeSelector {
  @Selector([EmployeeState])
  static employies(stateModel: EmployeeStateModel) {
    return stateModel.employies
  }

  @Selector([EmployeeState])
  static selectedEmployee(stateModel: EmployeeStateModel) {
    return stateModel.selectedEmployee
  }

  @Selector([EmployeeState])
  static isLoading(stateModel: EmployeeStateModel) {
    return stateModel.loading
  }
}
