import { Selector } from '@ngxs/store';
import { AuthenticationState, AuthenticationStateModel } from './authentication.states';
export class AuthenticationSelector {
  @Selector([AuthenticationState])
  static isAuthenticated(stateModel: AuthenticationStateModel) {
    return stateModel.isAuthenticated;
  }
}

