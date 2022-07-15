import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  CreateRole,
  DeleteRole,
  SelectRole,
  UpdateRole,
} from '../store/role.actions';
import { RoleSelector } from '../store/role.selectors';
import { Role } from '../models/role.model';

@Injectable()
export class RoleFacade {
  @Select(RoleSelector.Roles)
  goals$!: Observable<Role[]>;

  @Select(RoleSelector.seletedRole)
  selectedRole$!: Observable<Role>;

  @Select(RoleSelector.isLoading)
  isLoading!: Observable<boolean>;
  constructor(private store: Store) {}

  addRole(stat: Role) {
    this.store.dispatch(new CreateRole(stat));
  }

  updateRole(id: number, stat: Role) {
    this.store.dispatch(new UpdateRole(id, stat));
  }

  deleteRole(id: number) {
    this.store.dispatch(new DeleteRole(id));
  }

  selectRole(stat: Role) {
    this.store.dispatch(new SelectRole(stat));
  }
}
