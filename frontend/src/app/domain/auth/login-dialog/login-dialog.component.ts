import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { APP_CONST } from 'src/app/common';

@Component({
  selector: 'app-login-dialog',
  template: `
    <div class="login__content animated flipInY">
      <!-- logo -->
      <div class="login__logo mb-3">
        <img [src]="APP_CONST.LOGIN_LOGO" />
      </div>

      <form class="form-row" [formGroup]="form" (keydown)="keyDownFunction($event)">
        <div class="col-12">
          <!-- email -->
          <mat-form-field class="w-100" appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput formControlName="login" placeholder="Email" />
            <mat-icon matSuffix>mail_outline</mat-icon>
          </mat-form-field>

          <!-- pass -->
          <mat-form-field class="w-100" appearance="outline">
            <mat-label>Password</mat-label>
            <input #passInput matInput [type]="!passInput.hide ? 'password' : 'text'" formControlName="password" />
            <button
              mat-icon-button
              matSuffix
              style="width: 26px"
              [disabled]="!form.value.password"
              (click)="passInput.hide = !passInput.hide"
              [attr.aria-label]="'Hide password'"
              [attr.aria-pressed]="passInput.hide"
            >
              <mat-icon>{{ !passInput.hide ? 'visibility_off' : 'visibility' }}</mat-icon>
            </button>
          </mat-form-field>

          <!-- remember-me -->
          <mat-checkbox formControlName="rememberMe" [color]="'primary'" [disabled]="facade.isProcessing$ | async">
            Remember me
          </mat-checkbox>
        </div>

        <div class="col-12 mt-3 login__buttons">
          <button
            mat-flat-button
            class="login__forgot-pass"
            [disabled]="facade.isProcessing$ | async"
            (click)="login(initModelFromFormGroup(entity, form)); $event.preventDefault()"
          >
            Forgot Password?
          </button>
          <button
            mat-flat-button
            color="primary"
            [disabled]="facade.isProcessing$ | async"
            (click)="login(initModelFromFormGroup(entity, form)); $event.preventDefault()"
          >
            LOGIN
            <mat-progress-bar *ngIf="facade.isProcessing$ | async" mode="indeterminate"></mat-progress-bar>
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .asd {
      }
    `,
  ],
})
export class LoginDialogComponent {
  entity = new AuthorizationRequestModel();
  form: FormGroup;
  APP_CONST = APP_CONST;
}
