import { AbstractPolicyService } from './abstract/abstract-policy.service';

export class UserPolicyService extends AbstractPolicyService {
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
