import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Observable, catchError, first, finalize, of, mergeMap } from 'rxjs';
import { AUTH_GRANT_TYPE, AuthRepository, AuthStorage, UserIdentityJson } from 'app/data';
import { ExtendedDialogService, SnackbarService } from 'app/common';
import { ConfirmationCodeDialog, LoginClickEvent, LoginDialog, RegisterationDialog } from './index';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  // predicates
  readonly isAuthorized$ = new BehaviorSubject(false);
  readonly isLoginProcessing$ = new BehaviorSubject(false);
  readonly isRegistrationProcessing$ = new BehaviorSubject(false);
  readonly isConfirmationProcessing$ = new BehaviorSubject(false);

  /// fields
  userIdentity: UserIdentityJson = new UserIdentityJson();

  /// attributes
  private loginDialogRef: any;
  private registrationDialog: MatDialogRef<RegisterationDialog, any>;

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

  /// methods
  refreshIdentityInfo() {
    if (this.authStorage.TokenInfo.token) {
      this.isAuthorized$.next(true);
      this.userIdentity = this.authStorage.IdentityInfo;
      this.fetchIdentityInfo()
        .pipe(first())
        .subscribe(userIdentity => this.authStorage.updateUserIdentityInfo(userIdentity));
    }
  }

  openLoginDialog() {
    this.loginDialogRef = this.dialogService.openDialog(LoginDialog, 'login-dialog', {});
    const instance = this.loginDialogRef.componentInstance;
    instance.isLoginProcessing$ = this.isLoginProcessing$;
    instance.registrationClick.subscribe(() => this.openRegistrationDialog());
    instance.loginClick.subscribe((model: LoginClickEvent) =>
      this.login({ email: model.email, password: model.password, grantType: AUTH_GRANT_TYPE.EMAIL })
    );
  }

  openRegistrationDialog() {
    this.registrationDialog = this.dialogService.openDialog<RegisterationDialog>(RegisterationDialog, 'login-dialog');
    const instance = this.registrationDialog.componentInstance;
    instance.isRegistrationProcessing$ = this.isRegistrationProcessing$;
    instance.registrationClick.subscribe(registrationEvent => {
      // 1. create account
      this.isRegistrationProcessing$.next(true);
      this.createAccount({ email: registrationEvent.email, password: registrationEvent.password })
        .pipe(
          catchError(r => {
            this.isRegistrationProcessing$.next(false);
            throw new Error();
          })
        )
        .subscribe(r =>
          // 2. send confirmation email
          this.authRepository
            .sendConfirmationEmail(registrationEvent.email)
            .pipe(first())
            .subscribe(r => {
              this.isRegistrationProcessing$.next(false);
              this.registrationDialog.close();
              // 3. validate code
              this.openConfirmationDialog(registrationEvent.email).subscribe(confirmationEvent => {
                this.isConfirmationProcessing$.next(true);
                this.validateConfirmationCode(registrationEvent.email, confirmationEvent.code)
                  .pipe(finalize(() => this.isConfirmationProcessing$.next(false)))
                  .subscribe(r =>
                    // 4. login user
                    this.login({
                      email: registrationEvent.email,
                      password: registrationEvent.password,
                      grantType: AUTH_GRANT_TYPE.EMAIL,
                    })
                  );
              });
            })
        );
    });
  }

  openConfirmationDialog(email: string): EventEmitter<{ code: string }> {
    const dialogRef = this.dialogService.openDialog<ConfirmationCodeDialog>(ConfirmationCodeDialog, 'login-dialog');
    const instance = dialogRef.componentInstance;
    instance.isProcessing$ = this.isConfirmationProcessing$;
    return instance.submitClick;
  }

  signOut() {
    this.isAuthorized$.next(false);
    this.clearStorageInfo();
  }

  /// inner
  private login(model: LoginModel) {
    this.isLoginProcessing$.next(true);
    this.authRepository
      .getUserToken(model.email, model.password, model.grantType)
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

  private createAccount(model: RegistrationModel): Observable<'ok' | 'email-already-exist'> {
    return this.authRepository.registerNewUser(model.email, model.password).pipe(
      mergeMap(r => {
        if (r.status == 'ok') {
          return of(r.status);
        } else if (r.status == 'email-already-exist') {
          this._snackBar.error('Email already exist.');
        }
        throw new Error();
      })
    );
  }

  private validateConfirmationCode(email: string, code: string): Observable<'ok' | 'wrong-code'> {
    return this.authRepository.validateConfirmationCode(email, code).pipe(
      mergeMap(r => {
        if (r.status == 'ok') {
          return of(r.status);
        } else if (r.status == 'wrong-code') {
          this._snackBar.error('Wrong Code.');
        }
        throw new Error();
      })
    );
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
  email: string;
  password: string;
  grantType: string;
  rememberMe?: boolean;
  scope?: string;
};

export type RegistrationModel = {
  email: string;
  password: string;
};
