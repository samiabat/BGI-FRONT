import { EMPLOYEES_ROUTE, ROLES_ROUTE, SECTORS_ROUTE } from './constants/routes';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  {
    path: ROLES_ROUTE,
    loadChildren: () =>
      import('./roles/roles.module').then((o) => o.RolesModule),
  },
  {
    path: SECTORS_ROUTE,
    loadChildren: () =>
      import('./sectors/sectors.module').then((o) => o.SectorsModule),
  },
  {
    path: EMPLOYEES_ROUTE,
    loadChildren: () =>
      import('./employees/employies.module').then((o) => o.EmployiesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
