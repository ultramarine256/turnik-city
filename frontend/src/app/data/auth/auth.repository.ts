import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { BaseRepository } from '../base.repository';
import { DealerScopeJson, UserIdentityJson, JtwTokenJson } from './json';

@Injectable()
export class AuthRepository extends BaseRepository {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getUserToken(login: string, password: string, grantType: string, scope: string): Observable<JtwTokenJson> {
    return this.httpClient.post<JtwTokenJson>(
      `${environment.apiBaseUrl}/auth/token`,
      {
        login,
        password,
        grantType,
        scope,
      },
      {
        headers: {
          'auth-skip-prefix': '',
        },
      }
    );
  }

  getUserIdentityInfo(tokenType: string, authorizationToken: string): Observable<UserIdentityJson> {
    return this.httpClient.get<UserIdentityJson>(`${environment.apiBaseUrl}/auth/identity-info`, {
      headers: {
        'auth-skip-prefix': '',
        Authorization: `${tokenType} ${authorizationToken}`,
      },
    });
  }

  getUserScopes() {
    return this.httpClient
      .get<DealerScopeJson[]>(`${environment.apiBaseUrl}/auth/scope`)
      .pipe(map((x: any[]) => x.map(r => new DealerScopeJson().mapFromJson(r))));
  }

  sendPasswordResetEmail(email: string): Observable<void> {
    return this.httpClient.post<void>(`${environment.apiBaseUrl}/auth/send-password-reset-email`, {
      email,
      passwordResetPageUrl: `${environment.apiBaseUrl}/login/change-password`,
    });
  }

  changeForgottenPassword(newPassword: string, passwordResetHash: string): Observable<void> {
    return this.httpClient.post<void>(`${environment.apiBaseUrl}/auth/change-forgotten-password`, {
      newPassword,
      passwordResetHash,
    });
  }

  sendRegisterMeEmail(email: string): Observable<void> {
    return this.httpClient.post<void>(`${environment.apiBaseUrl}/auth/register-me-email`, { email });
  }
}

export const AUTH_CONST = {
  HTTP_SKIP_PREFIX: 'auth-skip-prefix',
};

export const AUTH_GRANT_TYPE = {
  LOGIN: 'login',
  EMAIL: 'email',
  PHONE: 'phone',
};
