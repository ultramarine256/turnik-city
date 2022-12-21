import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, BehaviorSubject, Observable, tap, catchError, first, Subject, finalize } from 'rxjs';
import { AUTH_GRANT_TYPE, AuthRepository, AuthStorage, UserIdentityJson } from 'app/data';
import { ExtendedDialogService } from 'app/common';
import { LoginDialogComponent } from './index';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  // predicates
  readonly isFetchProcessing$ = new ReplaySubject<boolean>();
  readonly isLoginProcessing$ = new ReplaySubject<boolean>();
  isRegistrationEmailSent = false;
  isPasswordChanged = false;
  isPasswordResetEmailSent = false;

  readonly predicate = {
    isProcessing$: new BehaviorSubject<boolean>(false),
    isRegistrationEmailSent: false,
    isPasswordChanged: false,
    isPasswordResetEmailSent: false,
  };

  /// fields
  isAuthorized$: ReplaySubject<boolean> = new ReplaySubject();
  userIdentity: UserIdentityJson = new UserIdentityJson();

  /// services
  private dialogRef: any;

  /// dependencies
  private readonly authStorage: AuthStorage;

  constructor(
    private dialogService: ExtendedDialogService,
    private authRepository: AuthRepository,
    private router: Router
  ) {
    this.authStorage = new AuthStorage();
  }

  fetch() {
    if (this.authStorage.TokenInfo.token) {
      this.fetchIdentityInfo().pipe(first()).subscribe();
      this.isAuthorized$.next(true);
      this.userIdentity = this.authStorage.IdentityInfo;
    }
  }

  dialog = {
    open: () => {
      this.dialogRef = this.dialogService.openDialog(LoginDialogComponent, 'login-dialog', {});
    },
    close: () => this.dialogRef.close(),
  };

  login(model: AuthorizationRequestModel): Observable<'success' | 'wrong-password' | 'api-down'> {
    const result = new ReplaySubject<'success' | 'wrong-password' | 'api-down'>();

    this.isLoginProcessing$.next(true);
    this.authRepository
      .getUserToken(model.login, model.password, AUTH_GRANT_TYPE.EMAIL, 'app')
      .pipe(first())
      .pipe(finalize(() => this.isLoginProcessing$.next(false)))
      .subscribe(
        tokenJson => {
          this.authRepository.getUserIdentityInfo(tokenJson.tokenType, tokenJson.token).subscribe(identityJson => {
            this.authStorage.setUserTokenInfo(tokenJson, model.rememberMe);
            this.authStorage.setUserIdentityInfo(identityJson, model.rememberMe);
            this.userIdentity = identityJson;
            this.isAuthorized$.next(true);
            result.next('success');
          });
        },
        response => {
          if (response.status === 403 || response.status === 401) {
            result.next('wrong-password');
          } else {
            result.next('api-down');
          }
        }
      );

    return result;
  }

  signOut(): void {
    this.isAuthorized$.next(false);
    this.clearStorageInfo();
  }

  private fetchIdentityInfo(): Observable<UserIdentityJson> {
    return this.authRepository
      .getUserIdentityInfo(this.authStorage.TokenInfo.tokenType, this.authStorage.TokenInfo.token)
      .pipe(
        tap(userIdentity => this.authStorage.updateUserIdentityInfo(userIdentity)),
        catchError(err => {
          if (err.status === 401) {
            this.router.navigate(['/login']).then(() => this.authStorage.clearStorageInfo());
          }
          throw 'unauthorized: ' + err.status;
        })
      );
  }

  /// helpers
  private clearStorageInfo() {
    this.authStorage.clearStorageInfo();
  }
}

export type AuthorizationRequestModel = {
  login: string;
  password: string;
  grantType?: string;
  rememberMe: boolean;
  scope?: string;
};

export type AuthDialog = {
  dialogRef: any | string;
  open: () => void;
};
