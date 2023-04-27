import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

/**
 * Returns whether a current platform represents a server or browser.
 */
@Injectable({ providedIn: 'root' })
export class BrowserApiService {
  private _isBrowser = isPlatformBrowser(this.platformId);
  private _isServer = isPlatformServer(this.platformId);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  isBrowser(): boolean {
    return this._isBrowser;
  }

  isServer(): boolean {
    return this._isServer;
  }
}
