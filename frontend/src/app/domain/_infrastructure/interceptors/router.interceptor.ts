import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserPolicyService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class RouterGuard implements CanActivate {
  constructor(private router: Router, private userPolicy: UserPolicyService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userPolicy.isAuthorized()) {
      return true;
    }
    this.router.navigate(['/']).then();
    return false;
  }
}
