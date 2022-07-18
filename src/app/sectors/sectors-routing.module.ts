import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectorListComponent } from './components/sector-list/sector-list.component';

const routes: Routes = [{ path: '', component: SectorListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SectorsRoutingModule {}
