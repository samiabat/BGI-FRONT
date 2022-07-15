import { Role } from './../models/role.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Action,
  NgxsAfterBootstrap,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { switchMap, tap } from 'rxjs';
import { RoleService } from '../services/role.service';
import {
  CreateRole,
  DeleteRole,
  GetRoles,
  SelectRole,
  UpdateRole,
} from './role.actions';

export interface RoleStateModel {
  Roles: Role[];
  selectedRole: Role | null;
  loading: boolean;
}

const GOAL_TOKEN = new StateToken<RoleStateModel>('RoleState');

@State<RoleStateModel>({
  name: GOAL_TOKEN,
  defaults: {
    Roles: [],
    selectedRole: null,
    loading: false,
  },
})
@Injectable()
export class RoleState implements NgxsAfterBootstrap {
  constructor(
    private RoleService: RoleService,
    private snackBar: MatSnackBar
  ) {}

  ngxsAfterBootstrap(ctx?: StateContext<any>): void {
    ctx?.dispatch(new GetRoles());
  }

  @Action(GetRoles)
  getGoals({ patchState, setState }: StateContext<RoleStateModel>) {
    patchState({ loading: true });
    return this.RoleService.getRoles().pipe(
      tap((stats) =>
        setState({
          Roles: stats,
          selectedRole: null,
          loading: false,
        })
      )
    );
  }

  @Action(CreateRole)
  createGoal(
    { getState, patchState }: StateContext<RoleStateModel>,
    { stat }: CreateRole
  ) {
    return this.RoleService.addRole(stat).pipe(
      tap((newStat) => {
        const state = getState();
        patchState({
          Roles: [...state.Roles, newStat],
        });
      })
    );
  }

  @Action(UpdateRole)
  updateGoal(
    { getState, setState, patchState }: StateContext<RoleStateModel>,
    { id, stat }: UpdateRole
  ) {
    return this.RoleService.updateRole(id, stat).pipe(
      switchMap((_) => this.RoleService.getRole(id)),
      tap((updatedStat) => {
        const state = getState();
        const statList = [...state.Roles];
        const statIndex = statList.findIndex(
          (item) => item.id === updatedStat.id
        );
        statList[statIndex] = updatedStat;
        setState({
          ...state,
          Roles: statList,
        });
        patchState({ selectedRole: updatedStat });
      })
    );
  }

  @Action(SelectRole)
  selectRole(
    { patchState }: StateContext<RoleStateModel>,
    { stat }: SelectRole
  ) {
    patchState({ selectedRole: stat });
  }

  @Action(DeleteRole)
  deleteGoal(
    { getState, setState, patchState }: StateContext<RoleStateModel>,
    { id }: DeleteRole
  ) {
    return this.RoleService.deleteRole(id).pipe(
      tap((_) => {
        const state = getState();
        const filteredArray = state.Roles.filter((item) => item.id !== id);
        setState({
          ...state,
          Roles: filteredArray,
        });

        patchState({ selectedRole: null });
      })
    );
  }
}
