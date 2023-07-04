import { DASHBOARD_ROUTE, EMPLOYEES_ROUTE, LOGIN_ROUTE, LOGOUT_ROUTE, MANAGE_ACCOUNT_ROUTE, ROLES_ROUTE, SECTORS_ROUTE } from './constants/routes';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MANAGE_ACCOUNT_URL } from './constants/urls';


const routes: Routes = [
  { path: '', redirectTo: LOGIN_ROUTE, pathMatch: 'full' },
  { path: LOGOUT_ROUTE,  
    loadChildren: () =>
    import('./security/security.module').then((o) => o.SecurityModule),
  },
  { path: LOGIN_ROUTE,  
    loadChildren: () =>
    import('./security/security.module').then((o) => o.SecurityModule),
  },

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
  {
    path: DASHBOARD_ROUTE,
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((o) => o.DashboardModule),
  },
  {
    path: MANAGE_ACCOUNT_ROUTE,
    loadChildren: () =>
      import('./auth/auth.module').then((o) => o.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
