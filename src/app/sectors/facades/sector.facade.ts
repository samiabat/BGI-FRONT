import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Sector } from '../models/sector.model';
import {
  CreateSector,
  DeleteSector,
  GetSectorById,
  SelectSector,
  UpdateSector,
} from '../store/sector.actions';
import { SectorSelector } from '../store/sector.selectors';

@Injectable()
export class SectorFacade {
  @Select(SectorSelector.sectors)
  sectors$!: Observable<Sector[]>;

  @Select(SectorSelector.selectedSectors)
  selectedSector$!: Observable<Sector>;

  @Select(SectorSelector.isLoading)
  isLoading$!: Observable<boolean>;

  constructor(private store: Store) {}

  addSector(sector: Sector) {
    this.store.dispatch(new CreateSector(sector));
  }

  updateSector(id: number, sector: Sector) {
    this.store.dispatch(new UpdateSector(id, sector));
  }

  deleteSector(id: number) {
    this.store.dispatch(new DeleteSector(id));
  }

  selectSector(sector: Sector) {
    this.store.dispatch(new SelectSector(sector));
  }

  getSectorById(id: number) {
    this.store.dispatch(new GetSectorById(id));
  }
}
