import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, BehaviorSubject, Observable } from 'rxjs';
import { AUTH_GRANT_TYPE, AuthRepository, AuthStorage, UserIdentityJson } from 'app/data';
import { ExtendedDialogService } from 'app/common';
import { LoginDialogComponent } from './index';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  // predicates
  isProcessing$ = new BehaviorSubject<boolean>(false);
  isRegistrationEmailSent = false;
  isPasswordChanged = false;
  isPasswordResetEmailSent = false;

  isAuthorized = false;

  /// fields
  private dialogRef: any;
  userIdentity: UserIdentityJson = new UserIdentityJson();

  /// related
  private readonly authStorage = AuthStorage.Instance;

  constructor(
    private dialogService: ExtendedDialogService,
    private authRepository: AuthRepository,
    private router: Router
  ) {}

  fetch() {
    this.fetchIdentityInfo();
    this.isAuthorized = !!AuthStorage.Instance.TokenInfo.token;
    this.userIdentity = AuthStorage.Instance.IdentityInfo;
  }

  openLoginDialog() {
    this.dialogRef = this.dialogService.openDialog(LoginDialogComponent, 'login-dialog', {});
  }

  closeLoginDialog() {
    this.dialogRef.close();
  }

  login(model: AuthorizationRequestModel): Observable<'success' | 'wrong-password' | 'api-down'> {
    const result = new ReplaySubject<'success' | 'wrong-password' | 'api-down'>();

    this.isProcessing$.next(true);
    this.authRepository.getUserToken(model.login, model.password, AUTH_GRANT_TYPE.EMAIL, 'app').subscribe(
      tokenJson => {
        this.authRepository.getUserIdentityInfo(tokenJson.tokenType, tokenJson.token).subscribe(
          identityJson => {
            this.authStorage.setUserTokenInfo(tokenJson, model.rememberMe);
            this.authStorage.setUserIdentityInfo(identityJson, model.rememberMe);
            this.isProcessing$.next(true);
            result.next('success');
          },
          () => {
            // this._snackBar.error('Error');
            // this.isProcessing$.next(false);
          }
        );
      },
      (response: HttpErrorResponse) => {
        this.isProcessing$.next(false);
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
    this.isAuthorized = false;
    AuthStorage.Instance.clearStorageInfo();
  }

  private fetchIdentityInfo() {
    if (!this.authStorage.TokenInfo.token) {
      throw new Error('no token');
    }

    return this.authRepository
      .getUserIdentityInfo(this.authStorage.TokenInfo.tokenType, this.authStorage.TokenInfo.token)
      .subscribe(
        (userIdentity: UserIdentityJson) => AuthStorage.Instance.updateUserIdentityInfo(userIdentity),
        (err: HttpErrorResponse) => {
          // TODO: check??
          if (err.status === 401) {
            this.router.navigate(['/login']).then(() => AuthStorage.Instance.clearStorageInfo());
          }
        }
      );
  }

  async sendPasswordResetEmail(email: string) {
    this.isProcessing$.next(true);
    await this.authRepository.sendPasswordResetEmail(email).toPromise();
    this.isProcessing$.next(false);
    this.isPasswordResetEmailSent = true;
    this.authStorage.clearStorageInfo();
  }

  async sendRegistrationEmail(email: string) {
    this.isProcessing$.next(true);
    await this.authRepository.sendRegisterMeEmail(email).toPromise();
    this.isProcessing$.next(false);
    this.isRegistrationEmailSent = true;
  }

  async changeForgottenPassword(newPassword: string, passwordResetHash: string) {
    this.isProcessing$.next(true);
    await this.authRepository.changeForgottenPassword(newPassword, passwordResetHash).toPromise();
    this.isProcessing$.next(false);
    this.isPasswordChanged = true;
  }
}

export type AuthorizationRequestModel = {
  login: string;
  password: string;
  grantType?: string;
  rememberMe: boolean;
  scope?: string;
};
