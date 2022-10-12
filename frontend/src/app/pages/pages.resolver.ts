import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { delay, Observable, of } from 'rxjs';
import { SeoService } from '@turnik/domain';

@Injectable({
  providedIn: 'root',
})
export class PagesResolver implements Resolve<Observable<string>> {
  constructor(private seoService: SeoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> {
    switch (state.url) {
      case '/': {
        this.seoService.homePage();
        break;
      }
      case '/playground': {
        this.seoService.playgroundPage();
        break;
      }
      default: {
        //statements;
        break;
      }
    }
    return of('Route!').pipe(delay(0));
  }
}
