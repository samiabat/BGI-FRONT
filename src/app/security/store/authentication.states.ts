import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { tap } from 'rxjs';
import { LoginResponse } from '../model/login-response.model';
import { AuthenticationService } from '../service/authenticaton.service';
import { Login, Logout } from './authentication.actions';

export interface AuthenticationStateModel {
  loginResponse: LoginResponse | null;
  isAuthenticated: boolean;
}

const AUTHENTICATION_STATE_TOKEN = new StateToken<AuthenticationStateModel>(
  'authenticationState'
);

@State<AuthenticationStateModel>({
  name: AUTHENTICATION_STATE_TOKEN,
  defaults: {
    loginResponse: null,
    isAuthenticated: false,
  },
})
@Injectable()
export class AuthenticationState {
  constructor(private authenticationService: AuthenticationService) {}

  @Action(Login)
  login(
    { patchState }: StateContext<AuthenticationStateModel>,
    { loginRequest }: Login
  ) {
    return this.authenticationService.login(loginRequest).pipe(
      tap((loginResponse) => {
        var token = this.authenticationService.getToken();
        patchState({
          loginResponse: loginResponse,
          isAuthenticated: !!token && loginResponse.success,
        });
      })
    );
  }

  @Action(Logout)
  logout({ patchState }: StateContext<AuthenticationStateModel>) {
    patchState({
      loginResponse: null,
      isAuthenticated: false,
    });
    this.authenticationService.logout();
  }
}
