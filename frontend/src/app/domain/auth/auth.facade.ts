import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, BehaviorSubject, Observable, catchError, first, finalize, of } from 'rxjs';
import { AUTH_GRANT_TYPE, AuthRepository, AuthStorage, JtwTokenJson, UserIdentityJson } from 'app/data';
import { ExtendedDialogService, SnackbarService } from 'app/common';
import { LoginClickEvent, LoginDialogComponent, RegisterDialogComponent } from './index';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';

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
    private dialog: MatDialog,
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
        .pipe(first())
        .subscribe(userIdentity => this.authStorage.updateUserIdentityInfo(userIdentity));
    }
  }

  openLoginDialog() {
    this.dialogRef = this.dialogService.openDialog(LoginDialogComponent, 'login-dialog', {});
    const instance = this.dialogRef.componentInstance;
    instance.isLoginProcessing$ = this.isLoginProcessing$;
    instance.registrationClick.subscribe(() => this.openRegistrationDialog());
    instance.loginClick.subscribe((model: LoginClickEvent) =>
      this.login({ login: model.login, password: model.password, grantType: AUTH_GRANT_TYPE.EMAIL })
    );
  }

  openRegistrationDialog() {
    const dialogRef = this.dialogService.openDialog<RegisterDialogComponent>(RegisterDialogComponent, 'login-dialog');
    const instance = dialogRef.componentInstance;
    instance.isLoginProcessing$ = this.isLoginProcessing$;
    instance.registrationClick.subscribe(model => this.createAccount({ email: model.email, password: model.password }));
  }

  signOut(): void {
    this.isAuthorized$.next(false);
    this.clearStorageInfo();
  }

  private login(model: LoginModel) {
    this.isLoginProcessing$.next(true);
    this.authRepository
      .getUserToken(model.login, model.password, model.grantType)
      .pipe(finalize(() => this.isLoginProcessing$.next(false)))
      .pipe(first())
      .subscribe(r => {
        if (r.status == 'ok') {
          this.authRepository
            .getUserIdentityInfo(r.data.tokenType, r.data.token)
            .pipe(first())
            .subscribe(identityJson => {
              this.authStorage.setUserTokenInfo(r.data, true);
              this.authStorage.setUserIdentityInfo(identityJson, true);
              this.userIdentity = identityJson;
              this.isAuthorized$.next(true);
            });
        } else if (r.status == 'wrong-password') {
          // TODO: pass action to dialog
          // (this.form.controls as any).password.setValue('');
          this._snackBar.error('Login or password was incorrect.');
        } else {
          this._snackBar.error('Our API is down >_<');
        }
      });
  }

  private createAccount(model: RegistrationModel) {
    this.authRepository
      .registrationRequest(model.email, model.password)
      .pipe(finalize(() => this.isLoginProcessing$.next(false)))
      .pipe(first())
      .subscribe(r => {
        if (r.status == 'ok') {
          // 1. send confirmation code
        }
      });
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

export type LoginModel = {
  login: string;
  password: string;
  grantType: string;
  rememberMe?: boolean;
  scope?: string;
};

export type RegistrationModel = {
  email: string;
  password: string;
};
