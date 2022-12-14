import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { SeoService } from 'app/domain';

@Injectable({
  providedIn: 'root',
})
export class PagesResolver implements Resolve<void> {
  constructor(private seoService: SeoService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    await this.seoService.updateMetaTags(state.url);
  }
}
