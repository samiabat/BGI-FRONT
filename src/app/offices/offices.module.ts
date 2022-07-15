import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { OfficesRoutingModule } from './offices-routing.module';
import { OfficeState } from './store/office.state';
import { OfficeFormComponent } from './components/office-form/office-form.component';
import { OfficeListComponent } from './components/office-list/office-list.component';
import { SharedModules } from '../shared-modules.module';
import { ConfirmDeleteModule } from '../confirm-delete/confirm-delete.module';
import { AngularSlickgridModule } from 'angular-slickgrid';

@NgModule({
  declarations: [OfficeFormComponent, OfficeListComponent],
  imports: [
    OfficesRoutingModule,
    SharedModules,
    NgxsModule.forFeature([OfficeState]),
    AngularSlickgridModule,
    ConfirmDeleteModule,
  ],
})
export class OfficesModule {}
