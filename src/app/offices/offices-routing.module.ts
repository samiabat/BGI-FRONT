import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfficeListComponent } from './components/office-list/office-list.component';

const routes: Routes = [{ path: '', component: OfficeListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfficesRoutingModule {}
