import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { SECTORS_URL } from 'src/app/constants/urls';
import { BGIEIErrorHandler } from 'src/app/error-handler/error.handler';
import { Role } from 'src/app/roles/models/role.model';
import { Sector } from '../models/sector.model';

@Injectable({
  providedIn: 'root',
})
export class SectorService {
  url = SECTORS_URL;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getSectors(): Observable<Sector[]> {
    return this.http.get<Sector[]>(this.url).pipe(
      tap((data) => {
        console.log('fetched sectors');
      }),
      catchError(BGIEIErrorHandler.handleError<Sector[]>('getSectors', []))
    );
  }

  getSector(id: number): Observable<Sector> {
    const url = `${this.url}/${id}`;
    return this.http.get<Sector>(url).pipe(
      tap((_) => console.log(`fetched sector id=${id}`)),
      catchError(
        BGIEIErrorHandler.handleError<Sector>(`getSector id=${id}`)
      )
    );
  }

  getSectorsByGoal(role: Role): Observable<Sector[]> {
    return this.http
      .get<Sector[]>(`${this.url}?$filter=Goal/Id eq ${role.id}`)
      .pipe(
        tap((data) => console.log(`fetched ${data.length} objectives `)),
        catchError(
          BGIEIErrorHandler.handleError<Sector[]>(
            `getObjectivesByGoal goal id=${role.id}`
          )
        )
      );
  }

  addSector(sector: Sector): Observable<Sector> {
    return this.http
      .post<Sector>(this.url, sector, this.httpOptions)
      .pipe(
        tap((newSector: Sector) =>
          console.log(`Added new sector with id: ${newSector.id}`)
        ),
        catchError(BGIEIErrorHandler.handleError<Sector>('addSector'))
      );
  }

  updateSector(id: number, sector: Sector): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http.put<void>(url, sector, this.httpOptions).pipe(
      tap((_) => console.log(`updated sector with id=${id}`)),
      catchError(BGIEIErrorHandler.handleError<void>('updateSector'))
    );
  }

  deleteSector(id: number): Observable<void> {
    const url = `${this.url}/${id}`;

    return this.http.delete<void>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted sector with id=${id}`)),
      catchError(BGIEIErrorHandler.handleError<void>('deleteSector'))
    );
  }
}
