import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationHelper } from 'app/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login-dialog',
  template: `
    <div class="login__content">
      <form [formGroup]="form" (keydown)="keyDownFunction($event)" class="row">
        <!-- email -->
        <mat-form-field class="col-12" appearance="outline">
          <mat-label>Email</mat-label>
          <input matInput formControlName="login" placeholder="Email" />
          <mat-icon matSuffix>mail_outline</mat-icon>
        </mat-form-field>

        <!-- pass -->
        <mat-form-field class="col-12" appearance="outline">
          <mat-label>Password</mat-label>
          <input #passInput matInput [type]="!showPass ? 'password' : 'text'" formControlName="password" />
          <button
            mat-icon-button
            matSuffix
            style="width: 26px"
            [disabled]="!form.value.password"
            (click)="showPass = !showPass"
            [attr.aria-label]="'Hide password'"
            [attr.aria-pressed]="showPass"
          >
            <mat-icon>{{ !showPass ? 'visibility_off' : 'visibility' }}</mat-icon>
          </button>
        </mat-form-field>

        <!-- buttons -->
        <div class="col-12 login-buttons">
          <button
            mat-flat-button
            class="login-buttons__button login-buttons__button-login"
            color="primary"
            [disabled]="!!(isLoginProcessing$ | async)"
            (click)="loginClickInner(form); $event.preventDefault()"
          >
            Login
            <mat-progress-bar *ngIf="(isLoginProcessing$ | async)!" mode="indeterminate"></mat-progress-bar>
          </button>
          <button
            mat-flat-button
            class="login-buttons__button login-buttons__forgot-pass"
            [disabled]="!!(isLoginProcessing$ | async)"
            (click)="registrationClick.emit(); $event.preventDefault()"
          >
            New Account
          </button>
          <button
            mat-flat-button
            class="login-buttons__button login-buttons__forgot-pass"
            [disabled]="!!(isLoginProcessing$ | async)"
            (click)="$event.preventDefault()"
          >
            Lost Password
          </button>
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
export class LoginDialogComponent implements OnInit {
  @Input() isLoginProcessing$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  @Output() loginClick = new EventEmitter<LoginClickEvent>();
  @Output() registrationClick = new EventEmitter();
  @Output() forgotPasswordClick = new EventEmitter();

  form: FormGroup;
  showPass: boolean;

  constructor() {
    this.form = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(true, []),
    });
  }

  ngOnInit() {
    this.isLoginProcessing$.subscribe(r => (r ? this.form.disable() : this.form.enable()));
  }

  loginClickInner(formGroup: FormGroup): void {
    if (!ValidationHelper.validateForm(formGroup)) {
      return;
    }

    const model = {
      login: formGroup.value.login,
      password: formGroup.value.password,
      rememberMe: formGroup.value.rememberMe,
    };
    this.loginClick.emit(model);
  }

  keyDownFunction(event: any) {
    if (event.keyCode === 13) {
      this.loginClickInner(this.form);
    }
  }
}

export type LoginClickEvent = {
  login: string;
  password: string;
};
