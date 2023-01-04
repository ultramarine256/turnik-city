import { Permissions } from './permissions';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PermissionChecker {
  private permissions: Permissions;

  public get perms() {
    return this.permissions;
  }

  constructor() {
    this.setRolePermissions('anonymous');
    this.setIsAuthorized(false);
  }

  public setIsAuthorized(isAuthorized: boolean) {
    this.permissions.isAuthorized = isAuthorized;
  }

  public setPermissions(permissionsArr: string[]) {
    const has = (_: string) => permissionsArr.includes(_);

    this.permissions.global.canAll = has('CanAllAll');
    this.permissions.global.canCreate = has('CanCreateAll');
    this.permissions.global.own.canAll = has('CanAllOwn');
    // TODO: refactor or extend
  }

  public setRolePermissions(role: 'anonymous' | 'user' | 'admin') {
    if (role == 'anonymous') {
      this.permissions = {
        isAuthorized: false,
        global: {
          canAll: false,
          canCreate: false,
          canRetrieve: false,
          canUpdate: false,
          canDelete: false,
          own: {
            canAll: false,
            canRetrieve: false,
            canUpdate: false,
            canDelete: false,
          },
        },
        user: {
          canAll: false,
          canCreate: false,
          canRetrieve: false,
          canUpdate: false,
          canDelete: false,
          own: {
            canAll: false,
            canRetrieve: false,
            canUpdate: false,
            canDelete: false,
          },
          canChangePassword: false,
        },
        playground: {
          canAll: false,
          canCreate: false,
          canRetrieve: false,
          canUpdate: false,
          canDelete: false,
          own: {
            canAll: false,
            canRetrieve: false,
            canUpdate: false,
            canDelete: false,
          },
        },
        navigation: {
          home: true,
          profile: false,
        },
      };
    } else if (role == 'user') {
      this.permissions = {
        isAuthorized: true,
        global: {
          canAll: false,
          canCreate: false,
          canRetrieve: false,
          canUpdate: false,
          canDelete: false,
          own: {
            canAll: true,
            canRetrieve: false,
            canUpdate: false,
            canDelete: false,
          },
        },
        user: {
          canAll: false,
          canCreate: false,
          canRetrieve: false,
          canUpdate: false,
          canDelete: false,
          own: {
            canAll: false,
            canRetrieve: false,
            canUpdate: false,
            canDelete: false,
          },
          canChangePassword: false,
        },
        playground: {
          canAll: false,
          canCreate: true,
          canRetrieve: false,
          canUpdate: false,
          canDelete: false,
          own: {
            canAll: true,
            canRetrieve: false,
            canUpdate: false,
            canDelete: false,
          },
        },
        navigation: {
          home: true,
          profile: true,
        },
      };
    }
  }
}
