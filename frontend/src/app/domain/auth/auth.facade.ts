import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Observable, catchError, first, of, mergeMap, tap } from 'rxjs';
import { AUTH_GRANT_TYPE, AuthRepository, AuthStorage, JtwTokenDto, JtwTokenResponse, UserIdentityDto } from 'app/data';
import { ExtendedDialogService, SnackbarService } from 'app/common';
import { ConfirmationCodeDialog, LoginClickEvent, LoginDialog, RegisterationDialog } from './index';
import { PermissionChecker } from '../_infrastructure';

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
  userIdentity: UserIdentityDto;

  /// attributes
  private confirmationDialogRef: MatDialogRef<ConfirmationCodeDialog, any>;
  private loginDialogRef: MatDialogRef<LoginDialog, any>;
  private registrationDialogRef: MatDialogRef<RegisterationDialog, any>;

  /// dependencies
  private readonly authStorage: AuthStorage;

  constructor(
    private dialogService: ExtendedDialogService,
    private dialog: MatDialog,
    private authRepository: AuthRepository,
    private permissionChecker: PermissionChecker,
    private _snackBar: SnackbarService,
    private router: Router
  ) {
    this.authStorage = new AuthStorage();
  }

  /// methods
  refreshIdentityInfo(): Observable<UserIdentityDto | false> {
    if (!this.authStorage.TokenInfo?.token) {
      return of(false);
    }

    this.isAuthorized$.next(true);
    this.permissionChecker.setIsAuthorized(true);
    this.permissionChecker.setRolePermissions('user');
    this.userIdentity = this.authStorage.IdentityInfo;
    return this.fetchIdentityInfo()
      .pipe(first())
      .pipe(tap(r => this.authStorage.updateUserIdentityInfo(r)));
  }

  openLoginDialog() {
    this.loginDialogRef = this.dialogService.openDialog(LoginDialog, 'login-dialog', {});
    const instance = this.loginDialogRef.componentInstance;
    instance.isLoginProcessing$ = this.isLoginProcessing$;
    instance.registrationClick.subscribe(() => this.openRegistrationDialog());
    instance.loginClick.pipe(tap(r => this.isLoginProcessing$.next(true))).subscribe((model: LoginClickEvent) =>
      this.getJwtToken({
        email: model.email,
        password: model.password,
        grantType: AUTH_GRANT_TYPE.EMAIL,
      })
        .pipe(first())
        .subscribe(token =>
          this.authRepository
            .getUserIdentityInfo(token.tokenType, token.token)
            .pipe(first())
            .subscribe(identityJson => {
              this.userIdentity = identityJson;
              this.authStorage.setUserTokenInfo(token, true);
              this.authStorage.setUserIdentityInfo(identityJson, true);
              this.permissionChecker.setIsAuthorized(true);
              this.permissionChecker.setRolePermissions('user');
              this.isLoginProcessing$.next(false);
              this.isAuthorized$.next(true);
              this.loginDialogRef.close();
              this.router.navigate(['/profile']).then();
            })
        )
    );
  }

  openRegistrationDialog() {
    this.registrationDialogRef = this.dialogService.openDialog<RegisterationDialog>(
      RegisterationDialog,
      'login-dialog'
    );
    const instance = this.registrationDialogRef.componentInstance;
    instance.isRegistrationProcessing$ = this.isRegistrationProcessing$;
    instance.registrationClick
      .pipe(tap(_ => this.isRegistrationProcessing$.next(true)))
      .subscribe(registrationEvent => {
        // 1. create account
        this.createAccount({ email: registrationEvent.email, password: registrationEvent.password }).subscribe(
          r =>
            // 2. send confirmation email
            this.authRepository.sendConfirmationEmail(registrationEvent.email).subscribe(r => {
              this.isRegistrationProcessing$.next(true);
              this.loginDialogRef.close();
              this.registrationDialogRef.close();
              // 3. validate code
              this.openConfirmationDialog().subscribe(confirmationEvent => {
                this.isConfirmationProcessing$.next(true);
                this.validateConfirmationCode(registrationEvent.email, confirmationEvent.code).subscribe(
                  r => {
                    // 4. login user
                    this.getJwtToken({
                      email: registrationEvent.email,
                      password: registrationEvent.password,
                      grantType: AUTH_GRANT_TYPE.EMAIL,
                    })
                      .pipe(first())
                      .subscribe(token => {
                        this.authRepository
                          .getUserIdentityInfo(token.tokenType, token.token)
                          .pipe(first())
                          .subscribe(identityJson => {
                            this.userIdentity = identityJson;
                            this.authStorage.setUserTokenInfo(token, true);
                            this.authStorage.setUserIdentityInfo(identityJson, true);
                            this.isAuthorized$.next(true);
                            this.permissionChecker.setIsAuthorized(true);
                            this.permissionChecker.setRolePermissions('user');
                            this.isConfirmationProcessing$.next(false);
                            this.registrationDialogRef.close();
                            this.confirmationDialogRef.close();
                            this.router.navigate(['/profile']).then();
                          });
                      });
                  },
                  error => this.isRegistrationProcessing$.next(false)
                );
              });
            }),
          error => this.isRegistrationProcessing$.next(false)
        );
      });
  }

  openConfirmationDialog(): EventEmitter<{ code: string }> {
    this.confirmationDialogRef = this.dialogService.openDialog<ConfirmationCodeDialog>(
      ConfirmationCodeDialog,
      'login-dialog'
    );
    const instance = this.confirmationDialogRef.componentInstance;
    instance.isProcessing$ = this.isConfirmationProcessing$;
    return instance.submitClick;
  }

  signOut() {
    this.isAuthorized$.next(false);
    this.clearStorageInfo();
    this.permissionChecker.setIsAuthorized(false);
    this.permissionChecker.setRolePermissions('anonymous');
  }

  /// inner
  private getJwtToken(model: LoginModel): Observable<JtwTokenDto> {
    return this.authRepository.getJwtToken(model.email, model.password, model.grantType).pipe(
      mergeMap((r: JtwTokenResponse) => {
        if (r.status == 'ok') {
          return of(r.data);
        } else if (r.status == 'wrong-password') {
          // TODO: pass action to dialog
          // (this.form.controls as any).password.setValue('');
          this._snackBar.error('Login or password was incorrect.');
        }
        this._snackBar.error('Our API is down >_<');
        throw new Error();
      })
    );
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

  private fetchIdentityInfo(): Observable<UserIdentityDto> {
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
