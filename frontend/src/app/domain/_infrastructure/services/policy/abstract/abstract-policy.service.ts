import { Permissions } from '../permissions';

export abstract class AbstractPolicyService {
  protected permissions: Permissions;

  protected constructor(permissions: Permissions) {
    this.permissions = permissions;
  }
}
