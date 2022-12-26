import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { BaseRepository } from '../base.repository';
import { UserIdentityJson, JtwTokenJson, JtwTokenResponse, RegistrationResponseDto } from './json';

@Injectable()
export class AuthRepository extends BaseRepository {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getUserToken(login: string, password: string, grantType: string): Observable<JtwTokenResponse> {
    return this.httpClient
      .post<JtwTokenJson>(
        `${environment.apiBaseUrl}/auth/token`,
        { login, password, grantType },
        { headers: { 'auth-skip-prefix': '' } }
      )
      .pipe(map(r => ({ status: 'ok' as const, data: r })))
      .pipe(
        catchError(x => {
          if (x.status === 403 || x.status === 401) {
            return of({ status: 'wrong-password' as const, data: x });
          }
          return of({ status: 'api-down' as const, data: x });
        })
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

  registrationRequest(email: string, password: string): Observable<RegistrationResponseDto> {
    return this.httpClient
      .post<JtwTokenJson>(
        `${environment.apiBaseUrl}/auth/registration`,
        { email, password },
        { headers: { 'auth-skip-prefix': '' } }
      )
      .pipe(map(r => ({ status: 'ok' as const, data: r })))
      .pipe(
        catchError(x => {
          if (x.status === 403 || x.status === 401) {
            return of({ status: 'email-already-exist' as const, data: x });
          }
          return of({ status: 'api-down' as const, data: x });
        })
      );
  }

  sendConfirmationCodeEmail(email: string): Observable<void> {
    return this.httpClient.post<void>(`${environment.apiBaseUrl}/auth/confirmation-email`, {
      email,
      passwordResetPageUrl: `${environment.apiBaseUrl}/login/change-password`,
    });
  }

  sendPasswordResetEmail(email: string): Observable<void> {
    return this.httpClient.post<void>(`${environment.apiBaseUrl}/auth/password-reset-email`, {
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
