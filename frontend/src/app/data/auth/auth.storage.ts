import { UserIdentityJson, JtwTokenJson } from './json';

export class AuthStorage {
  private userToken: JtwTokenJson = new JtwTokenJson();
  private userIdentity: UserIdentityJson = new UserIdentityJson();

  get TokenInfo() {
    return this.userToken;
  }

  get IdentityInfo() {
    return this.userIdentity;
  }

  constructor() {
    this.userIdentity = this._getIdentityFromStorage(LOCAL_STORAGE_KEYS.USER_IDENTITY);
    this.userToken = this._getTokenFromStorage(LOCAL_STORAGE_KEYS.USER_TOKEN);
  }

  /// methods
  setUserTokenInfo(userToken: JtwTokenJson, isPersist: boolean) {
    this.userToken = userToken;

    if (isPersist) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER_TOKEN, JSON.stringify(userToken));
    } else {
      sessionStorage.setItem(LOCAL_STORAGE_KEYS.USER_TOKEN, JSON.stringify(userToken));
    }
  }

  setUserIdentityInfo(userIdentity: UserIdentityJson, isPersist: boolean): void {
    this.userIdentity = userIdentity;

    if (isPersist) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER_IDENTITY, JSON.stringify(userIdentity));
    } else {
      sessionStorage.setItem(LOCAL_STORAGE_KEYS.USER_IDENTITY, JSON.stringify(userIdentity));
    }
  }

  updateUserIdentityInfo(userIdentity: UserIdentityJson) {
    this.userIdentity.mapFromJson(userIdentity);

    if (sessionStorage.getItem(LOCAL_STORAGE_KEYS.USER_IDENTITY)) {
      sessionStorage.setItem(LOCAL_STORAGE_KEYS.USER_IDENTITY, JSON.stringify(userIdentity));
    }
    if (localStorage.getItem(LOCAL_STORAGE_KEYS.USER_IDENTITY)) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER_IDENTITY, JSON.stringify(userIdentity));
    }
  }

  clearStorageInfo() {
    this.userIdentity = new UserIdentityJson();
    this.userToken = new JtwTokenJson();
    sessionStorage.removeItem(LOCAL_STORAGE_KEYS.USER_IDENTITY);
    sessionStorage.removeItem(LOCAL_STORAGE_KEYS.USER_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_IDENTITY);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_TOKEN);
  }

  private _getTokenFromStorage(storageKey: string): JtwTokenJson {
    const userToken = new JtwTokenJson();

    if (sessionStorage.getItem(storageKey)) {
      // @ts-ignore
      userToken.mapFromJson(JSON.parse(sessionStorage.getItem(storageKey)));
    }
    if (localStorage.getItem(storageKey)) {
      // @ts-ignore
      userToken.mapFromJson(JSON.parse(localStorage.getItem(storageKey)));
    }

    return userToken;
  }

  private _getIdentityFromStorage(storageKey: string): UserIdentityJson {
    const userIdentity = new UserIdentityJson();

    if (sessionStorage.getItem(storageKey)) {
      // @ts-ignore
      userIdentity.mapFromJson(JSON.parse(sessionStorage.getItem(storageKey)));
    }
    if (localStorage.getItem(storageKey)) {
      // @ts-ignore
      userIdentity.mapFromJson(JSON.parse(localStorage.getItem(storageKey)));
    }

    return userIdentity;
  }
}

export const LOCAL_STORAGE_KEYS = {
  USER_IDENTITY: 'myapp_user_identity',
  USER_TOKEN: 'myapp_user_token',
};
