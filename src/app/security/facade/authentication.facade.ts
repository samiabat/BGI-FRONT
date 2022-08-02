import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LoginRequest } from '../model/login-request.model';
import { AuthenticationService } from '../service/authenticaton.service';
import { Login, Logout } from '../store/authentication.actions';
import { AuthenticationSelector } from '../store/authentication.selectors';

@Injectable()
export class AuthenticationFacade {
  @Select(AuthenticationSelector.isAuthenticated)
  isAuthenticated$!: Observable<boolean>;

  constructor(private store: Store, private authenticationService: AuthenticationService) {}

  login(loginRequest: LoginRequest) {
    this.store.dispatch(new Login(loginRequest));
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  loggedIn(){
    var token = this.authenticationService.getToken();
    return token!=null;
  }
}
