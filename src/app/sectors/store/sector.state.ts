import { GetSectors, GetSectorByGoal, CreateSector, UpdateSector, SelectSector, DeleteSector, GetSectorById } from './sector.actions';
import { SectorService } from './../services/sector.service';
import { Sector } from './../models/sector.model';
import { Injectable } from '@angular/core';
import {
  Action,
  NgxsAfterBootstrap,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { switchMap, tap } from 'rxjs';

export interface SectorStateModel {
  sectors: Sector[];
  selectedSector: Sector | null;
  loading: boolean;
}

const OBJECTIVE_STATE_TOKEN = new StateToken<SectorStateModel>(
  'objectiveState'
);

@State<SectorStateModel>({
  name: OBJECTIVE_STATE_TOKEN,
  defaults: {
    sectors: [],
    selectedSector: null,
    loading: false,
  },
})
@Injectable()
export class SectorState implements NgxsAfterBootstrap {
  constructor(private sectorService: SectorService) {}
  ngxsAfterBootstrap(ctx?: StateContext<any>): void {
    ctx?.dispatch(new GetSectors());
  }

  @Action(GetSectors)
  getSectors({ patchState, setState }: StateContext<SectorStateModel>) {
    patchState({ loading: true });
    return this.sectorService.getSectors().pipe(
      tap((sectors) =>
        setState({
          sectors: sectors,
          selectedSector: null,
          loading: false,
        })
      )
    );
  }

  @Action(GetSectorById)
  getSectorsById(
    { patchState, setState }: StateContext<SectorStateModel>,
    { id }: GetSectorById
  ) {
    patchState({ loading: true });
    return this.sectorService.getSectorsById(id).pipe(
      tap((sectors) =>
        setState({
          sectors: sectors,
          selectedSector: null,
          loading: false,
        })
      )
    );
  }

  @Action(CreateSector)
  createSector(
    { getState, patchState }: StateContext<SectorStateModel>,
    { sector }: CreateSector
  ) {
    return this.sectorService.addSector(sector).pipe(
      tap((newSector) => {
        const state = getState();
        patchState({
          sectors: [...state.sectors, newSector],
        });
      })
    );
  }

  @Action(UpdateSector)
  updateSector(
    { getState, setState, patchState }: StateContext<SectorStateModel>,
    { id, sector }: UpdateSector
  ) {
    return this.sectorService.updateSector(id, sector).pipe(
      switchMap((_) => this.sectorService.getSector(id)),
      tap((updatedSector) => {
        const state = getState();
        const sectorList = [...state.sectors];
        const sectorIndex = sectorList.findIndex(
          (item) => item.id === updatedSector.id
        );
        sectorList[sectorIndex] = updatedSector;
        setState({
          ...state,
          sectors: sectorList,
        });
        patchState({ selectedSector: updatedSector });
      })
    );
  }

  @Action(SelectSector)
  selectSector(
    { patchState }: StateContext<SectorStateModel>,
    { sector }: SelectSector
  ) {
    patchState({ selectedSector: sector });
  }

  @Action(DeleteSector)
  deleteSector(
    { getState, setState, patchState }: StateContext<SectorStateModel>,
    { id }: DeleteSector
  ) {
    return this.sectorService.deleteSector(id).pipe(
      tap((_) => {
        const state = getState();
        const filteredArray = state.sectors.filter((item) => item.id !== id);
        setState({
          ...state,
          sectors: filteredArray,
        });

        patchState({ selectedSector: null });
      })
    );
  }
}
