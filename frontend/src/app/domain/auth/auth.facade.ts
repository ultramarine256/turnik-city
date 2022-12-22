import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, BehaviorSubject, Observable, catchError, first, finalize, take } from 'rxjs';
import { AUTH_GRANT_TYPE, AuthRepository, AuthStorage, UserIdentityJson } from 'app/data';
import { ExtendedDialogService, SnackbarService } from 'app/common';
import { LoginDialogComponent } from './index';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  // predicates
  readonly isAuthorized$: ReplaySubject<boolean> = new ReplaySubject();
  readonly isFetchProcessing$ = new BehaviorSubject(false);
  readonly isLoginProcessing$ = new BehaviorSubject(false);
  isRegistrationEmailSent = false;
  isPasswordChanged = false;
  isPasswordResetEmailSent = false;

  /// fields
  userIdentity: UserIdentityJson = new UserIdentityJson();

  /// services
  private dialogRef: any;

  /// dependencies
  private readonly authStorage: AuthStorage;

  constructor(
    private dialogService: ExtendedDialogService,
    private authRepository: AuthRepository,
    private _snackBar: SnackbarService,
    private router: Router
  ) {
    this.authStorage = new AuthStorage();
  }

  fetch() {
    if (this.authStorage.TokenInfo.token) {
      this.isAuthorized$.next(true);
      this.userIdentity = this.authStorage.IdentityInfo;
      this.fetchIdentityInfo()
        .pipe(take(1))
        .subscribe(userIdentity => this.authStorage.updateUserIdentityInfo(userIdentity));
    }
  }

  openLoginDialog() {
    this.dialogRef = this.dialogService.openDialog(LoginDialogComponent, 'login-dialog', {});
    const instance = this.dialogRef.componentInstance;
    instance.isLoginProcessing$ = this.isLoginProcessing$;
    instance.loginClick.subscribe((model: any) => {
      this.login(model)
        .pipe(take(1))
        .subscribe(r => {
          this.isLoginProcessing$.next(false);
          if (r == 'success') {
            this.dialogRef.close();
            this.router.navigate(['/']).then(() => {});
          } else if (r == 'wrong-password') {
            // TODO: pass action to dialog
            // (this.form.controls as any).password.setValue('');
            this._snackBar.error('Login or password was incorrect.');
          } else if (r == 'api-down') {
            this._snackBar.error('Our API is down >_<');
          }
        });
    });
  }

  signOut(): void {
    this.isAuthorized$.next(false);
    this.clearStorageInfo();
  }

  private login(model: AuthorizationRequestModel): Observable<'success' | 'wrong-password' | 'api-down'> {
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

  private fetchIdentityInfo(): Observable<UserIdentityJson> {
    return this.authRepository
      .getUserIdentityInfo(this.authStorage.TokenInfo.tokenType, this.authStorage.TokenInfo.token)
      .pipe(
        catchError(err => {
          if (err.status === 401) {
            this.router.navigate(['/login']).then(() => this.authStorage.clearStorageInfo());
          }
          throw 'unauthorized: ' + err.status;
        })
      );
  }

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
