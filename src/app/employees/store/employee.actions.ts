import { Employee } from '../models/employee.model'

export class GetEmployies {
  static readonly type = '[Employee] GetEmployies'
}

export class GetEmployeeById {
  static readonly type = '[Employee] GetEmployeeById'
  constructor(public id: number) {}
}

export class CreateEmployee {
  static readonly type = '[Employee] CreateEmployee'
  constructor(public employee: Employee) {}
}

export class UpdateEmployee {
  static readonly type = '[Employee] UpdateEmployee'
  constructor(public id: number, public employee: Employee) {}
}

export class DeleteEmployee {
  static readonly type = '[Employee] DeleteEmployee'
  constructor(public id: number) {}
}

export class SelectEmployee {
  static readonly type = '[Employee] SelectEmployee'
  constructor(public employee: Employee) {}
}
