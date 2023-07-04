import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LOGIN_ROUTE } from 'src/app/constants/routes';
import { AuthenticationService } from '../service/authenticaton.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    var token = this.authenticationService.getToken();
    console.log("intercept", token)
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request).pipe(
      
      catchError((error: { status: number; message: string | undefined; }) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.authenticationService.logout();
          this.router.navigate([LOGIN_ROUTE]);
        }
        return throwError(() => new Error(error.message));
      })
    );
  }
}
