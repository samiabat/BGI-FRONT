import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, Observable, tap } from 'rxjs'
import { EMPLOYEES_URL } from 'src/app/constants/urls'
import { BGIEIErrorHandler } from 'src/app/error-handler/error.handler'
import { AuthenticationService } from 'src/app/security/service/authenticaton.service'
import { Employee } from '../models/employee.model'

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  url = EMPLOYEES_URL
  token = this.authenticateService.getToken();
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${this.token}`}),
  }

  constructor(private http: HttpClient, private authenticateService: AuthenticationService) { }

  getEmployies(): Observable<Employee[]> {
    const token = this.authenticateService.getToken();
    return this.http.get<Employee[]>(this.url, {headers: {Authorization: `Bearer ${token}`,}}).pipe(
      tap((data) => {
        console.log('fetched employies')
      }),
      catchError(BGIEIErrorHandler.handleError<Employee[]>('getEmployies', [])),
    )
  }

  getEmployee(id: number): Observable<Employee> {
    const token = this.authenticateService.getToken();
    const url = `${this.url}${id}/`
    return this.http.get<Employee>(url, {headers: {Authorization: `Bearer ${token}`,}}).pipe(
      tap((_) => console.log(`fetched employee id=${id}`)),
      catchError(
        BGIEIErrorHandler.handleError<Employee>(`getEmployee id=${id}`),
      ),
    )
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.url, employee, this.httpOptions).pipe(

      tap((newEmployee: Employee) =>
        console.log(`Added new employee with id: ${newEmployee.id}`),
      ),
      catchError(BGIEIErrorHandler.handleError<Employee>('addEmployee')),
    )
  }

  updateEmployee(id: number, employee: Employee): Observable<void> {
    const url = `${this.url}${id}/`
    return this.http.put<void>(url, employee, this.httpOptions).pipe(
      tap((_) => console.log(`updated employee with id=${id}`)),
      catchError(BGIEIErrorHandler.handleError<void>('updateEmployee')),
    )
  }

  deleteEmployee(id: number): Observable<void> {
    const url = `${this.url}${id}/`

    return this.http.delete<void>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted employee with id=${id}`)),
      catchError(BGIEIErrorHandler.handleError<void>('deleteEmployee')),
    )
  }
}
