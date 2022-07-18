import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthenticationSelector } from '../store/authentication.selectors';

@Injectable({
  providedIn: 'root',
})
export class LoadGuard implements CanLoad {
  @Select(AuthenticationSelector.isAuthenticated)
  isAuthenticated$!: Observable<boolean>;

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.isAuthenticated$;
  }
}
