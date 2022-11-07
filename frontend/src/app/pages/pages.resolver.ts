import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { delay, Observable, of } from 'rxjs';
import { SeoService } from '@turnik/domain';

@Injectable({
  providedIn: 'root',
})
export class PagesResolver implements Resolve<void> {
  constructor(private seoService: SeoService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    await this.seoService.updateMetaTags(state.url);
  }
}
