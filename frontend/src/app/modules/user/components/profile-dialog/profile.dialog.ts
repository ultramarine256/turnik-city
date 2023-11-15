import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AsyncState, DATA_STATE, validateForm } from 'app/common';
import { PlaygroundDto, UserProfileDto } from 'app/data';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile.dialog.html',
  styleUrls: ['./profile.dialog.scss'],
})
export class ProfileDialog implements OnInit {
  @Input() userModel$: Observable<AsyncState<UserProfileDto>> = new Observable();
  @Output() submitClick = new EventEmitter<UserProfileDto>();

  form: FormGroup = new FormGroup<any>({});
  form2: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { model$: Observable<AsyncState<UserProfileDto>> }) {}

  ngOnInit() {
    // this.status$.subscribe(r => (r == 'updating' ? this.form.disable() : this.form.enable()));
    this.data.model$.subscribe(r => {
      // @ts-ignore
      this.form = this.initForm(r.res);
    });
    this.form2 = new FormGroup<any>({
      email: new FormControl('email!', [Validators.required, Validators.email]),
    });

    // this.form.value
  }

  loginClickInner(formGroup: FormGroup) {
    if (!validateForm(formGroup)) {
      return;
    }
    const result = this.getFromValue({} as any, formGroup);
    this.submitClick.emit(result);
  }

  keyDownFunction(event: any) {
    if (event.keyCode === 13) {
      this.loginClickInner(this.form);
    }
  }

  initForm(input: UserProfileDto): FormGroup {
    const result = new FormGroup({
      email: new FormControl(input.email, [Validators.required, Validators.email]),
      fullName: new FormControl(input.fullName, [Validators.required]),
      bio: new FormControl(input.bio, []),
      instagramId: new FormControl(input.instagramId, []),
      telegramId: new FormControl(input.telegramId, []),
      city: new FormControl(input.city, []),
    });
    return result;
  }

  getFromValue(input: UserProfileDto, formGroup: FormGroup): UserProfileDto {
    const result: UserProfileDto = {
      ...input,
      email: formGroup.value.email,
      fullName: formGroup.value.fullName,
      bio: formGroup.value.bio,
      instagramId: formGroup.value.instagramId,
      telegramId: formGroup.value.telegramId,
      city: formGroup.value.city,
    };
    return result;
  }
}

export type UserModel = {};
