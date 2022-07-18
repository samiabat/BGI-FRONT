import { LoginRequest } from "../model/login-request.model";

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public loginRequest: LoginRequest) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}