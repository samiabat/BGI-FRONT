import { Selector } from '@ngxs/store';
import { Role } from '../models/role.model';
import { RoleState, RoleStateModel } from './role.state';

export class RoleSelector {
  @Selector([RoleState])
  static Roles(stateModel: RoleStateModel): Role[] {
    return stateModel.Roles;
  }

  @Selector([RoleState])
  static seletedRole(stateModel: RoleStateModel): Role | null {
    return stateModel.selectedRole;
  }

  @Selector([RoleState])
  static isLoading(stateModel: RoleStateModel): boolean {
    return stateModel.loading;
  }
}
