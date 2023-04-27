import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthStorage } from 'app/data';

@Injectable({
  providedIn: 'root',
})
export class AppHttpInterceptor implements HttpInterceptor {
  private readonly authStorage: AuthStorage;

  constructor(private router: Router) {
    this.authStorage = new AuthStorage();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has('skip-auth-interceptor') || req.url.includes('blob.core.windows.net')) {
      const headers = req.headers.delete('skip-auth-interceptor');
      const directRequest = req.clone({ headers });
      return next.handle(directRequest);
    }

    if (this.authStorage.TokenInfo?.token) {
      let headers = new HttpHeaders();
      headers = headers.append(
        'Authorization',
        `${this.authStorage.TokenInfo.tokenType} ${this.authStorage.TokenInfo.token}`
      );
      req = req.clone({ headers });
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          // this.router.navigate(['/login']).then(() => this.authStorage.clearStorageInfo());
          // do nothing...
        }

        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          // console.error('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          // console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
        }

        throw new Error('http-error');
      })
    );
  }
}
