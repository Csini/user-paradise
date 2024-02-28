import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private readonly router: Router,
    private readonly errorService: ErrorService
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        const { code, message } = error.error;
        this.errorService.addError({
          code: code || error?.status || '500',
          message:
            message ||
            error?.statusText ||
            'Ismeretlen hiba. Kérjük vegye fel a kapcsolatot a administrátorral.',
        });
        this.router.navigate(['/error']);
        return EMPTY;
      })
    );
  }
}
