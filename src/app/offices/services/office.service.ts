import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { BGIEIErrorHandler } from 'src/app/error-handler/error.handler';
import { Office } from '../models/office.model';

@Injectable({
  providedIn: 'root',
})
export class OfficeService {
  url = 'OFFICES_URL';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getOffices(): Observable<Office[]> {
    return this.http.get<Office[]>(this.url).pipe(
      tap((data) => {
        console.log('fetched offices');
      }),
      catchError(BGIEIErrorHandler.handleError<Office[]>('getOffices', []))
    );
  }

  getOffice(id: number): Observable<Office> {
    const url = `${this.url}/${id}`;
    return this.http.get<Office>(url).pipe(
      tap((_) => console.log(`fetched office id=${id}`)),
      catchError(BGIEIErrorHandler.handleError<Office>(`getOffice id=${id}`))
    );
  }

  addOffice(office: Office): Observable<Office> {
    return this.http.post<Office>(this.url, office, this.httpOptions).pipe(
      tap((newOffice: Office) =>
        console.log(`Added new office with id: ${newOffice.id}`)
      ),
      catchError(BGIEIErrorHandler.handleError<Office>('addOffice'))
    );
  }

  updateOffice(id: number, office: Office): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http.put<void>(url, office, this.httpOptions).pipe(
      tap((_) => console.log(`updated office with id=${id}`)),
      catchError(BGIEIErrorHandler.handleError<void>('updateOffice'))
    );
  }

  deleteOffice(id: number): Observable<void> {
    const url = `${this.url}/${id}`;

    return this.http.delete<void>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted office with id=${id}`)),
      catchError(BGIEIErrorHandler.handleError<void>('deleteOffice'))
    );
  }
}
