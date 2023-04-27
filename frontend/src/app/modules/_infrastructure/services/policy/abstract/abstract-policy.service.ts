import { PermissionChecker } from '../const/permission.checker';
import { Permissions } from '../const/permissions';

export abstract class AbstractPolicyService {
  protected permissionChecker: PermissionChecker;

  public get permissions(): Permissions {
    return this.permissionChecker.perms;
  }

  protected constructor(permissionChecker: PermissionChecker) {
    this.permissionChecker = permissionChecker;
  }

  isAuthorized() {
    return this.permissions.isAuthorized;
  }
}
