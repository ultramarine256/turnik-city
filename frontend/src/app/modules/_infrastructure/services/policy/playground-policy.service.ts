import { AbstractPolicyService } from './abstract/abstract-policy.service';
import { PermissionChecker } from './const/permission.checker';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlaygroundPolicyService extends AbstractPolicyService {
  constructor(permissionChecker: PermissionChecker) {
    super(permissionChecker);
  }

  canCreate() {
    return this.permissions.global.canAll || this.permissions.playground.canAll || this.permissions.playground.canCreate;
  }

  canRetrieve() {
    return this.permissions.playground.canAll || this.permissions.playground.canAll || this.permissions.playground.canRetrieve;
  }

  canUpdate() {
    return (
      this.permissions.global.canAll ||
      this.permissions.playground.canAll ||
      this.permissions.playground.canUpdate ||
      this.permissions.playground.own.canUpdate
    );
  }

  canDelete(): boolean {
    return (
      this.permissions.global.canAll ||
      this.permissions.playground.canAll ||
      this.permissions.playground.canDelete ||
      this.permissions.playground.own.canDelete
    );
  }
}
