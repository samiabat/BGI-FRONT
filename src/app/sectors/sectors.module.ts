import { SectorState } from './store/sector.state';
import { SectorFormComponent } from './components/sector-form/sector-form.component';
import { SectorListComponent } from './components/sector-list/sector-list.component';
import { NgModule } from '@angular/core';

import { NgxsModule } from '@ngxs/store';
import { AngularSlickgridModule } from 'angular-slickgrid';
import { ConfirmDeleteModule } from '../confirm-delete/confirm-delete.module';
import { SharedModules } from '../shared-modules.module';
import { SectorsRoutingModule } from './sectors-routing.module';
import { RolesModule } from '../roles/roles.module';

@NgModule({
  declarations: [SectorListComponent, SectorFormComponent],
  imports: [
    SectorsRoutingModule,
    SharedModules,
    NgxsModule.forFeature([SectorState]),
    AngularSlickgridModule,
    RolesModule,
    ConfirmDeleteModule,
  ],
})
export class SectorsModule {}
