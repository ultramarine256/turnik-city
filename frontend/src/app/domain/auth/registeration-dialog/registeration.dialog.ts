import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationHelper } from '../../../common';

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

        <!-- button -->
        <div class="col-12 login-buttons">
          <button
            mat-flat-button
            class="login-buttons__button login-buttons__button-login"
            color="primary"
            [disabled]="!!(isRegistrationProcessing$ | async)"
            (click)="registrationClickInner(form); $event.preventDefault()"
          >
            <span>Create Account</span>
            <mat-progress-bar *ngIf="(isRegistrationProcessing$ | async)!" mode="indeterminate"></mat-progress-bar>
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
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
export class RegisterationDialog implements OnInit {
  @Input() isRegistrationProcessing$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  @Output() registrationClick = new EventEmitter<{ email: string; password: string }>();

  form: FormGroup;
  showPass: boolean;

  constructor() {
    this.form = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.isRegistrationProcessing$.subscribe(r => (r ? this.form.disable() : this.form.enable()));
  }

  registrationClickInner(formGroup: FormGroup): void {
    if (!ValidationHelper.validateForm(formGroup)) {
      return;
    }
    debugger;
    this.registrationClick.emit({
      email: formGroup.value.login,
      password: formGroup.value.password,
    });
  }

  keyDownFunction(event: any) {
    if (event.keyCode === 13) {
      this.registrationClickInner(this.form);
    }
  }
}
