import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, share, tap } from 'rxjs';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private isCacheEnabled = false;
  private cache: Map<string, HttpResponse<any>> = new Map();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    if (req.headers.get('reset') && this.isCacheEnabled) {
      this.cache.delete(req.url);
    }

    const cachedResponse = this.cache.get(req.url);
    if (cachedResponse) {
      return of(cachedResponse.clone());
    } else {
      return next
        .handle(req)
        .pipe(
          tap(stateEvent => {
            if (stateEvent instanceof HttpResponse) {
              this.cache.set(req.url, stateEvent.clone());
            }
          })
        )
        .pipe(share());
    }
  }
}
