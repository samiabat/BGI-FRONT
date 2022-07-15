import { Role } from '../models/role.model';

export class GetRoles {
  static readonly type = '[Goal] GetGoals';
}

export class GetRoleById {
  static readonly type = '[ROle] GetRoleById';
  constructor(public id: number) {}
}

export class CreateRole {
  static readonly type = '[Role] CreateRole';
  constructor(public stat: Role) {}
}

export class UpdateRole {
  static readonly type = '[Role] UpdateRole';
  constructor(public id: number, public stat: Role) {}
}

export class DeleteRole {
  static readonly type = '[Role] DeleteRole';
  constructor(public id: number) {}
}

export class SelectRole {
  static readonly type = '[Role] SelectRole';
  constructor(public stat: Role) {}
}
