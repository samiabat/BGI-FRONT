import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ConfirmDeleteModule } from '../confirm-delete/confirm-delete.module';
import { SectorsModule } from '../sectors/sectors.module';
import { RolesModule } from '../roles/roles.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ConfirmDeleteModule,
    SectorsModule,
    RolesModule,
  ]
})
export class DashboardModule { }
