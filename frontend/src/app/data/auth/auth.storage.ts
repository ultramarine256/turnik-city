import { UserIdentityDto, JtwTokenDto } from './json';

export class AuthStorage {
  private userToken: JtwTokenDto;
  private userIdentity: UserIdentityDto;

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
  setUserTokenInfo(userToken: JtwTokenDto, isPersist: boolean) {
    this.userToken = userToken;

    if (isPersist) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER_TOKEN, JSON.stringify(userToken));
    } else {
      sessionStorage.setItem(LOCAL_STORAGE_KEYS.USER_TOKEN, JSON.stringify(userToken));
    }
  }

  setUserIdentityInfo(userIdentity: UserIdentityDto, isPersist: boolean): void {
    this.userIdentity = userIdentity;

    if (isPersist) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER_IDENTITY, JSON.stringify(userIdentity));
    } else {
      sessionStorage.setItem(LOCAL_STORAGE_KEYS.USER_IDENTITY, JSON.stringify(userIdentity));
    }
  }

  updateUserIdentityInfo(userIdentity: UserIdentityDto) {
    this.userIdentity = userIdentity;

    if (sessionStorage.getItem(LOCAL_STORAGE_KEYS.USER_IDENTITY)) {
      sessionStorage.setItem(LOCAL_STORAGE_KEYS.USER_IDENTITY, JSON.stringify(userIdentity));
    }
    if (localStorage.getItem(LOCAL_STORAGE_KEYS.USER_IDENTITY)) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER_IDENTITY, JSON.stringify(userIdentity));
    }
  }

  clearStorageInfo() {
    this.userIdentity = {} as any; // TODO: discuss
    this.userToken = {} as any; // TODO: discuss
    sessionStorage.removeItem(LOCAL_STORAGE_KEYS.USER_IDENTITY);
    sessionStorage.removeItem(LOCAL_STORAGE_KEYS.USER_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_IDENTITY);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_TOKEN);
  }

  private _getTokenFromStorage(storageKey: string): JtwTokenDto {
    let userToken: JtwTokenDto;

    if (sessionStorage.getItem(storageKey)) {
      userToken = JSON.parse(sessionStorage.getItem(storageKey) || '');
    } else {
      userToken = JSON.parse(localStorage.getItem(storageKey) || '');
    }

    return userToken;
  }

  private _getIdentityFromStorage(storageKey: string): UserIdentityDto {
    let userIdentity: UserIdentityDto;

    if (sessionStorage.getItem(storageKey)) {
      // @ts-ignore
      userIdentity = JSON.parse(sessionStorage.getItem(storageKey));
    } else {
      userIdentity = JSON.parse(localStorage.getItem(storageKey) || '');
    }

    return userIdentity;
  }
}

export const LOCAL_STORAGE_KEYS = {
  USER_IDENTITY: 'myapp_user_identity',
  USER_TOKEN: 'myapp_user_token',
};
