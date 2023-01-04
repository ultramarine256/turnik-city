import { AbstractPolicyService } from './abstract/abstract-policy.service';
import { Injectable } from '@angular/core';
import { PermissionChecker } from './const/permission.checker';

@Injectable({
  providedIn: 'root',
})
export class UserPolicyService extends AbstractPolicyService {
  constructor(permissionChecker: PermissionChecker) {
    super(permissionChecker);
  }

  canCreate() {
    return this.permissions.global.canAll || this.permissions.user.canAll || this.permissions.user.canCreate;
  }

  canRetrieve() {
    return this.permissions.global.canAll || this.permissions.user.canAll || this.permissions.user.canRetrieve;
  }

  canUpdate() {
    return (
      this.permissions.global.canAll ||
      this.permissions.user.canAll ||
      this.permissions.user.canUpdate ||
      this.permissions.user.own.canUpdate
    );
  }

  canDelete(): boolean {
    return (
      this.permissions.global.canAll ||
      this.permissions.user.canAll ||
      this.permissions.user.canDelete ||
      this.permissions.user.own.canDelete
    );
  }
}
