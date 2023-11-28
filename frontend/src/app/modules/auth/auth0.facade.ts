import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Auth0Facade {
  get user() {
    return this.auth.user$;
  }

  get isAuthenticated() {
    return this.auth.isAuthenticated$;
  }

  constructor(
    private auth: AuthService,
    private httpClient: HttpClient,
  ) {}

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    return this.auth.logout();
  }

  updateUserFavoriteColor(color: string) {
    this.user.subscribe(r => {
      const userId = r?.sub || '';

      this.auth
        .getAccessTokenSilently({
          authorizationParams: {
            // scope: 'read:current_user update:current_user_metadata',
          },
        })
        .subscribe(r => {
          const accessToken = r;

          const url = `https://dev-1y2sdjiu.us.auth0.com/api/v2/users/${userId}`;
          const headers = { Authorization: `Bearer ${accessToken}` };
          const body = { user_metadata: { favorite_color: 'asd' } };

          this.httpClient.patch(url, body, { headers }).subscribe(r => {
            console.log(r);
          });
        });
    });
  }
}
