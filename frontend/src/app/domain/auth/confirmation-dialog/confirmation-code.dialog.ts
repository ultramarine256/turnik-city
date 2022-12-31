import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationHelper } from '../../../common';

@Component({
  selector: 'app-confirmation-code-dialog',
  template: `
    <div class="login__content">
      <form [formGroup]="form" (keydown)="keyDownFunction($event)" class="row">
        <!-- confirmation -->
        <mat-form-field class="col-12 input__code" appearance="outline">
          <mat-label>Confirmation Code {{ postalCode.value.length }} / 4</mat-label>
          <input matInput #postalCode maxlength="4" placeholder="XXXX" formControlName="code" />
        </mat-form-field>

        <!-- confirmation-button -->
        <div class="col-12 login-buttons">
          <button
            mat-flat-button
            class="login-buttons__button login-buttons__button-login"
            color="primary"
            [disabled]="!!(isProcessing$ | async)"
            (click)="confirmationClickInner(form); $event.preventDefault()"
          >
            <span>Confirm Email</span>
            <mat-progress-bar *ngIf="(isProcessing$ | async)!" mode="indeterminate"></mat-progress-bar>
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

      .input__code {
        .mat-input-element {
          text-align: center;
        }
      }
    `,
  ],
})
export class ConfirmationCodeDialog implements OnInit {
  @Input() isProcessing$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  @Output() submitClick = new EventEmitter<{ code: string }>();

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      code: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.isProcessing$.subscribe(r => (r ? this.form.disable() : this.form.enable()));
  }

  confirmationClickInner(formGroup: FormGroup): void {
    if (!ValidationHelper.validateForm(formGroup)) {
      return;
    }
    this.submitClick.emit({
      code: formGroup.value.code,
    });
  }

  keyDownFunction(event: any) {
    if (event.keyCode === 13) {
      this.confirmationClickInner(this.form);
    }
  }
}
