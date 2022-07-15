import { Injectable } from '@angular/core';
import {
  Action,
  NgxsAfterBootstrap,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { switchMap, tap } from 'rxjs';
import { Office } from '../models/office.model';
import { OfficeService } from '../services/office.service';
import {
  CreateOffice,
  DeleteOffice,
  GetOffices,
  SelectOffice,
  UpdateOffice,
} from './office.actions';

export interface OfficeStateModel {
  offices: Office[];
  selectedOffice: Office | null;
  loading: boolean;
}

const OFFICE_STATE_TOKEN = new StateToken<OfficeStateModel>('officeState');

@State<OfficeStateModel>({
  name: OFFICE_STATE_TOKEN,
  defaults: {
    offices: [],
    selectedOffice: null,
    loading: false,
  },
})
@Injectable()
export class OfficeState implements NgxsAfterBootstrap {
  constructor(private officeService: OfficeService) {}
  ngxsAfterBootstrap(ctx?: StateContext<any>): void {
    ctx?.dispatch(new GetOffices());
  }

  @Action(GetOffices)
  getOffices({ patchState, setState }: StateContext<OfficeStateModel>) {
    patchState({ loading: true });
    return this.officeService.getOffices().pipe(
      tap((offices) =>
        setState({
          offices: offices,
          selectedOffice: null,
          loading: false,
        })
      )
    );
  }

  @Action(CreateOffice)
  createOffice(
    { getState, patchState }: StateContext<OfficeStateModel>,
    { office }: CreateOffice
  ) {
    return this.officeService.addOffice(office).pipe(
      tap((newOffice) => {
        const state = getState();
        patchState({
          offices: [...state.offices, newOffice],
        });
      })
    );
  }

  @Action(UpdateOffice)
  updateOffice(
    { getState, setState, patchState }: StateContext<OfficeStateModel>,
    { id, office }: UpdateOffice
  ) {
    return this.officeService.updateOffice(id, office).pipe(
      switchMap((_) => this.officeService.getOffice(id)),
      tap((updatedOffice) => {
        const state = getState();
        const officeList = [...state.offices];
        const officeIndex = officeList.findIndex(
          (item) => item.id === updatedOffice.id
        );
        officeList[officeIndex] = updatedOffice;
        patchState({
          offices: officeList,
          selectedOffice: updatedOffice,
        });
      })
    );
  }

  @Action(SelectOffice)
  selectOffice(
    { patchState }: StateContext<OfficeStateModel>,
    { office }: SelectOffice
  ) {
    patchState({ selectedOffice: office });
  }

  @Action(DeleteOffice)
  deleteOffice(
    { getState, setState, patchState }: StateContext<OfficeStateModel>,
    { id }: DeleteOffice
  ) {
    return this.officeService.deleteOffice(id).pipe(
      tap((_) => {
        const state = getState();
        const filteredArray = state.offices.filter((item) => item.id !== id);
        patchState({
          offices: filteredArray,
          selectedOffice: null,
        });
      })
    );
  }
}
