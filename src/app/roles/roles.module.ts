import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AngularSlickgridModule } from 'angular-slickgrid';
import { ConfirmDeleteModule } from '../confirm-delete/confirm-delete.module';
import { OfficesModule } from '../offices/offices.module';
import { SharedModules } from '../shared-modules.module';
import { RoleFormComponent } from './components/role-form/role-form.component';
import { RoleListComponent } from './components/role-list/role-list.component';

import { GoalsRoutingModule } from './roles-routing.module';
import { RoleState } from './store/role.state';

@NgModule({
  declarations: [RoleListComponent, RoleFormComponent],
  imports: [GoalsRoutingModule,
    NgxsModule.forFeature([RoleState]),
    AngularSlickgridModule,
    SharedModules,
    ConfirmDeleteModule,
    OfficesModule],
})
export class RolesModule { }
