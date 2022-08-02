import { Component, ViewChild } from '@angular/core'
import { BreakpointObserver } from '@angular/cdk/layout'
import { delay } from 'rxjs/operators'
import { MatSidenav } from '@angular/material/sidenav'
import { DASHBOARD_ROUTE, EMPLOYEES_ROUTE, LOGIN_ROUTE, LOGOUT_ROUTE, MANAGE_ACCOUNT_ROUTE, NOTIFICATIONS_ROUTE, ROLES_ROUTE, SECTORS_ROUTE } from '../constants/routes'
import { AuthenticationFacade } from '../security/facade/authentication.facade'
import { Router } from '@angular/router'
import { AuthenticationService } from '../security/service/authenticaton.service'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav
  loggedIn!: boolean;

  manageAccountsRoute = {
    link: MANAGE_ACCOUNT_ROUTE,
    label: 'Manage Accounts',
    icon: 'account_circle',
  }

  loginRoute = {
    link: LOGIN_ROUTE,
    label: 'Login',
    icon: '',
  }

  logoutRoute = {
    link: LOGOUT_ROUTE,
    label: 'Logout',
    icon: 'logout',
  }

  notificationsRoute = {
    link: NOTIFICATIONS_ROUTE,
    label: 'Notifications',
    icon: 'notifications',
  }

  mainNavLinks = [
    { link: DASHBOARD_ROUTE, label: 'Dashboard', icon: 'dashboard' },
    { link: EMPLOYEES_ROUTE, label: 'Emplyees', icon: 'list_alt' },
    { link: ROLES_ROUTE, label: 'Roles', icon: 'list' },
    { link: SECTORS_ROUTE, label: 'Sectors', icon: 'segment' },
    {
      link: MANAGE_ACCOUNT_ROUTE,
      label: 'Manage Accounts',
      icon: 'account_circle',
    }
  ]
  
  constructor(private observer: BreakpointObserver, 
    public authenticationService: AuthenticationService,
     private router: Router,
     private authenticationFacade: AuthenticationFacade,
     ) {}

  ngAfterViewInit() {
    if (this.authenticationService.logedIn()){
      this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over'
          this.sidenav.close()
        } else {
          this.sidenav.mode = 'side'
          this.sidenav.open()
        }
      })
    }
    
  }



  logout(){
    this.authenticationService.logout();
  }
}
