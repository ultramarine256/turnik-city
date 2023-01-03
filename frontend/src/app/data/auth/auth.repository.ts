import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'environments/environment';
import { BaseRepository } from '../base.repository';
import { UserIdentityDto, JtwTokenResponse } from './json';

@Injectable()
export class AuthRepository extends BaseRepository {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getJwtToken(login: string, password: string, grantType: string): Observable<JtwTokenResponse> {
    return this.httpClient
      .post<JtwTokenResponse>(
        `${environment.apiBaseUrl}/auth/token`,
        { login, password, grantType },
        { headers: { 'skip-auth-interceptor': '' } }
      )
      .pipe(catchError(r => of(r.error)));
  }

  getUserIdentityInfo(tokenType: string, authorizationToken: string): Observable<UserIdentityDto> {
    return this.httpClient.get<UserIdentityDto>(`${environment.apiBaseUrl}/auth/identity-info`, {
      headers: {
        Authorization: `${tokenType} ${authorizationToken}`,
        'skip-auth-interceptor': '',
      },
    });
  }

  registerNewUser(email: string, password: string): Observable<{ status: 'ok' | 'email-already-exist' }> {
    return this.httpClient
      .post<{ status: 'ok' | 'email-already-exist' }>(
        `${environment.apiBaseUrl}/auth/registration`,
        { email, password },
        { headers: { 'skip-auth-interceptor': '' } }
      )
      .pipe(catchError(r => of(r.error)));
  }

  sendConfirmationEmail(email: string): Observable<void> {
    return this.httpClient.post<void>(`${environment.apiBaseUrl}/auth/confirmation-email`, { email });
  }

  validateConfirmationCode(email: string, code: string): Observable<{ status: 'ok' | 'wrong-code' }> {
    return this.httpClient
      .post<{ status: 'ok' | 'wrong-code' }>(
        `${environment.apiBaseUrl}/auth/validate-code`,
        { email, code },
        { headers: { 'skip-auth-interceptor': '' } }
      )
      .pipe(catchError(r => of(r.error)));
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
}

export const AUTH_GRANT_TYPE = {
  LOGIN: 'login',
  EMAIL: 'email',
  PHONE: 'phone',
};
