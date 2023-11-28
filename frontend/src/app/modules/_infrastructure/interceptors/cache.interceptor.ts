import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private readonly CACHE_KEY_PREFIX = 'cache:';
  private readonly CACHE_TTL_MS = 1000 * 60 * 60 * 24; // 24 hours
  private isCacheEnabled = true; // use `true` for local dev

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const shouldCacheRequest = this.shouldCacheRequest(req) && req.method == 'GET' && this.isCacheEnabled;

    if (!shouldCacheRequest) {
      return next.handle(req);
    }

    const cacheKey = this.generateCacheKey(req.urlWithParams);

    if (req.headers.get('reset')) {
      this.deleteCache(cacheKey);
    }

    const cachedResponse = this.getFromCache(req.url);
    if (cachedResponse) {
      return of(cachedResponse.clone());
    } else {
      return next.handle(req).pipe(
        tap(event => {
          if (event instanceof HttpResponse && event.status == 200) {
            this.addToCache(req.url, event.clone());
          }
        }),
      );
    }
  }

  clearCache(): void {
    const cacheKeys = Object.keys(localStorage).filter(key => key.startsWith(this.CACHE_KEY_PREFIX));
    cacheKeys.forEach(key => localStorage.removeItem(key));
  }

  private addToCache(url: string, response: HttpResponse<any>): void {
    const cacheKey = this.generateCacheKey(url);
    const cacheValue = {
      timestamp: Date.now(),
      data: response,
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheValue));
  }

  private getFromCache(url: string): HttpResponse<any> | undefined {
    const cacheKey = this.generateCacheKey(url);
    const cacheValue = localStorage.getItem(cacheKey);

    if (cacheValue) {
      const { timestamp, data } = JSON.parse(cacheValue);

      if (Date.now() - timestamp < this.CACHE_TTL_MS) {
        return new HttpResponse({ ...data, status: 200 });
      } else {
        localStorage.removeItem(cacheKey);
      }
    }

    return undefined;
  }

  private deleteCache(url: string): void {
    const cacheKey = this.CACHE_KEY_PREFIX + url;
    localStorage.removeItem(cacheKey);
  }

  private generateCacheKey(url: string): string {
    const urlObj = new URL(url);

    // Optional logic to manage request query
    // const searchParams = new URLSearchParams(urlObj.search);
    // searchParams.delete('token');
    // urlObj.search = searchParams.toString();

    return this.CACHE_KEY_PREFIX + urlObj.toString();
  }

  private shouldCacheRequest(req: HttpRequest<any>): boolean {
    // Add your logic to check if the request should be cached
    // For example, you can check if the request has a specific header:
    // return req.headers.has(CACHE_KEY_HEADER);

    const result =
      req.url.includes('api.mapbox.com/styles') || req.url.includes('ui-avatars.com') || req.url.includes('ipapi.co/json');

    return result;
  }
}
