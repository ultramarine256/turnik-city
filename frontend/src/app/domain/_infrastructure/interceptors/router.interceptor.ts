import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthStorage } from 'app/data';
import { UserPolicyService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class RouterGuard implements CanActivate {
  constructor(public router: Router, private userPolicy: UserPolicyService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userPolicy.isAuthorized()) {
      return true;
    }
    this.router.navigate(['/']).then();
    return false;
  }
}
