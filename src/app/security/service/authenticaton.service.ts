import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { LOGIN_URL } from 'src/app/constants/urls';
import { BGIEIErrorHandler } from 'src/app/error-handler/error.handler';
import { LoginRequest } from '../model/login-request.model';
import { LoginResponse } from '../model/login-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly tokenKey: string = 'access-token';
  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(LOGIN_URL, request).pipe(
      tap((response: LoginResponse) => {
        console.log(
          `Was login successful? ${response.success}, message: ${response.message}`
        );
        if (!!response.token) {
          localStorage.setItem(this.tokenKey, response.token);
        }
      }),
      catchError(BGIEIErrorHandler.handleError<LoginResponse>('login'))
    );
  }

  logedIn(){
    return !!localStorage.getItem('token');
  }
  logout() {
    return localStorage.removeItem(this.tokenKey);
  }
}

