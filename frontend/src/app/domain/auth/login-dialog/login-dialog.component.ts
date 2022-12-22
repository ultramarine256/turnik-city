import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService, ValidationHelper } from 'app/common';
import { AuthFacade, AuthorizationRequestModel } from '../auth.facade';

@Component({
  selector: 'app-login-dialog',
  template: `
    <div class="login__content">
      <!-- form -->
      <form [formGroup]="form" (keydown)="keyDownFunction($event)">
        <div class="row">
          <!-- email -->
          <mat-form-field class="col-12" appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput formControlName="login" placeholder="Email" />
            <mat-icon matSuffix>mail_outline</mat-icon>
            <!--  <fa-icon class="s-counter__icon" [icon]="['fas', 'location-dot']" size="2xl" matSuffix></fa-icon>  -->
          </mat-form-field>

          <!-- pass -->
          <mat-form-field class="col-12" appearance="outline">
            <mat-label>Password</mat-label>
            <input #passInput matInput [type]="!hide ? 'password' : 'text'" formControlName="password" />
            <button
              mat-icon-button
              matSuffix
              style="width: 26px"
              [disabled]="!form.value.password"
              (click)="hide = !hide"
              [attr.aria-label]="'Hide password'"
              [attr.aria-pressed]="hide"
            >
              <mat-icon>{{ !hide ? 'visibility_off' : 'visibility' }}</mat-icon>
            </button>
          </mat-form-field>

          <!-- buttons -->
          <div class="col-12 login-buttons">
            <button
                mat-flat-button
                class="login-buttons__button login-buttons__button-login"
                color="primary"
                [disabled]="!!(facade.isLoginProcessing$ | async)"
                (click)="login(initModelFromFormGroup(entity, form)); $event.preventDefault()"
            >
              Login
              <mat-progress-bar *ngIf="(facade.isLoginProcessing$ | async)!" mode="indeterminate"></mat-progress-bar>
            </button>
            <button
                mat-flat-button
                class="login-buttons__button login-buttons__forgot-pass"
                [disabled]="!!(facade.isLoginProcessing$ | async)"
                (click)="$event.preventDefault()"
            >
              Lost Password
            </button>
            <button
                mat-flat-button
                class="login-buttons__button login-buttons__forgot-pass"
                [disabled]="!!(facade.isLoginProcessing$ | async)"
                (click)="$event.preventDefault()"
            >
              New Account
            </button>
            
            
          </div>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .login__logo {
        display: flex;
        justify-content: center;

        img {
          max-width: 280px;
        }
      }

      // buttons
      .login-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        
        .login-buttons__break {
          flex-basis: 100%;
        }
        
        .login-buttons__button {
          text-transform: uppercase;
        }

        .login-buttons__button-login {
          flex-basis: 100%;
        }
        
        .login-buttons__forgot-pass {
          background-color: #efefef;
          color: #6a6a6a;
          flex-grow: 1;
        }
      }

      // common
      .login__content {
        padding: 1rem;
      }

      .mat-form-field-wrapper {
        margin: 0 !important;
        padding-bottom: 1em !important;
      }
    `,
  ],
})
export class LoginDialogComponent {
  entity: AuthorizationRequestModel;
  form: FormGroup;

  // predicates
  hide = false;

  constructor(private router: Router, public facade: AuthFacade, private _snackBar: SnackbarService) {
    this.form = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(true, []),
    });
  }

  login(model: AuthorizationRequestModel): void {
    if (!ValidationHelper.validateForm(this.form)) {
      return;
    }
    this.form.disable();
    this.facade.login(model).subscribe(r => {
      this.form.enable();
      if (r == 'success') {
        this.facade.dialog.close();
        this.router.navigate(['/']).then(() => {});
      } else if (r == 'wrong-password') {
        (this.form.controls as any).password.setValue('');
        this._snackBar.error('Login or password was incorrect.');
      } else if (r == 'api-down') {
        this._snackBar.error('Our API is down >_<');
      }
    });
  }

  keyDownFunction(event: any) {
    if (event.keyCode === 13) {
      this.login(this.initModelFromFormGroup(this.entity, this.form));
    }
  }

  initModelFromFormGroup(model: AuthorizationRequestModel, formGroup: FormGroup): AuthorizationRequestModel {
    return {
      login: formGroup.value.login,
      password: formGroup.value.password,
      rememberMe: formGroup.value.rememberMe,
    };
  }
}
