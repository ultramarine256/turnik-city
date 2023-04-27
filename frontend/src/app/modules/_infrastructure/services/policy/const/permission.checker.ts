import { Permissions } from './permissions';
import { Injectable } from '@angular/core';
import { AuthStorage } from 'app/data';

@Injectable({
  providedIn: 'root',
})
export class PermissionChecker {
  private permissions: Permissions;

  get perms() {
    return this.permissions;
  }

  constructor() {
    // TODO: refactor
    const hasToken = new AuthStorage().TokenInfo?.token;
    if (hasToken) {
      this.setRolePermissions('user');
      this.setIsAuthorized(true);
    } else {
      this.setRolePermissions('anonymous');
      this.setIsAuthorized(false);
    }
  }

  setIsAuthorized(isAuthorized: boolean) {
    this.permissions.isAuthorized = isAuthorized;
  }

  setPermissions(permissionsArr: string[]) {
    const has = (_: string) => permissionsArr.includes(_);

    this.permissions.global.canAll = has('CanAllAll');
    this.permissions.global.canCreate = has('CanCreateAll');
    this.permissions.global.own.canAll = has('CanAllOwn');
    // TODO: refactor or extend
  }

  setRolePermissions(role: 'anonymous' | 'user' | 'admin') {
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
