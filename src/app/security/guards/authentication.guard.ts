import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthenticationSelector } from '../store/authentication.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  @Select(AuthenticationSelector.isAuthenticated)
  isAuthenticated$!: Observable<boolean>;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.isAuthenticated$;
  }
}
