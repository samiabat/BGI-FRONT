import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { ROLES_URL } from 'src/app/constants/urls';
import { BGIEIErrorHandler } from 'src/app/error-handler/error.handler';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  url = ROLES_URL;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.url).pipe(
      tap((data) => {}),
      catchError(BGIEIErrorHandler.handleError<Role[]>('getRoles', []))
    );
  }

  getRole(id: number): Observable<Role> {
    const url = `${this.url}/${id}`;
    return this.http.get<Role>(url).pipe(
      tap((_) => console.log(`fetched Roles id=${id}`)),
      catchError(BGIEIErrorHandler.handleError<Role>(`getRoles id=${id}`))
    );
  }

  addRole(stat: Role): Observable<Role> {
    return this.http.post<Role>(this.url, stat, this.httpOptions).pipe(
      tap((newStat: Role) =>
        console.log(`Added new Roles with id: ${newStat.id}`)
      ),
      catchError(BGIEIErrorHandler.handleError<Role>('addRolesl'))
    );
  }

  updateRole(id: number, stat: Role): Observable<void> {
    console.log(stat);
    const url = `${this.url}/${id}`;
    return this.http.put<void>(url, stat, this.httpOptions).pipe(
      tap(() => console.log(`updated Roles with id=${id}`)),
      catchError(BGIEIErrorHandler.handleError<void>('updateRoles'))
    );
  }

  deleteRole(id: number): Observable<void> {
    const url = `${this.url}/${id}`;

    return this.http.delete<void>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted Roles with id=${id}`)),
      catchError(BGIEIErrorHandler.handleError<void>('deleteRoles'))
    );
  }
}
