import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthStorage } from 'app/data';

@Injectable({
  providedIn: 'root',
})
export class RouterGuard implements CanActivate {
  constructor(public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (AuthStorage.Instance.TokenInfo.token) {
      return true;
    }
    this.router.navigate(['/']).then();
    return false;
  }
}
