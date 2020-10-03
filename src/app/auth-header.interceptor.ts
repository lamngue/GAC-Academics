import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SecurityService } from "./services/security.service";
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

  constructor(private securityService: SecurityService, private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const req = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + this.securityService.getToken()
      }
    });
    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status == 401) {
          this.handleAuthError();
          return of(err);
        }
        throw err
      }
      )
    );
  }

  handleAuthError() {
    this.securityService.removeToken();
    this.router.navigate(['/login']);
  }
}