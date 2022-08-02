import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ConfirmDeleteModule } from '../confirm-delete/confirm-delete.module';
import { SharedModules } from '../shared-modules.module';
import { RoleFormComponent } from './components/role-form/role-form.component';
import { RoleListComponent } from './components/role-list/role-list.component';

import { RolesRoutingModule } from './roles-routing.module';
import { RoleState } from './store/role.state';

@NgModule({
  declarations: [RoleListComponent, RoleFormComponent],
  imports: [RolesRoutingModule,
    NgxsModule.forFeature([RoleState]),
    SharedModules,
    ConfirmDeleteModule],
})
export class RolesModule {}
