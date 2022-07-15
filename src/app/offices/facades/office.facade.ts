import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Office } from '../models/office.model';
import {
  CreateOffice,
  DeleteOffice,
  SelectOffice,
  UpdateOffice,
} from '../store/office.actions';
import { OfficeSelector } from '../store/office.selectors';

@Injectable()
export class OfficeFacade {
  @Select(OfficeSelector.offices)
  offices$!: Observable<Office[]>;

  @Select(OfficeSelector.selectedOffice)
  selectedOffice$!: Observable<Office>;

  @Select(OfficeSelector.isLoading)
  isLoading$!: Observable<boolean>;

  constructor(private store: Store) {}

  addOffice(office: Office) {
    this.store.dispatch(new CreateOffice(office));
  }

  updateOffice(id: number, office: Office) {
    this.store.dispatch(new UpdateOffice(id, office));
  }

  deleteOffice(id: number) {
    this.store.dispatch(new DeleteOffice(id));
  }

  selectOffice(office: Office) {
    this.store.dispatch(new SelectOffice(office));
  }
}
