import { DetailComponent } from './components/detail/detail.component';
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { EmployiesRoutingModule } from './employies-routing.module'
import { EmployeeFormComponent } from './components/employeeform/employee-form.component'
import { EmployeeListComponent } from './components/emplyee-list/employee-list.component'
import { SharedModules } from '../shared-modules.module'
import { NgxsModule } from '@ngxs/store'
import { ConfirmDeleteModule } from '../confirm-delete/confirm-delete.module'
import { RolesModule } from '../roles/roles.module'
import { SectorsModule } from '../sectors/sectors.module'
import { EmployeeState } from './store/employee.state'

@NgModule({
  declarations: [EmployeeFormComponent, EmployeeListComponent, DetailComponent],
  imports: [
    CommonModule,
    EmployiesRoutingModule,
    SharedModules,
    NgxsModule.forFeature([EmployeeState]),
    ConfirmDeleteModule,
    SectorsModule,
    RolesModule,

  ],
})
export class EmployiesModule { }
