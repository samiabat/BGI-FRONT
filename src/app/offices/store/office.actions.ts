import { Office } from '../models/office.model';

export class GetOffices {
  static readonly type = '[Office] GetOffices';
}

export class GetOfficeById {
  static readonly type = '[Office] GetOfficeById';
  constructor(public id: number) {}
}

export class CreateOffice {
  static readonly type = '[Office] CreateOffice';
  constructor(public office: Office) {}
}

export class UpdateOffice {
  static readonly type = '[Office] UpdateOffice';
  constructor(public id: number, public office: Office) {}
}

export class DeleteOffice {
  static readonly type = '[Office] DeleteOffice';
  constructor(public id: number) {}
}

export class SelectOffice {
  static readonly type = '[Office] SelectOffice';
  constructor(public office: Office) {}
}
